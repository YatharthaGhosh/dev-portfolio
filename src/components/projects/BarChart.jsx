import { useId, useState } from "react";

/**
 * Horizontal bar chart for one measure across a few items (e.g. accuracy per retrieval mode).
 * - One series, so one hue and no legend: the title names the measure.
 * - Bars start at 0 so differences aren't exaggerated; each bar is labelled directly.
 * - Hover or keyboard focus shows a tooltip with extra detail; a table view is available.
 */
export default function BarChart({ title, caption, unit = "", data, max = 100 }) {
  const [hover, setHover] = useState(null);
  const [showTable, setShowTable] = useState(false);
  const id = useId();
  const ticks = [0, 25, 50, 75, 100].filter((t) => t <= max);

  return (
    <figure className="chart" aria-labelledby={`${id}-title`}>
      <div className="chart__head">
        <figcaption id={`${id}-title`} className="chart__title">
          {title}
        </figcaption>
        <button type="button" className="chart__toggle" onClick={() => setShowTable((v) => !v)} aria-pressed={showTable}>
          {showTable ? "Chart" : "Table"}
        </button>
      </div>

      {showTable ? (
        <table className="chart__table">
          <thead>
            <tr>
              <th scope="col">Mode</th>
              <th scope="col">Value</th>
              <th scope="col">Detail</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d) => (
              <tr key={d.label}>
                <th scope="row">{d.label}</th>
                <td>
                  {d.value}
                  {unit}
                </td>
                <td>{d.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="chart__plot" role="list">
          <div className="chart__grid" aria-hidden="true">
            {ticks.map((t) => (
              <span key={t} style={{ left: `${(t / max) * 100}%` }}>
                <em>
                  {t}
                  {unit}
                </em>
              </span>
            ))}
          </div>
          {data.map((d, i) => (
            <div
              key={d.label}
              role="listitem"
              tabIndex={0}
              className={`chart__row ${hover === i ? "is-hover" : ""}`}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              aria-label={`${d.label}: ${d.value}${unit}. ${d.detail ?? ""}`}
            >
              <span className="chart__label">{d.label}</span>
              <span className="chart__track">
                <span className="chart__bar" style={{ width: `${(d.value / max) * 100}%` }} />
                <span className="chart__value">
                  {d.value}
                  {unit}
                </span>
              </span>
              {hover === i && d.detail && (
                <span className="chart__tip" role="tooltip">
                  <b>{d.label}</b>
                  {d.value}
                  {unit} · {d.detail}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
      {caption && <p className="chart__caption">{caption}</p>}
    </figure>
  );
}
