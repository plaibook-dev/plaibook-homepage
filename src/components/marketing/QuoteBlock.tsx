interface Props {
  quote: string;
  name: string;
  company: string;
  variant?: "inline" | "fullWidth" | "dark";
}

export default function QuoteBlock({
  quote,
  name,
  company,
  variant = "inline",
}: Props) {
  if (variant === "fullWidth") {
    return (
      <div className="bg-surface-warm rounded-xl px-8 py-8 md:px-12 md:py-10 mt-12">
        <p className="italic text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
          {quote}
        </p>
        <p className="mt-4 text-sm">
          <span className="font-semibold text-text-primary">&mdash; {name}</span>
          <span className="text-text-muted">, {company}</span>
        </p>
      </div>
    );
  }

  if (variant === "dark") {
    return (
      <div className="border-l-3 border-primary pl-6 py-2">
        <p className="italic text-text-light/80 leading-relaxed">{quote}</p>
        <p className="mt-3 text-sm">
          <span className="font-semibold text-text-light">&mdash; {name}</span>
          <span className="text-gray-400">, {company}</span>
        </p>
      </div>
    );
  }

  // inline (default)
  return (
    <div className="border-l-3 border-primary pl-6 py-2">
      <p className="italic text-text-secondary leading-relaxed">{quote}</p>
      <p className="mt-3 text-sm">
        <span className="font-semibold text-text-primary">&mdash; {name}</span>
        <span className="text-text-muted">, {company}</span>
      </p>
    </div>
  );
}
