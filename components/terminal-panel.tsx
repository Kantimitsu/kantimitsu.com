export function TerminalPanel({ label, code, tone = 'green', children, className = '' }: {
  label: string;
  code?: string;
  tone?: 'green' | 'amber' | 'red';
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`terminal-panel tone-${tone} ${className}`}>
      <div className="panel-label"><span>▌ {label} ▐</span><span>{code}</span></div>
      {children}
    </section>
  );
}

export function StatusTag({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'amber' | 'red' }) {
  return <span className={`status-tag tone-${tone}`}>{children}</span>;
}
