import MockupCard from "./MockupCard";

interface MockupKPICardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  subtitle?: string;
}

export default function MockupKPICard({ icon, label, value, subtitle }: MockupKPICardProps) {
  return (
    <MockupCard className="px-3 py-2.5 flex flex-col items-center text-center">
      <div className="text-slate-400 mb-1">{icon}</div>
      <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="text-lg font-bold font-mono tabular-nums text-slate-900 leading-tight">{value}</p>
      {subtitle && <p className="text-[10px] text-slate-400 mt-0.5">{subtitle}</p>}
    </MockupCard>
  );
}
