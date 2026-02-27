import Section from "@/components/marketing/Section";
import FadeIn from "@/components/marketing/FadeIn";

interface TrustItemProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  staggerIndex: number;
}

function TrustItem({ icon, label, description, staggerIndex }: TrustItemProps) {
  return (
    <FadeIn delay={0.05} stagger={0.08} staggerIndex={staggerIndex}>
      <div className="flex gap-4 items-start">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-primary-lightest flex items-center justify-center text-primary">
          {icon}
        </div>
        <div>
          <h3 className="font-heading font-semibold text-text-primary mb-1">
            {label}
          </h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

/* ── Inline SVG icons (simple, ≤5 paths each) ──────────────────────── */

function ShieldIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
      <path d="M15 11l2 2" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

/* ── Trust items data ───────────────────────────────────────────────── */

const trustItems = [
  {
    icon: <ShieldIcon />,
    label: "TCPA Compliant",
    description:
      "We only text inbound inquiries and opted-in lists. No cold blasting, no digital door-knocking.",
  },
  {
    icon: <UserIcon />,
    label: "Human Override",
    description:
      "Switch any conversation from AI to human with one click. You decide when to take over.",
  },
  {
    icon: <LockIcon />,
    label: "Your Data Stays Yours",
    description:
      "We sign NDAs. Your scripts, call data, and customer lists are never shared with competitors.",
  },
  {
    icon: <CalendarIcon />,
    label: "Month-to-Month",
    description:
      "No annual contracts. If we\u2019re not generating ROI, cancel anytime.",
  },
];

/* ── Integration names ──────────────────────────────────────────────── */

const integrations = [
  "FieldRoutes",
  "Five9",
  "RingCentral",
  "Zoom",
  "Dialpad",
  "CallRail",
  "Genesys",
  "GoHighLevel",
  "Slack",
];

/* ── Component ──────────────────────────────────────────────────────── */

export default function TrustSection() {
  return (
    <Section bg="white" spacing="default">
      <FadeIn>
        <p className="text-sm text-text-muted font-medium mb-10 max-w-xl">
          Built for how pest control actually works.
        </p>
      </FadeIn>

      {/* 2x2 grid on desktop, stacked on mobile */}
      <div className="grid sm:grid-cols-2 gap-8 md:gap-10 max-w-4xl">
        {trustItems.map((item, i) => (
          <TrustItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            description={item.description}
            staggerIndex={i}
          />
        ))}
      </div>

      {/* Integrations line */}
      <FadeIn delay={0.4}>
        <div className="mt-12 pt-8 border-t border-gray-100 max-w-4xl">
          <p className="text-sm text-text-muted">
            <span className="text-text-secondary font-medium">
              Connects to
            </span>{" "}
            {integrations.map((name, i) => (
              <span key={name}>
                <span className="text-text-primary font-medium">{name}</span>
                {i < integrations.length - 1 ? (
                  <span className="text-text-muted">
                    {", "}
                  </span>
                ) : null}
              </span>
            ))}
            <span className="text-text-muted">&thinsp;&mdash; and more.</span>
          </p>
        </div>
      </FadeIn>
    </Section>
  );
}
