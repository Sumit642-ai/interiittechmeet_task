export function buildTree(flat) {
  const byId = new Map();
  flat.forEach(c => byId.set(c.id, { ...c, children: [] }));
  const roots = [];
  byId.forEach(node => {
    if (node.parent_id == null) roots.push(node);
    else byId.get(node.parent_id)?.children.push(node);
  });
  return roots;
}
