import { useState } from 'react';
import { FORGEORIA_LOGO } from '../../lib/forgeoria';

type WordmarkProps = { className?: string; tone?: 'dark' | 'light' };

/** Text brand, usable on any background. */
export function ForgeOriaWordmark({ className = '', tone = 'dark' }: WordmarkProps) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      <span className={tone === 'dark' ? 'text-white' : 'text-forge-text'}>Forge</span>
      <span className="text-forge-orange">Oria</span>
    </span>
  );
}

type LogoProps = { className?: string; fallbackClassName?: string; eager?: boolean };

/**
 * Raster logo (white wordmark) — render on dark backgrounds only.
 * Falls back to the text wordmark if the asset is not installed or fails to load.
 */
export function ForgeOriaLogo({ className = 'h-16 w-auto', fallbackClassName = 'text-4xl', eager = false }: LogoProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <ForgeOriaWordmark className={fallbackClassName} />;
  return (
    <img
      src={FORGEORIA_LOGO.src}
      width={FORGEORIA_LOGO.width}
      height={FORGEORIA_LOGO.height}
      alt="ForgeOria"
      className={`object-contain ${className}`}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
