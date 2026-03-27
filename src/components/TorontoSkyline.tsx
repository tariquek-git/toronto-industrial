'use client';

interface TorontoSkylineProps {
  offsetX: number;
  offsetY: number;
}

export default function TorontoSkyline({ offsetX, offsetY }: TorontoSkylineProps) {
  return (
    <div
      className="absolute inset-0 overflow-hidden opacity-[0.07] pointer-events-none"
      style={{
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    >
      <svg
        viewBox="0 0 1200 400"
        fill="currentColor"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] text-primary"
        preserveAspectRatio="xMidYMax meet"
      >
        {/* CN Tower */}
        <rect x="540" y="20" width="6" height="300" />
        <rect x="530" y="10" width="26" height="15" rx="3" />
        <ellipse cx="543" cy="120" rx="18" ry="8" />
        <rect x="528" y="112" width="30" height="20" rx="2" />

        {/* Rogers Centre / Skydome */}
        <path d="M 460 320 Q 490 280 520 320 Z" />
        <rect x="460" y="320" width="60" height="20" />

        {/* Downtown towers - left cluster */}
        <rect x="350" y="180" width="30" height="160" />
        <rect x="385" y="200" width="25" height="140" />
        <rect x="415" y="220" width="20" height="120" />
        <rect x="310" y="240" width="35" height="100" />

        {/* Downtown towers - right cluster */}
        <rect x="580" y="160" width="35" height="180" />
        <rect x="620" y="190" width="28" height="150" />
        <rect x="655" y="210" width="22" height="130" />
        <rect x="685" y="230" width="30" height="110" />

        {/* First Canadian Place */}
        <rect x="440" y="140" width="28" height="200" />
        <polygon points="440,140 454,120 468,140" />

        {/* TD towers */}
        <rect x="490" y="200" width="22" height="140" />
        <rect x="515" y="210" width="20" height="130" />

        {/* Far left buildings */}
        <rect x="200" y="280" width="40" height="60" />
        <rect x="245" y="260" width="30" height="80" />
        <rect x="280" y="270" width="25" height="70" />

        {/* Far right buildings */}
        <rect x="730" y="270" width="35" height="70" />
        <rect x="770" y="250" width="28" height="90" />
        <rect x="805" y="280" width="40" height="60" />
        <rect x="850" y="290" width="30" height="50" />

        {/* Ground line */}
        <rect x="0" y="340" width="1200" height="60" opacity="0.3" />
      </svg>
    </div>
  );
}
