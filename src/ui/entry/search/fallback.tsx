import css from "./index.module.scss";

export default function SearchFallback() {
  return (
    <div className={css.wrapper}>
      <input className={css.input} style={{ border: "1px solid #808080" }} />
      <svg
        className={css.icon}
        style={{
          position: "relative",
          left: "-1.3em",
          fontSize: "1.5em",
          verticalAlign: "-.3em",
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="#808080"
          strokeDasharray="15"
          strokeDashoffset="15"
          strokeLinecap="round"
          strokeWidth="1"
          d="M12 3C16.9706 3 21 7.02944 21 12"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="15;0"
          />
          <animateTransform
            attributeName="transform"
            dur="1s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </svg>
    </div>
  );
}
