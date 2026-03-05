export default function WaveLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Peeling right wave — curling lip from left to right */}
      <path
        d="M2 22C4 18 8 14 12 13C16 12 18 14 20 12C22 10 23 6 26 4C29 2 32 3 34 5C36 7 37 10 36 13C35 16 32 18 30 19C28 20 26 19.5 24 20C22 20.5 20 22 18 23C16 24 12 25 8 25C5 25 3 24 2 22Z"
        fill="#00B4D8"
        opacity="0.3"
      />
      {/* Wave face */}
      <path
        d="M4 24C6 20 10 16 14 14.5C18 13 20 15 22 13C24 11 25 7 28 5C30 3.5 32.5 4 34 5.5"
        stroke="#00B4D8"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Curling lip — the peeling right barrel */}
      <path
        d="M34 5.5C35.5 7 36.5 9.5 35.5 12C34.5 14.5 32 16 29 17C26 18 24 17 22 17.5"
        stroke="#90E0EF"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Spray/foam at the lip */}
      <circle cx="35" cy="4" r="1" fill="#90E0EF" opacity="0.7" />
      <circle cx="37" cy="6" r="0.7" fill="#90E0EF" opacity="0.5" />
      <circle cx="36.5" cy="3" r="0.5" fill="white" opacity="0.6" />
      {/* Whitewash/foam line */}
      <path
        d="M3 25C7 24 11 25.5 15 25C19 24.5 22 23 26 23.5C29 24 32 25 36 24"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
