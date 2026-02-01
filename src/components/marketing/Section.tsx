interface Props {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
  spacing?: "tight" | "default" | "loose" | "none";
  bg?: "white" | "cream" | "gray" | "green-tint" | "dark" | "dark-alt" | "primary";
}

const spacingClasses = {
  tight: "py-12 sm:py-16",
  default: "py-16 sm:py-24",
  loose: "py-24 sm:py-36",
  none: "py-0",
};

const bgClasses = {
  white: "bg-surface text-text-primary",
  cream: "bg-surface-warm text-text-primary",
  gray: "bg-surface-alt text-text-primary",
  "green-tint": "bg-primary-lightest text-text-primary",
  dark: "bg-bg-dark text-text-light",
  "dark-alt": "bg-bg-dark-alt text-text-light",
  primary: "bg-primary text-text-light",
};

export default function Section({
  children,
  className = "",
  dark = false,
  id,
  spacing = "default",
  bg,
}: Props) {
  const resolvedBg = bg
    ? bgClasses[bg]
    : dark
      ? bgClasses.dark
      : bgClasses.white;

  return (
    <section
      id={id}
      className={`${spacingClasses[spacing]} ${resolvedBg} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
