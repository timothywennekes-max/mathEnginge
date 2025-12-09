"use client";

export default function SetInput({ value, onChange }) {
  return (
    <input
      className="border p-2 rounded w-full"
      placeholder="{1;3;5}"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
