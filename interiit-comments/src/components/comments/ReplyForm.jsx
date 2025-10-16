import { useState } from "react";

export default function ReplyForm({ onSubmit }) {
  const [text, setText] = useState("");
  return (
    <form className="mt-2 flex gap-2" onSubmit={(e)=>{e.preventDefault(); if(text.trim()){onSubmit(text); setText("");}}}>
      <input className="flex-1 border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300" placeholder="Write a reply…" value={text} onChange={e=>setText(e.target.value)} />
      <button className="text-sm rounded-md bg-black text-white px-3 py-2 hover:bg-gray-800 active:bg-gray-900 transition">Reply</button>
    </form>
  );
}
