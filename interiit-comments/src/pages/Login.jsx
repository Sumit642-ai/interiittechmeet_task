import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    try { login(email); nav("/"); } catch (e) { setErr(e.message); }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm space-y-3 p-6 rounded-xl border">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <input className="w-full border rounded p-2" placeholder="name@iit.ac.in"
          value={email} onChange={e=>setEmail(e.target.value)} />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="w-full rounded bg-black text-white py-2">Continue</button>
        <p className="text-xs text-gray-500">Tip: admin@example.com also works</p>
      </form>
    </div>
  );
}
