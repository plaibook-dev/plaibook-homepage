import BrowserFrame from "./BrowserFrame";
import PhoneFrame from "./PhoneFrame";

type MediaType = "screenshot" | "video" | "diagram" | "photo";

interface MediaPlaceholderProps {
  type?: MediaType;
  aspectRatio?: string;
  description: string;
  browserChrome?: boolean;
  phoneFrame?: boolean;
  className?: string;
}

function MonitorIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6,3 20,12 6,21" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="12" width="4" height="9" />
      <rect x="10" y="7" width="4" height="14" />
      <rect x="17" y="3" width="4" height="18" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

const iconMap: Record<MediaType, () => React.JSX.Element> = {
  screenshot: MonitorIcon,
  video: PlayIcon,
  diagram: ChartIcon,
  photo: CameraIcon,
};

export default function MediaPlaceholder({
  type = "screenshot",
  aspectRatio = "16/9",
  description,
  browserChrome = false,
  phoneFrame = false,
  className = "",
}: MediaPlaceholderProps) {
  const Icon = iconMap[type];

  const placeholder = (
    <div
      className={`relative bg-surface-alt border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center ${className}`}
      style={{ aspectRatio }}
    >
      {/* Icon and description */}
      <div className="text-text-muted">
        <Icon />
      </div>
      <p className="text-text-muted text-sm mt-2 px-4 text-center">
        {description}
      </p>

      {/* Video play button overlay */}
      {type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-text-primary ml-1"
            >
              <polygon points="6,3 20,12 6,21" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );

  if (browserChrome) {
    return <BrowserFrame>{placeholder}</BrowserFrame>;
  }

  if (phoneFrame) {
    return <PhoneFrame>{placeholder}</PhoneFrame>;
  }

  return placeholder;
}
