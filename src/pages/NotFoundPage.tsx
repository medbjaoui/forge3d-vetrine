import Seo from '../components/Seo';

export default function NotFoundPage() {
  return <><Seo title="Page introuvable | FORGE3D" description="La page demandée n’existe pas." path="/404" /><section className="page-hero bg-dark-grid text-white"><div className="container-forge px-4 text-center sm:px-6 lg:px-8"><p className="section-tag">Erreur 404</p><h1 className="page-title mx-auto">Page introuvable</h1><p className="page-lead mx-auto">Cette adresse n’existe pas ou a été déplacée.</p><a className="btn-primary mt-8" href="/">Retour à l’accueil</a></div></section></>;
}
