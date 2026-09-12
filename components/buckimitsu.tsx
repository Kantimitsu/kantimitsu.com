export function BuckimitsuGarnish({ caption = 'BUCKIMITSU // STAGEHAND ON DUTY', pose = 'walk' }: { caption?: string; pose?: 'walk' | 'static' }) {
  return (
    <div className={`buck-garnish ${pose === 'static' ? 'is-static' : ''}`} aria-hidden="true">
      <div className="buckimitsu" />
      <span>{caption}</span>
    </div>
  );
}
