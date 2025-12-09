"use client";

import { useState } from "react";
import FractionInput from "./FractionInput";
import SetInput from "./SetInput";
import { InlineMath } from "react-katex";

export default function ExerciseCard({ exercise, onNext, onResult }) {
  const [input, setInput] = useState<any>("");
  const [status, setStatus] = useState<"idle"|"correct"|"wrong">("idle");

  function normalizedResult(res: any): any {
    if (Array.isArray(res)) return res.slice().sort((a,b)=>a-b);
    return res;
  }

  function check() {
  let correct = false;
  const expected = exercise.result;

  // SETS
  if (exercise.type === "set") {
    if (typeof input !== "string") {
      correct = false;
    } else {
      const cleaned = input
        .replace("{", "")
        .replace("}", "")
        .split(/[,;]+/)
        .map((x) => Number(x.trim()))
        .filter((x) => !isNaN(x))
        .sort((a, b) => a - b);

      const expectedSorted = [...expected].sort((a, b) => a - b);

      correct = JSON.stringify(cleaned) === JSON.stringify(expectedSorted);
    }
  }

  // RATIONALS
  else if (exercise.type === "rational") {
    const val = Number(input.num) / Number(input.den);
    correct = val === expected;
  }

  // NUMBERS
  else if (exercise.type === "number") {
    correct = Number(input) === expected;
  }

  // BOOLEAN
  else if (exercise.type === "boolean") {
    const u = (input + "").toLowerCase();
    correct = (u === "ja" && expected) || (u === "nee" && !expected);
  }

  onResult(correct);

  if (correct) {
    setStatus("correct");
    setTimeout(() => {
      setInput("");
      setStatus("idle");
      onNext();
    }, 300);
  } else {
    setStatus("wrong");
    setTimeout(() => {
      setStatus("idle");
    }, 600);
  }
}


  function renderInput() {
  const r = exercise.result;

  // ★ BREUKEN
  if (exercise.type === "rational") {
    return (
      <FractionInput
        value={input || { num: "", den: "" }}
        onChange={setInput}
      />
    );
  }

  // ★ SETS
  if (Array.isArray(r)) {
    return (
      <SetInput
        value={typeof input === "string" ? input : ""}
        onChange={setInput}
      />
    );
  }

  // ★ NUMBERS / BOOLEAN
  return (
    <input
      className="border p-2 rounded w-full"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && check()}
    />
  );
}


  return (
    <div className="bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-2">
        {exercise.description}
      </h2>

      <p className="text-xl mb-4">
        <InlineMath math={exercise.expression} />
      </p>

      <div className="mb-4">{renderInput()}</div>

      <button
        onClick={check}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Controleer
      </button>

      {status === "correct" && (
        <p className="text-green-600 mt-2">Juist!</p>
      )}
      {status === "wrong" && (
        <p className="text-red-600 mt-2">Fout!</p>
      )}
    </div>
  );
}
