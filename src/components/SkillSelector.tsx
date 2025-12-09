"use client";

import { useState } from "react";
import { Skill } from "@/engine/mathEngine";

type Props = {
  skills: Skill[];
  onConfirm: (skills: Skill[]) => void;
};

export default function SkillSelector({ skills, onConfirm }: Props) {
  // Alle unieke modules (GH05, GH06, …)
  const modules = [...new Set(skills.map((s) => s.module))];

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function toggleSkill(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleConfirm() {
    const chosen = skills.filter((s) => selectedIds.includes(s.id));
    if (chosen.length === 0) return;
    onConfirm(chosen);
  }

  const somethingSelected = selectedIds.length > 0;

  return (
    <div className="max-w-3xl w-full mx-auto p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4">
        Kies de oefeningen die je wilt trainen
      </h1>

      <p className="text-sm text-slate-600 mb-6">
        Je kunt meerdere types oefeningen tegelijk selecteren. 
        Nieuwe oefenvormen (bv. gedurige sommen in GH05) verschijnen automatisch 
        zodra ze in <code>skills.json</code> staan.
      </p>

      <div className="space-y-6 max-h-[60vh] overflow-auto pr-2">
        {modules.map((mod) => {
          const group = skills.filter((s) => s.module === mod);

          return (
            <section key={mod} className="border rounded-lg p-4 bg-slate-50">
              <h2 className="text-lg font-semibold mb-2">{mod}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {group.map((skill) => {
                  const active = selectedIds.includes(skill.id);
                  return (
                    <button
                      key={skill.id}
                      type="button"
                      onClick={() => toggleSkill(skill.id)}
                      className={
                        "text-left p-2 rounded border " +
                        (active
                          ? "bg-blue-600 text-white border-blue-700"
                          : "bg-white text-slate-800 hover:bg-slate-100")
                      }
                    >
                      <div className="text-sm font-medium">
                        {skill.description}
                      </div>
                      <div className="text-xs text-slate-500">
                        {skill.type}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!somethingSelected}
          className={
            "px-4 py-2 rounded font-medium " +
            (somethingSelected
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-slate-300 text-slate-600 cursor-not-allowed")
          }
        >
          Start sessie
        </button>
      </div>
    </div>
  );
}
