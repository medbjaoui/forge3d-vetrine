import { ChevronDown } from 'lucide-react';

const principaux = [
  ['Fonctionnalités', '/vigiparc/fonctionnalites'],
  ['Conformité', '/vigiparc/iso-27001'],
  ['Offres', '/vigiparc/offres'],
  ['Ressources', '/vigiparc/ressources'],
  ['Contact', '/vigiparc/contact'],
] as const;

const secondaires = [
  ['Bornes', '/vigiparc/bornes'],
  ['Sécurité', '/vigiparc/securite-confidentialite'],
  ['Calculateur', '/vigiparc/calculateur'],
  ['Comparatif', '/vigiparc/comparatif'],
  ['Technologie', '/vigiparc/technologie'],
] as const;

export default function VigiParcNav() {
  const path = typeof window === 'undefined' ? '' : window.location.pathname.replace(/\/$/, '');
  const classe = (href: string) => `rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${path === href ? 'bg-orange-100 text-orange-800' : 'text-forge-text-muted hover:bg-orange-50 hover:text-orange-800'}`;
  const secondaireActif = secondaires.some(([, href]) => href === path);

  return (
    <nav className="border-b border-slate-200 bg-white" aria-label="Navigation VigiParc">
      <div className="container-forge flex items-center gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <a href="/vigiparc" aria-current={path === '/vigiparc' ? 'page' : undefined} className={`mr-auto shrink-0 rounded-lg px-3 py-2 text-sm font-bold ${path === '/vigiparc' ? 'bg-forge-dark text-white' : 'text-forge-text hover:bg-slate-100'}`}>VigiParc</a>
        <div className="hidden items-center gap-1 lg:flex">
          {principaux.map(([libelle, href]) => <a key={href} href={href} aria-current={path === href ? 'page' : undefined} className={classe(href)}>{libelle}</a>)}
        </div>
        <details className="group relative">
          <summary className={`flex cursor-pointer list-none items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${secondaireActif ? 'bg-orange-100 text-orange-800' : 'text-forge-text-muted hover:bg-orange-50 hover:text-orange-800'}`}>Plus <ChevronDown size={16} className="transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
          <div className="absolute right-0 z-40 mt-2 grid w-64 gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            {secondaires.map(([libelle, href]) => <a key={href} href={href} aria-current={path === href ? 'page' : undefined} className={classe(href)}>{libelle}</a>)}
          </div>
        </details>
        <details className="group relative lg:hidden">
          <summary className="flex cursor-pointer list-none items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-forge-text">Menu <ChevronDown size={16} className="transition-transform group-open:rotate-180" aria-hidden="true" /></summary>
          <div className="absolute right-0 z-40 mt-2 grid w-64 gap-1 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            {principaux.map(([libelle, href]) => <a key={href} href={href} aria-current={path === href ? 'page' : undefined} className={classe(href)}>{libelle}</a>)}
          </div>
        </details>
      </div>
    </nav>
  );
}
