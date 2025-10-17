import "./CollapseToggle.css";

export default function CollapseToggle({ collapsed, onClick }) {
  return (
    <button onClick={onClick} className="collapse-toggle">
      {collapsed ? "Expand" : "Collapse"}
    </button>
  );
}
