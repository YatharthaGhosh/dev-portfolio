import "./Backdrop.css";

/**
 * The fixed page background: a faint grid and two slowly drifting light blobs.
 * Pure CSS gradients (no blur filters), so it is cheap to paint, even on phones.
 */
export default function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop__grid" />
      <div className="backdrop__blob backdrop__blob--one" />
      <div className="backdrop__blob backdrop__blob--two" />
    </div>
  );
}
