import { useAuth } from "../context/AuthContext";
import { useComments } from "../context/CommentsContext";
import CommentList from "../components/comments/CommentList";

export default function Post() {
  const { user, logout } = useAuth();
  const { reply } = useComments();

  return (
  <div className="max-w-3xl mx-auto p-4 md:p-6 bg-gray-50 min-h-screen">
      <header className="flex items-center justify-between py-4">
        <h1 className="text-xl md:text-2xl font-semibold tracking-tight">Inter IIT — Comment Thread</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 hidden sm:block">{user?.email}</span>
          <button onClick={logout} className="text-sm rounded-md border px-3 py-1.5 hover:bg-gray-100 active:bg-gray-200 transition">Logout</button>
        </div>
      </header>

      <article className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <img src="/post.jpg" alt="Cover image" className="w-full max-h-80 object-cover" onError={(e)=>{e.currentTarget.src='/vite.svg'}} />
        <div className="p-5">
          <h2 className="text-lg font-semibold">Sample Post Title</h2>
          <p className="text-sm text-gray-700 mt-1 leading-6">
            This is the single post required by the task; comments are below.
          </p>
        </div>
      </article>

      <section className="mt-8">
        <h3 className="font-semibold mb-4">Comments</h3>
        <CommentList />
      </section>
    </div>
  );
}
