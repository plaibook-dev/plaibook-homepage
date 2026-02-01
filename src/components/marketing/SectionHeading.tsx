import FadeIn from "./FadeIn";

const eyebrowColorClasses = {
  primary: "text-primary",
  red: "text-accent-red",
  gold: "text-accent-gold",
};

interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  /** @deprecated Use `align` instead */
  centered?: boolean;
  align?: "center" | "left";
  light?: boolean;
  sticky?: boolean;
  eyebrowColor?: "primary" | "red" | "gold";
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  centered,
  align,
  light = false,
  sticky = false,
  eyebrowColor = "primary",
}: Props) {
  const isCenter = align ? align === "center" : (centered ?? true);

  return (
    <FadeIn
      className={`max-w-3xl ${isCenter ? "mx-auto text-center" : ""} mb-16 ${
        sticky ? "lg:sticky lg:top-24" : ""
      }`}
    >
      {eyebrow && (
        <p
          className={`text-sm font-semibold uppercase tracking-widest ${eyebrowColorClasses[eyebrowColor]} mb-3 font-mono`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
          light ? "text-text-light" : "text-text-primary"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg ${
            light ? "text-gray-400" : "text-text-muted"
          }`}
        >
          {description}
        </p>
      )}
    </FadeIn>
  );
}
