export function CrestSvg({
  motif = "star",
  size = 80,
}: {
  motif?: "star" | "leaf" | "wave" | "crown";
  size?: number;
}) {
  const stroke = "currentColor";
  const sw = 1.5;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke={stroke}
      strokeWidth={sw}
      aria-hidden
      className="opacity-90"
    >
      <circle cx="50" cy="50" r="46" />
      <circle cx="50" cy="50" r="40" strokeDasharray="2 3" />
      {motif === "star" && (
        <>
          <path d="M50 22 L57 44 L80 44 L61 57 L68 79 L50 65 L32 79 L39 57 L20 44 L43 44 Z" />
          <circle cx="50" cy="55" r="3" fill="currentColor" />
        </>
      )}
      {motif === "leaf" && (
        <>
          <path d="M50 20 C30 35, 30 65, 50 80 C70 65, 70 35, 50 20 Z" />
          <path d="M50 25 L50 78" />
          <path d="M50 40 L38 48 M50 50 L36 58 M50 60 L40 67" />
          <path d="M50 40 L62 48 M50 50 L64 58 M50 60 L60 67" />
        </>
      )}
      {motif === "wave" && (
        <>
          <path d="M18 45 Q30 35, 42 45 T66 45 T82 45" />
          <path d="M18 55 Q30 45, 42 55 T66 55 T82 55" />
          <path d="M18 65 Q30 55, 42 65 T66 65 T82 65" />
        </>
      )}
      {motif === "crown" && (
        <>
          <path d="M22 62 L30 35 L42 55 L50 30 L58 55 L70 35 L78 62 Z" />
          <path d="M22 68 L78 68" />
          <circle cx="30" cy="35" r="2.5" fill="currentColor" />
          <circle cx="50" cy="30" r="2.5" fill="currentColor" />
          <circle cx="70" cy="35" r="2.5" fill="currentColor" />
        </>
      )}
    </svg>
  );
}