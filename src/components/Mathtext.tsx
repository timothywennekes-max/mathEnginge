"use client";

import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

type Props = {
  value: string;
  block?: boolean; // inline = false, block = true
};

export default function MathText({ value, block = false }: Props) {
  const clean = value.trim();
  return block ? (
    <BlockMath math={clean} />
  ) : (
    <InlineMath math={clean} />
  );
}
