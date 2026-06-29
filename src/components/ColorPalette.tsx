import type { ColorSwatch } from "@/types/site-config";

export function ColorPalette({
  colors,
  label,
}: {
  colors: ColorSwatch[];
  label: string;
}) {
  return (
    <div className="mt-4">
      <p className="font-cursive mb-3 text-xl text-[#5c5348] sm:text-2xl">{label}</p>
      <div className="flex flex-wrap justify-center gap-3 sm:justify-start sm:gap-4">
        {colors.map((color) => (
          <div key={color.hex} className="group flex flex-col items-center gap-1.5">
            <div
              className="h-10 w-10 rounded-full border-2 border-white shadow-md transition-transform group-hover:scale-110 sm:h-12 sm:w-12"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
            <span className="max-w-[3.5rem] text-center text-[9px] leading-tight text-[#6b6358] sm:text-[10px]">
              {color.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
