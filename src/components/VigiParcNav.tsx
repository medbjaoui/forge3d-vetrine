const liens = [
  ['Fonctionnalités', '/vigiparc/fonctionnalites'],
  ['ISO 27001', '/vigiparc/iso-27001'],
  ['Bornes', '/vigiparc/bornes'],
  ['Sécurité', '/vigiparc/securite-confidentialite'],
  ['Offres', '/vigiparc/offres'],
  ['Technologie', '/vigiparc/technologie'],
  ['Contact', '/vigiparc/contact'],
];

export default function VigiParcNav() {
  return (
    <nav className="border-b border-slate-200 bg-white" aria-label="Navigation VigiParc">
      <div className="container-forge flex gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
        {liens.map(([libelle, href]) => <a key={href} href={href} className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold text-forge-text-muted hover:bg-orange-50 hover:text-forge-orange">{libelle}</a>)}
      </div>
    </nav>
  );
}
