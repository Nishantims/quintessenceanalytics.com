const CAPABILITIES = [
  "AI-Driven Decision Systems",
  "Predictive Forecasting",
  "Real-Time BI Dashboards",
  "Patent & IP Intelligence",
  "Regulatory Tracking",
  "Competitive Benchmarking",
  "Affordable AI Products",
  "Custom Market Sizing",
];

export function CapabilityMarquee() {
  const items = [...CAPABILITIES, ...CAPABILITIES];
  return (
    <div className="overflow-hidden border-y border-border bg-surface py-4">
      <div className="flex w-max qa-marquee-track">
        {items.map((c, i) => (
          <span key={i} className="flex items-center gap-3 px-6 text-[13px] font-semibold whitespace-nowrap text-text-secondary">
            {c}
            <span className="h-1 w-1 rounded-full bg-grey" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
