"use client";

/** Allura cursive (banner style) with clearer capital letters. */
export function CursiveText({
  text,
  className = "",
  mode = "words",
}: {
  text: string;
  className?: string;
  /** "words" = capital at start of each word; "first" = only the first letter */
  mode?: "words" | "first";
}) {
  if (mode === "first") {
    const first = text.charAt(0).toUpperCase();
    const rest = text.slice(1);
    return (
      <span className={`font-script ${className}`.trim()}>
        <span className="inline-block origin-bottom text-[1.18em] leading-none tracking-wide">
          {first}
        </span>
        <span className="leading-none">{rest}</span>
      </span>
    );
  }

  const lines = text.split("\n");

  return (
    <span className={`font-script ${className}`.trim()}>
      {lines.map((line, lineIndex) => (
        <span key={lineIndex} className={lineIndex > 0 ? "block" : undefined}>
          {renderLine(line)}
        </span>
      ))}
    </span>
  );
}

function renderLine(line: string) {
  const parts = line.split(/(\s+|&)/);
  return parts.map((part, i) => {
    if (!part || part === "&" || /^\s+$/.test(part)) {
      return <span key={i}>{part}</span>;
    }
    const first = part.charAt(0).toUpperCase();
    const rest = part.slice(1);
    return (
      <span key={i}>
        <span className="inline-block origin-bottom text-[1.18em] leading-none tracking-wide">
          {first}
        </span>
        <span className="leading-none">{rest}</span>
      </span>
    );
  });
}
