import FadeIn from "./FadeIn";

interface Props {
  title: string;
  description: string;
  index: number;
  icon?: React.ReactNode;
}

export default function FeatureCard({ title, description, index, icon }: Props) {
  return (
    <FadeIn delay={index * 0.1}>
      <div className="group relative p-6 rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-white">
        {icon && (
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors">
            {icon}
          </div>
        )}
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </FadeIn>
  );
}
