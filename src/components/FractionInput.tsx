"use client";

type FractionInputProps = {
  value: { numerator: string; denominator: string };
  onChange: (value: { numerator: string; denominator: string }) => void;
};

export default function FractionInput({ value, onChange }: FractionInputProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <input
        type="text"
        value={value.numerator}
        onChange={(e) =>
          onChange({ ...value, numerator: e.target.value })
        }
        className="w-16 border rounded p-1 text-center"
        placeholder="teller"
      />
      
      <div className="w-full h-px bg-black" />

      <input
        type="text"
        value={value.denominator}
        onChange={(e) =>
          onChange({ ...value, denominator: e.target.value })
        }
        className="w-16 border rounded p-1 text-center"
        placeholder="noemer"
      />
    </div>
  );
}
