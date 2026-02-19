interface LogoProps {
  size?: number;
}

export default function Logo({ size = 32 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <rect width="48" height="48" rx="10" fill="url(#logo-bg)" />

      {/* Gamepad body */}
      <path
        d="M14 20C14 17.8 15.8 16 18 16H30C32.2 16 34 17.8 34 20V26C34 30.4 30.4 34 26 34H22C17.6 34 14 30.4 14 26V20Z"
        fill="#1b2838"
        stroke="#66c0f4"
        strokeWidth="1.5"
      />

      {/* D-pad */}
      <rect x="18" y="22" width="2" height="6" rx="0.5" fill="#66c0f4" />
      <rect x="16" y="24" width="6" height="2" rx="0.5" fill="#66c0f4" />

      {/* Action buttons */}
      <circle cx="29" cy="22" r="1.3" fill="#67c1f5" />
      <circle cx="32" cy="25" r="1.3" fill="#67c1f5" />
      <circle cx="29" cy="28" r="1.3" fill="#67c1f5" />
      <circle cx="26" cy="25" r="1.3" fill="#67c1f5" />

      {/* Neural nodes */}
      <circle cx="20" cy="11" r="2" fill="#66c0f4" opacity="0.9" />
      <circle cx="28" cy="11" r="2" fill="#66c0f4" opacity="0.9" />
      <circle cx="24" cy="7" r="2.5" fill="#67c1f5" />

      {/* Neural connections */}
      <line x1="22" y1="10" x2="26" y2="10" stroke="#66c0f4" strokeWidth="1" opacity="0.6" />
      <line x1="21" y1="9.5" x2="23" y2="8" stroke="#66c0f4" strokeWidth="1" opacity="0.6" />
      <line x1="27" y1="9.5" x2="25" y2="8" stroke="#66c0f4" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="13" x2="20" y2="16" stroke="#66c0f4" strokeWidth="0.8" opacity="0.4" />
      <line x1="28" y1="13" x2="28" y2="16" stroke="#66c0f4" strokeWidth="0.8" opacity="0.4" />
      <line x1="24" y1="9.5" x2="24" y2="16" stroke="#66c0f4" strokeWidth="0.8" opacity="0.4" />

      {/* Glow */}
      <circle cx="24" cy="7" r="4" fill="#67c1f5" opacity="0.15" />

      <defs>
        <linearGradient id="logo-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0d1b2a" />
        </linearGradient>
      </defs>
    </svg>
  );
}
