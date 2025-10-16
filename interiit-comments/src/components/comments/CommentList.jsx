import { useComments } from "../../context/CommentsContext";
import CommentItem from "./CommentItem";

export default function CommentList() {
  const { tree, collapsed } = useComments();
  return (
    <div className="space-y-4">
      {tree.map(n => <CommentItem key={n.id} node={n} collapsedMap={collapsed} />)}
    </div>
  );
}
