"use client";

import { useState, useEffect } from "react";
import { canonicalExpression, canonicalNumber } from "@/engine/strategies/canonical";
import MathText from "@/components/MathText";  // <<--- NIEUW

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

  function updateStudentStep(i: number, value: string) {
    setStudentSteps(prev => {
      const next = [...prev];
      next[i] = value;
      return next;
    });
  }

  function studentStepCorrect(i: number): boolean {
    if (!exercise.stepsStudent) return true;

    const expected = String(exercise.stepsStudent[i]?.expected ?? "").trim();
    const given = String(studentSteps[i] ?? "").trim();

    if (/^[+\-]?\d+$/.test(expected)) {
      return canonicalNumber(expected) === canonicalNumber(given);
    }

    return canonicalExpression(expected) === canonicalExpression(given);
  }

  const allStepsCorrect =
    exercise.stepsStudent && exercise.stepsStudent.length > 0
      ? exercise.stepsStudent.every((_, i) => {
          const filled = (studentSteps[i] ?? "").trim() !== "";
          return filled && studentStepCorrect(i);
        })
      : true;

  function handleCheck() {
    if (checked) return;

    let ok = false;

    if (exercise.type === "number") {
      ok = canonicalNumber(answer) === canonicalNumber(String(exercise.result));
    }

    setIsCorrect(ok);
    setChecked(true);
    onResult(ok);
  }

  const canCheck = allStepsCorrect && answer.trim() !== "";

  return (
    <div className="border rounded-xl shadow-md bg-white p-6">

      {/* beschrijving */}
      {exercise.description && (
        <p className="text-sm text-slate-500 mb-2">{exercise.description}</p>
      )}

      {/* EXPRESSIE — NU MET KaTeX */}
      <div className="text-center mb-4 text-2xl font-mono font-semibold">
        <MathText value={exercise.expression} block />
      </div>

      {/* TUSSENSTAPPEN */}
      {exercise.stepsStudent && exercise.stepsStudent.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold text-slate-700 mb-2">Tussenstappen</h3>

          {exercise.stepsStudent.map((step, i) => {
            const value = studentSteps[i] ?? "";
            const filled = value.trim() !== "";
            const correct = filled && studentStepCorrect(i);

            return (
              <div key={i} className="mb-3 p-3 border rounded bg-slate-50">

                {/* prompt → inline math indien nodig */}
                <p className="text-sm font-medium mb-1">
                  <MathText value={step.prompt} />
                </p>

                {/* inputveld */}
                <input
                  className="w-full p-2 border rounded font-mono bg-white"
                  value={value}
                  onChange={(e) => updateStudentStep(i, e.target.value)}
                  placeholder="Jouw stap…"
                />

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
