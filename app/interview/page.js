// import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import InterviewQuestion from '../../components/InterviewQuestion'

export default function InterviewPage() {
  const [questions, setQuestions] = useState([])

  async function createQuestions() {
    const res = await fetch('/api/interview', { method: 'POST', body: JSON.stringify({ jobDescription: '' }), headers: { 'Content-Type': 'application/json' } })
    const data = await res.json()
    if (data.ok) setQuestions(data.questions)
  }

  return (
    <div>
      <Navbar />
      <main style={{ padding: 16 }}>
        <h1>Interview practice</h1>
        <div style={{ marginBottom: 12 }}>
          <button onClick={createQuestions}>Generate Questions</button>
        </div>
        <div>
          {questions.map((q, i) => (
            <InterviewQuestion key={i} question={q} onAnswer={(a) => console.log('answer', a)} />
          ))}
        </div>
      </main>
    </div>
  )
}
