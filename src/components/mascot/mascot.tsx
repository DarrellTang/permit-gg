"use client"

interface MascotProps {
  size?: "sm" | "md" | "lg"
  pose?: "neutral" | "encouraging" | "celebrating"
  className?: string
}

const sizeMap = {
  sm: 120,
  md: 200,
  lg: 280,
}

export function Mascot({ size = "md", pose = "neutral", className = "" }: MascotProps) {
  const dim = sizeMap[size]

  const armAngle = pose === "celebrating" ? -30 : pose === "encouraging" ? -15 : 0
  const mouthCurve = pose === "celebrating" ? "M 85 130 Q 100 145 115 130" : pose === "encouraging" ? "M 88 128 Q 100 138 112 128" : "M 90 128 Q 100 134 110 128"
  const eyeSparkle = pose === "celebrating"

  return (
    <div className={`mascot-float inline-block ${className}`}>
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Cyberpunk mascot character"
      >
        {/* Glow aura */}
        <defs>
          <radialGradient id="aura" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--neon-pink)" stopOpacity="0.3" />
            <stop offset="70%" stopColor="var(--neon-purple)" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="visor" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--neon-cyan)" />
            <stop offset="50%" stopColor="var(--neon-pink)" />
            <stop offset="100%" stopColor="var(--neon-purple)" />
          </linearGradient>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--neon-pink)" />
            <stop offset="100%" stopColor="var(--neon-purple)" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--neon-pink)" />
            <stop offset="100%" stopColor="var(--neon-cyan)" />
          </linearGradient>
        </defs>

        {/* Aura background */}
        <circle cx="100" cy="100" r="95" fill="url(#aura)" />

        {/* Hair flowing back - angular cyberpunk style */}
        <path
          d="M 60 70 Q 55 30 80 25 Q 100 20 120 25 Q 145 30 140 70 L 150 55 Q 155 40 148 30 Q 130 10 100 8 Q 70 10 52 30 Q 45 40 50 55 Z"
          fill="url(#hairGrad)"
          opacity="0.9"
        />
        {/* Hair accent strands */}
        <path d="M 55 60 Q 45 45 50 30" stroke="var(--neon-cyan)" strokeWidth="2" fill="none" opacity="0.7" />
        <path d="M 145 60 Q 155 45 150 30" stroke="var(--neon-cyan)" strokeWidth="2" fill="none" opacity="0.7" />

        {/* Head - angular shape */}
        <path
          d="M 65 65 Q 65 45 100 42 Q 135 45 135 65 L 138 95 Q 138 140 100 145 Q 62 140 62 95 Z"
          fill="oklch(0.20 0.02 280)"
          stroke="var(--neon-purple)"
          strokeWidth="1.5"
        />

        {/* Energy visor/headset */}
        <rect
          x="60"
          y="80"
          width="80"
          height="16"
          rx="8"
          fill="url(#visor)"
          opacity="0.85"
        />
        <rect
          x="60"
          y="80"
          width="80"
          height="16"
          rx="8"
          fill="none"
          stroke="var(--neon-cyan)"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Eyes on visor */}
        <ellipse cx="85" cy="88" rx="8" ry="6" fill="oklch(0.15 0.01 280)" />
        <ellipse cx="115" cy="88" rx="8" ry="6" fill="oklch(0.15 0.01 280)" />
        <ellipse cx="85" cy="88" rx="5" ry="4" fill="var(--neon-cyan)" opacity="0.9" />
        <ellipse cx="115" cy="88" rx="5" ry="4" fill="var(--neon-cyan)" opacity="0.9" />
        {/* Eye highlights */}
        <circle cx="87" cy="86" r="1.5" fill="white" opacity="0.9" />
        <circle cx="117" cy="86" r="1.5" fill="white" opacity="0.9" />
        {eyeSparkle && (
          <>
            <circle cx="82" cy="84" r="1" fill="var(--neon-pink)" opacity="0.8" />
            <circle cx="120" cy="84" r="1" fill="var(--neon-pink)" opacity="0.8" />
          </>
        )}

        {/* Mouth */}
        <path d={mouthCurve} stroke="var(--neon-pink)" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Body - angular armor-like outfit */}
        <path
          d="M 75 145 L 68 180 Q 68 192 100 192 Q 132 192 132 180 L 125 145 Q 115 150 100 150 Q 85 150 75 145 Z"
          fill="url(#bodyGrad)"
          opacity="0.85"
        />
        {/* Armor accent lines */}
        <path d="M 85 155 L 82 180" stroke="var(--neon-cyan)" strokeWidth="1" opacity="0.6" />
        <path d="M 115 155 L 118 180" stroke="var(--neon-cyan)" strokeWidth="1" opacity="0.6" />
        <path d="M 100 150 L 100 185" stroke="var(--neon-cyan)" strokeWidth="1" opacity="0.4" />

        {/* Left arm */}
        <g transform={`rotate(${armAngle} 75 155)`}>
          <path
            d="M 75 155 L 55 170 L 50 165"
            stroke="var(--neon-pink)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          {/* Hand glow */}
          <circle cx="50" cy="165" r="4" fill="var(--neon-cyan)" opacity="0.5" />
        </g>

        {/* Right arm */}
        <g transform={`rotate(${-armAngle} 125 155)`}>
          <path
            d="M 125 155 L 145 170 L 150 165"
            stroke="var(--neon-pink)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="150" cy="165" r="4" fill="var(--neon-cyan)" opacity="0.5" />
        </g>

        {/* Neon accents / energy particles */}
        <circle cx="45" cy="75" r="2" fill="var(--neon-cyan)" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="155" cy="80" r="1.5" fill="var(--neon-pink)" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="160" cy="60" r="1" fill="var(--neon-purple)" opacity="0.4">
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="40" cy="55" r="1.5" fill="var(--neon-pink)" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.1;0.3" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </svg>

      <style jsx>{`
        .mascot-float {
          animation: mascotFloat 3s ease-in-out infinite;
        }
        @keyframes mascotFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
