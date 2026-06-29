import { WEDDING } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#2c2c2c] px-4 py-10 text-center sm:px-6">
      <p className="font-serif text-xl text-[#faf7f2] sm:text-2xl">{WEDDING.couple.display}</p>
      <p className="mt-2 text-sm text-[#c4a77d]">{WEDDING.dateDisplay}</p>
      <p className="mt-6 text-xs text-[#8b8b8b]">
        Con amor, esperamos celebrar contigo este día especial.
      </p>
    </footer>
  );
}
