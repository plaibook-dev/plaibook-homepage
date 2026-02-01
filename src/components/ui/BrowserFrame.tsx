interface BrowserFrameProps {
  url?: string;
  className?: string;
  children: React.ReactNode;
}

export default function BrowserFrame({
  url = "app.plaibook.tech",
  className = "",
  children,
}: BrowserFrameProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden shadow-2xl border border-gray-200 ${className}`}
    >
      {/* Title bar */}
      <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
        {/* Traffic light dots */}
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />

        {/* URL bar */}
        <div className="bg-white rounded-md px-3 py-1 text-xs text-text-muted flex-1 ml-4">
          {url}
        </div>
      </div>

      {/* Content area */}
      {children}
    </div>
  );
}
