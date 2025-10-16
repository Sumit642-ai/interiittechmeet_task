export default function CollapseToggle({ collapsed, onClick }) {
  return (
    <button onClick={onClick} className="text-xs text-gray-600 underline">
      {collapsed ? "Expand" : "Collapse"}
    </button>
  );
}
