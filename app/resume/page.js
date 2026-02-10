"use client";
import React, { useState, useRef, useEffect } from "react";
import { Plus,  SendHorizontal } from "lucide-react";
import { fileHandler } from "@/utils/resumeParser";

const ChatInput = () => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange =async (e) => {
    const file = e.target.files[0];
    console.log("button clicked")
    if (file) {
      
      const text = await fileHandler(file);
      console.log("Extracted Text:", text);
    }
  };
  
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="flex items-center justify-center w-full min-h-screen p-4 bg-[#171717]">
      <div className="relative flex items-end w-full max-w-3xl p-2 transition-all duration-200 bg-[#2f2f2f] rounded-[28px] focus-within:ring-1 focus-within:ring-neutral-500">
       
        <div>
          <input
            type="file"
            accept=".pdf,.docx"
            ref={inputRef}
            onChange={handleChange}
            className="hidden"
          />

          <button
            onClick={handleClick}
            className="flex items-center justify-center p-2 mb-1 ml-1 transition-colors rounded-full hover:bg-neutral-600 group"
            aria-label="Upload document"
            
          >
            <Plus size={20} className="text-white" />
          </button>
        </div>

       
        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type the Job discription here........."
          className="w-full py-3 ml-2 mr-2 text-white placeholder-gray-400 bg-transparent border-none outline-none resize-none max-h-60 leading-6"
        />

        
        <div className="flex items-center gap-1 mb-1 mr-1">
          {message.trim() === "" ? (
            <></>
          ) : (
            <button className="p-2 text-black transition-all bg-white rounded-full hover:bg-gray-200">
              <SendHorizontal size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
