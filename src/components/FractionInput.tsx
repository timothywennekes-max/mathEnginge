"use client";

export default function FractionInput({ value, onChange }) {
  return (
    <div className="flex flex-col items-center">
      <input
        className="border px-2 py-1 w-20 text-center"
        placeholder="teller"
        value={value.num}
        onChange={(e) => onChange({ ...value, num: e.target.value })}
      />

      <div className="w-20 h-px bg-black my-1"></div>

      <input
        className="border px-2 py-1 w-20 text-center"
        placeholder="noemer"
        value={value.den}
        onChange={(e) => onChange({ ...value, den: e.target.value })}
      />
    </div>
  );
}
