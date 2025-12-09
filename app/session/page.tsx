"use client";

import { useState, useEffect } from "react";
import ExerciseCard from "@/components/ExerciseCard";
import SkillSelector from "@/components/SkillSelector";
import skillsData from "@/data/skills.json";
import { Skill, Exercise, generateExercise } from "@/engine/mathEngine";
import "katex/dist/katex.min.css";


export default function SessionPage() {
  const allSkills = skillsData.skills as Skill[];

  const [mode, setMode] = useState<"select" | "train">("select");
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [streak, setStreak] = useState(0);

  const [exercise, setExercise] = useState<Exercise | null>(null);

  // -----------------------------------------------------
  // HANDLE SKILL SELECTION
  // -----------------------------------------------------
  function startSession(skills: Skill[]) {
    if (skills.length === 0) return;
    setSelectedSkills(skills);
    setMode("train");

    setExercise(generateExercise(skills[0], difficulty));
  }

  // -----------------------------------------------------
  // TRAINING ENGINE
  // -----------------------------------------------------
  function handleResult(isCorrect: boolean) {
    if (isCorrect) {
      setCorrectCount(c => c + 1);

      setStreak(s => {
        const next = s + 1;

        if (next % 3 === 0) setDifficulty(d => d + 1);

        return next;
      });
    } else {
      setWrongCount(w => w + 1);
      setStreak(0);
    }
  }

  function nextExercise() {
    const skill = selectedSkills[Math.floor(Math.random() * selectedSkills.length)];
    setExercise(generateExercise(skill, difficulty));
  }

  // -----------------------------------------------------
  // RENDER
  // -----------------------------------------------------
  if (mode === "select") {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <SkillSelector
          skills={allSkills}
          onConfirm={startSession}
        />
      </main>
    );
  }

  if (!exercise) return <p>Even geduld…</p>;

  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center pt-10">
      <div className="mb-4 text-lg">
        Juist: {correctCount} &nbsp; Fout: {wrongCount} &nbsp; Moeilijkheid: {difficulty}
      </div>


      <div className="w-full max-w-md">
        <ExerciseCard
          exercise={exercise}
          onNext={nextExercise}
          onResult={handleResult}
        />
      </div>
<button
      onClick={() => {
        setMode("select");
        setSelectedSkills([]);
        setDifficulty(1);
        setStreak(0);
        setCorrectCount(0);
        setWrongCount(0);
      }}
      className="mb-4 text-sm text-blue-600 underline"
    >
      ← Terug naar overzicht
    </button>
    </main>
  );
}
