/**
 * A card whose border glows where the cursor is.
 * It only writes two CSS variables (--mx, --my); the effect itself is in global.css (.spotlight).
 * No React state is involved, so moving the mouse never re-renders the component.
 */
export default function SpotlightCard({ as: Tag = "div", className = "", children, ...rest }) {
  function handlePointerMove(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    card.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  return (
    <Tag className={`spotlight ${className}`} onPointerMove={handlePointerMove} {...rest}>
      {children}
    </Tag>
  );
}
