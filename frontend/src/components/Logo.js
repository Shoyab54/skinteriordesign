import { useState } from "react";

export const Logo = ({ size = 34 }) => {
  const [imageOk, setImageOk] = useState(true);

  if (imageOk) {
    return (
      <img
        src="/logo.png"
        alt="SK Interior Design"
        className="brand-logo brand-logo-img"
        style={{ height: size }}
        onError={() => setImageOk(false)}
        data-testid="brand-logo"
      />
    );
  }

  return (
    <svg
      className="brand-logo"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      data-testid="brand-logo"
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
};
