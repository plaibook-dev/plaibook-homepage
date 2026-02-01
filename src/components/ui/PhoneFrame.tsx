interface PhoneFrameProps {
  className?: string;
  children: React.ReactNode;
}

export default function PhoneFrame({
  className = "",
  children,
}: PhoneFrameProps) {
  return (
    <div
      className={`bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl ${className}`}
      style={{ maxWidth: 320 }}
    >
      {/* Notch */}
      <div className="bg-gray-900 w-24 h-5 rounded-full mx-auto -mt-1 mb-2 relative z-10" />

      {/* Screen area */}
      <div className="bg-white rounded-[2rem] overflow-hidden relative">
        {children}
      </div>

      {/* Home indicator */}
      <div className="w-32 h-1 bg-gray-300 rounded-full mx-auto mt-2" />
    </div>
  );
}
