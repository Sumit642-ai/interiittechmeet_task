export default function VoteButton({ onClick, count }) {
  return (
    <button onClick={onClick} className="text-xs px-2 py-1 rounded-md border bg-white hover:bg-gray-50 active:bg-gray-100 transition">
      ▲ {count}
    </button>
  );
}
