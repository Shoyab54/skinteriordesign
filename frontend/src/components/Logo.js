export const Logo = ({ size = 34 }) => (
  <svg
    className="brand-logo"
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    aria-hidden="true"
  >
    <rect
      x="15"
      y="15"
      width="34"
      height="34"
      stroke="#c9a86a"
      strokeWidth="1.6"
      transform="rotate(45 32 32)"
    />
    <text
      x="32"
      y="40"
      textAnchor="middle"
      fontFamily="Fraunces, Georgia, serif"
      fontSize="19"
      letterSpacing="0.5"
      fill="#f2efe8"
    >
      SK
    </text>
  </svg>
);
