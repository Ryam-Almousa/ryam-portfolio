export default function SkillBadge({ label }) {
  return (
    <span className="inline-flex items-center justify-center rounded-full border border-border bg-card px-4 py-2 text-sm text-slate-700 dark:text-slate-200 card-hover">
      {label}
    </span>
  );
}
