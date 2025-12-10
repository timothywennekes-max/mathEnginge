"use client";

type SetInputProps = {
  value: number[];
  onChange: (value: number[]) => void;
};

export default function SetInput({ value, onChange }: SetInputProps) {
  function parseInput(text: string): number[] {
    return text
      .split(/[,; ]+/)
      .map((x) => x.trim())
      .filter((x) => x !== "")
      .map(Number)
      .filter((n) => !isNaN(n));
  }

  return (
    <input
      className="border p-2 rounded w-full font-mono"
      value={value.join(", ")}
      placeholder="bijv. 1, 2, 5"
      onChange={(e) => onChange(parseInput(e.target.value))}
    />
  );
}
