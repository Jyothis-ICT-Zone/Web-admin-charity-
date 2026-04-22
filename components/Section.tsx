import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  description?: string;
  children?: ReactNode;
};

export function Section({ title, description, children }: SectionProps) {
  return (
    <section className="space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {title}
        </h1>
        {description ? (
          <p className="mt-1 max-w-2xl text-sm text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        ) : null}
      </header>
      {children ? (
        <div className="rounded-lg border border-dashed border-zinc-300 bg-zinc-50/80 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
          {children}
        </div>
      ) : null}
    </section>
  );
}
