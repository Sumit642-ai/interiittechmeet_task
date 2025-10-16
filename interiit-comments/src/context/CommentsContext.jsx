import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { fetchUsers, fetchComments } from "../services/api";
import { buildTree } from "../utils/buildTree";

const Ctx = createContext(null);

export const CommentsProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]); // flat list
  const [collapsed, setCollapsed] = useState({}); // id -> boolean

  // init from localStorage or fetch
  useEffect(() => {
    const local = localStorage.getItem("comments");
    if (local) {
      const { users, comments } = JSON.parse(local);
      setUsers(users); setComments(comments);
    } else {
      (async () => {
        try {
          const [u, c] = await Promise.all([fetchUsers(), fetchComments()]);
          setUsers(u); setComments(c);
        } catch (e) {
          console.error("Failed to fetch comments data:", e);
          setUsers([]); setComments([]);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (users.length || comments.length) {
      localStorage.setItem("comments", JSON.stringify({ users, comments }));
    }
  }, [users, comments]);

  const tree = useMemo(() => buildTree(comments), [comments]);

  const upvote = (id) => setComments(cs => cs.map(c => c.id===id ? {...c, upvotes:c.upvotes+1} : c));
  const toggle = (id) => setCollapsed(m => ({ ...m, [id]: !m[id] }));
  const reply = (parent_id, text, user_id) => {
    const id = Math.max(0, ...comments.map(c=>c.id)) + 1;
    const newC = { id, text, upvotes: 0, created_at: new Date().toISOString(), user_id, parent_id };
    setComments(cs => [...cs, newC]);
  };

  return (
    <Ctx.Provider value={{ users, comments, tree, collapsed, upvote, toggle, reply }}>
      {children}
    </Ctx.Provider>
  );
};
export const useComments = () => useContext(Ctx);
