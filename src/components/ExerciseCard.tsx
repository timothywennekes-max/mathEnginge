"use client";

import { useState, useEffect } from "react";
import { canonicalExpression, canonicalNumber } from "@/engine/strategies/canonical";



type StudentStep = {
  prompt: string;
  expected: string;
};

type Exercise = {
  type: string;
  description: string;
  expression: string;
  result: any;
  stepsSolution?: string[];
  stepsStudent?: StudentStep[];
};

type Props = {
  exercise: Exercise;
  onNext: () => void;
  onResult: (correct: boolean) => void;
};

export default function ExerciseCard({ exercise, onNext, onResult }: Props) {
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [studentSteps, setStudentSteps] = useState<string[]>(
    exercise.stepsStudent ? Array(exercise.stepsStudent.length).fill("") : []
  );

  // Reset bij nieuwe oefening
  useEffect(() => {
    if (exercise.stepsStudent) {
      setStudentSteps(Array(exercise.stepsStudent.length).fill(""));
    } else {
      setStudentSteps([]);
    }
    setAnswer("");
    setChecked(false);
    setIsCorrect(null);
  }, [exercise]);

  // -----------------------------------------
  // UPDATE STUDENT INPUT
  // -----------------------------------------
  function updateStudentStep(i: number, value: string) {
    setStudentSteps(prev => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }

  // -----------------------------------------
  // CHECK OF 1 TUSSENSTAP JUIST IS
  // -----------------------------------------
  function studentStepCorrect(i: number): boolean {
    if (!exercise.stepsStudent) return true;

    const expected = String(exercise.stepsStudent[i]?.expected ?? "").trim();
    const given = String(studentSteps[i] ?? "").trim();

    // Stap is numeriek (bv. 8, -3)
    if (/^[+\-]?\d+$/.test(expected)) {
      return canonicalNumber(expected) === canonicalNumber(given);
    }

    // Anders: expressie
    return canonicalExpression(expected) === canonicalExpression(given);
  }

  // -----------------------------------------
  // ALLE STAPPEN JUIST?
  // -----------------------------------------
  const allStepsCorrect =
    exercise.stepsStudent && exercise.stepsStudent.length > 0
      ? exercise.stepsStudent.every((_, i) => {
          const filled = (studentSteps[i] ?? "").trim() !== "";
          return filled && studentStepCorrect(i);
        })
      : true;

  // -----------------------------------------
  // CHECK EINDEVALUATIE
  // -----------------------------------------
  function handleCheck() {
    if (checked) return;

    let ok = false;

    if (exercise.type === "number") {
      ok =
        canonicalNumber(answer) ===
        canonicalNumber(String(exercise.result));
    }

    setIsCorrect(ok);
    setChecked(true);
    onResult(ok);
  }

  const canCheck = allStepsCorrect && answer.trim() !== "";

  // -----------------------------------------
  // RENDER CARD
  // -----------------------------------------
  return (
    <div className="border rounded-xl shadow-md bg-white p-6">

      {exercise.description && (
        <p className="text-sm text-slate-500 mb-2">{exercise.description}</p>
      )}

      <h2 className="text-2xl font-semibold mb-4 text-center font-mono">
        {exercise.expression}
      </h2>

      {/* ------------------------------ */}
      {/* TUSSENSTAPPEN VAN DE LEERLING */}
      {/* ------------------------------ */}
      {exercise.stepsStudent && exercise.stepsStudent.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-slate-700 mb-2">Tussenstappen</h3>

          {exercise.stepsStudent.map((step, i) => {
            const value = studentSteps[i] ?? "";
            const filled = value.trim() !== "";
            const correct = filled && studentStepCorrect(i);

            return (
              <div key={i} className="mb-3 p-3 border rounded bg-slate-50">
                <p className="text-sm font-medium mb-1">{step.prompt}</p>

                {/* CONDITIONELE UI VOOR STAP 3 EN 4 */}
                {i === 2 ? (
                  <div className="flex items-center gap-2">
                    <span>(+ </span>
                    <input
                      className="p-2 border rounded w-24 font-mono"
                      value={value}
                      onChange={(e) => updateStudentStep(i, e.target.value)}
                    />
                    <span>)</span>
                  </div>
                ) : i === 3 ? (
                  <div className="flex items-center gap-2">
                    <span>( </span>
                    <input
                      className="p-2 border rounded w-24 font-mono"
                      value={value}
                      onChange={(e) => updateStudentStep(i, e.target.value)}
                    />
                    <span>)</span>
                  </div>
                ) : (
                  <input
                    className="w-full p-2 border rounded font-mono bg-white"
                    value={value}
                    onChange={(e) => updateStudentStep(i, e.target.value)}
                    placeholder="Jouw stap…"
                  />
                )}

                {filled && (
                  <p
                    className={
                      correct
                        ? "text-green-600 text-xs mt-1"
                        : "text-red-600 text-xs mt-1"
                    }
                  >
                    {correct ? "Juist" : "Niet correct"}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ------------------------------ */}
      {/* EINDEVALUATIE */}
      {/* ------------------------------ */}
      <div className="mb-6">
        <h3 className="font-semibold mb-1">Eindantwoord</h3>
        <input
          type="text"
          className="w-full p-2 border rounded font-mono"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={!allStepsCorrect}
          placeholder="Geef je antwoord"
        />

        {!allStepsCorrect && (
          <p className="text-xs text-slate-500 mt-1">
            Je moet eerst alle tussenstappen correct invullen.
          </p>
        )}

        {checked && (
          <p
            className={
              isCorrect
                ? "text-green-600 mt-2 font-medium"
                : "text-red-600 mt-2 font-medium"
            }
          >
            {isCorrect ? "Juist!" : "Helaas, probeer opnieuw."}
          </p>
        )}
      </div>

      {/* ------------------------------ */}
      {/* BUTTONS */}
      {/* ------------------------------ */}
      <div className="flex gap-2">
        {!checked ? (
          <button
            onClick={handleCheck}
            disabled={!canCheck}
            className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Controleer
          </button>
        ) : (
          <button
            onClick={onNext}
            className="flex-1 bg-slate-200 py-2 rounded hover:bg-slate-300"
          >
            Volgende
          </button>
        )}
      </div>

      {/* ------------------------------ */}
      {/* VOLLEDIG STAPPENPLAN */}
      {/* ------------------------------ */}
      {exercise.stepsSolution && (
        <details className="mt-6 p-3 border rounded bg-slate-100">
          <summary className="cursor-pointer font-semibold text-slate-700">
            Toon volledig stappenplan
          </summary>
          <ol className="list-decimal ml-6 mt-3 space-y-1">
            {exercise.stepsSolution.map((s, i) => (
              <li key={i} className="text-sm">{s}</li>
            ))}
          </ol>
        </details>
      )}
    </div>
  );
}
