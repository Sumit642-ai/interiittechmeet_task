import VoteButton from "./VoteButton";
import CollapseToggle from "./CollapseToggle";
import ReplyForm from "./ReplyForm";
import { useComments } from "../../context/CommentsContext";
import { useAuth } from "../../context/AuthContext";

export default function CommentItem({ node, level = 0, collapsedMap }) {
  const { upvote, toggle, reply, users } = useComments();
  const { user } = useAuth();
  const u = users.find(x => x.id === node.user_id);

  const collapsed = !!collapsedMap[node.id];

  return (
    <div className="py-3">
      <div className="flex gap-3">
        <img src={u?.avatar} alt="" className="h-9 w-9 rounded-full object-cover ring-1 ring-gray-200" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{u?.name ?? "User"}</span>
            <span className="text-xs text-gray-500">{new Date(node.created_at).toLocaleString()}</span>
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-800 bg-white rounded-lg border px-3 py-2 shadow-xs">
            {node.text}
          </p>

          <div className="mt-2 flex items-center gap-3">
            <VoteButton onClick={() => upvote(node.id)} count={node.upvotes} />
            <button className="text-xs text-gray-700 hover:text-black underline underline-offset-2" onClick={() => toggle(node.id)}>Reply</button>
            <CollapseToggle collapsed={collapsed} onClick={() => toggle(`c_${node.id}`)} />
          </div>

          {/* inline reply form keyed by toggle(node.id) */}
          {collapsedMap[node.id] && user && (
            <ReplyForm onSubmit={(text) => reply(node.id, text, 1 /*demo user_id*/)} />
          )}
        </div>
      </div>

      {/* children */}
      {!collapsedMap[`c_${node.id}`] && node.children?.length > 0 && (
        <div className="mt-3 border-l-2 border-gray-200 pl-4 ml-4 space-y-3">
          {node.children.map(ch => (
            <CommentItem key={ch.id} node={ch} level={level+1} collapsedMap={collapsedMap} />
          ))}
        </div>
      )}
    </div>
  );
}
