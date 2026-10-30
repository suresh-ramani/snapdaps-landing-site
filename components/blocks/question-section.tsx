import { Section } from "./section";

/**
 * One question-led section (AEO / GEO): the question is the H2, and the direct answer — 40–60
 * words, quotable on its own — sits right under it, before any detail. Search snippets, People
 * Also Ask and AI answer engines lift exactly this pair. Children add the detail (steps, lists,
 * tables, visuals).
 *
 * Answers state only real product facts. Keep the question in natural search language
 * ("How do you share wedding photos with guests?").
 */
export function QuestionSection({
  id,
  question,
  answer,
  tone,
  align,
  className,
  children,
}: {
  id: string;
  question: string;
  /** 40–60 words, a complete answer on its own. */
  answer: string;
  tone?: "default" | "panel";
  align?: "left" | "center";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Section id={id} title={question} intro={<p>{answer}</p>} tone={tone} align={align} className={className}>
      {children}
    </Section>
  );
}
