"use client";

import { useState } from "react";
import { Skill } from "@/engine/mathEngine";

export default function SkillSelector({
  skills,
  onConfirm
}: {
  skills: Skill[];
  onConfirm: (selected: Skill[]) => void;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  function toggle(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  function confirm() {
    const selected = skills.filter((s) => selectedIds.includes(s.id));
    onConfirm(selected);
  }

  return (
    <div className="w-full max-w-md bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Kies oefeningen</h2>

      <div className="flex flex-col gap-2 mb-4">
        {skills.map((skill) => (
          <label
            key={skill.id}
            className="flex items-center gap-2 text-sm"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(skill.id)}
              onChange={() => toggle(skill.id)}
            />
            {skill.description} ({skill.module})
          </label>
        ))}
      </div>

      <button
        onClick={confirm}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Start sessie
      </button>
    </div>
  );
}
