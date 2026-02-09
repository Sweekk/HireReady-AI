'use client'
import { useState } from 'react'

export default function ResumeUpload({ onUpload }) {
  const [text, setText] = useState('')

  async function handleFile(e) {
    const f = e.target.files && e.target.files[0]
    if (!f) return
    const t = await f.text()
    setText(t)
    onUpload && onUpload(t)
  }

  function handlePaste() {
    onUpload && onUpload(text)
  }

  return (
    <div>
      <label>Upload resume (txt/pdf-paste) </label>
      <div>
        <input type="file" accept="text/*,.txt,.md" onChange={handleFile} />
      </div>
      <div style={{ marginTop: 8 }}>
        <textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={handlePaste}>Use text</button>
      </div>
    </div>
  )
}
