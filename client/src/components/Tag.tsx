import type { BaseProps } from "../types/BaseProps";

export default function Tag({ children }: BaseProps) {
  return (
    <span className="px-3 py-1 text-sm rounded-full border-2 border-dashed border-red-500 text-red-700 bg-red-50 font-mono shadow-[3px_3px_0_0_#111827] hover:bg-red-100 transition-colors cursor-pointer">
      {children}
    </span>
  );
}
