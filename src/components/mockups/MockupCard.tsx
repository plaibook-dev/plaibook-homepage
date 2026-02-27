interface MockupCardProps {
  className?: string;
  children: React.ReactNode;
}

export default function MockupCard({ className = "", children }: MockupCardProps) {
  return (
    <div className={`rounded-xl bg-white shadow-sm ring-1 ring-slate-900/10 ${className}`}>
      {children}
    </div>
  );
}
