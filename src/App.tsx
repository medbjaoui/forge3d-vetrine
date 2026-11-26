import { lazy, Suspense, useEffect } from 'react';
import type { ComponentType } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import VigiParcPage from './pages/VigiParcPage';
import VigiParcInfoPage from './pages/VigiParcInfoPage';
import VigiParcCalculatorPage from './pages/VigiParcCalculatorPage';
import VigiParcComparePage from './pages/VigiParcComparePage';
import VigiParcOffersPage from './pages/VigiParcOffersPage';
import VigiParcResourcesPage from './pages/VigiParcResourcesPage';
import VigiParcSolutionPage from './pages/VigiParcSolutionPage';
import NotFoundPage from './pages/NotFoundPage';
import { FORGEORIA_PATH, LEGACY_FORGEASSIST_PATH } from './lib/forgeoria';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const CompanyPage = lazy(() => import('./pages/CompanyPage'));
const ForgeOriaPage = lazy(() => import('./pages/ForgeOriaPage'));

const routes: Record<string, ComponentType> = {
  '/': HomePage,
  '/about': AboutPage,
  '/company': CompanyPage,
  [FORGEORIA_PATH]: ForgeOriaPage,
  '/vigiparc': VigiParcPage,
  '/vigiparc/fonctionnalites': () => <VigiParcInfoPage page="fonctionnalites" />,
  '/vigiparc/iso-27001': () => <VigiParcInfoPage page="iso-27001" />,
  '/vigiparc/bornes': () => <VigiParcInfoPage page="bornes" />,
  '/vigiparc/securite-confidentialite': () => <VigiParcInfoPage page="securite-confidentialite" />,
  '/vigiparc/offres': VigiParcOffersPage,
  '/vigiparc/technologie': () => <VigiParcInfoPage page="technologie" />,
  '/vigiparc/postes-windows': () => <VigiParcSolutionPage solution="postes-windows" />,
  '/vigiparc/sans-active-directory': () => <VigiParcSolutionPage solution="sans-active-directory" />,
  '/vigiparc/identites': () => <VigiParcSolutionPage solution="identites" />,
  '/vigiparc/politiques-securite': () => <VigiParcSolutionPage solution="politiques-securite" />,
  '/vigiparc/logiciels': () => <VigiParcSolutionPage solution="logiciels" />,
  '/vigiparc/cybersecurite': () => <VigiParcSolutionPage solution="cybersecurite" />,
  '/vigiparc/assistance': () => <VigiParcSolutionPage solution="assistance" />,
  '/vigiparc/multisite': () => <VigiParcSolutionPage solution="multisite" />,
  '/vigiparc/calculateur': VigiParcCalculatorPage,
  '/vigiparc/comparatif': VigiParcComparePage,
  '/vigiparc/ressources': VigiParcResourcesPage,
  '/vigiparc/a-propos': () => <VigiParcInfoPage page="a-propos" />,
  '/vigiparc/contact': () => <VigiParcInfoPage page="contact" />,
  '/vigiparc/mentions-legales': () => <VigiParcInfoPage page="mentions-legales" />,
  '/vigiparc/confidentialite': () => <VigiParcInfoPage page="confidentialite" />,
};

// Production answers /forgeassist with an nginx 301; this covers dev/preview servers.
const redirects: Record<string, string> = { [LEGACY_FORGEASSIST_PATH]: FORGEORIA_PATH };

type AppProps = { initialPath?: string };

export default function App({ initialPath }: AppProps = {}) {
  const browserPath = typeof window === 'undefined' ? '/' : window.location.pathname;
  const path = initialPath ?? (browserPath.replace(/\/$/, '') || '/');
  const redirectTo = redirects[path];
  const Page = routes[path] ?? NotFoundPage;

  useEffect(() => {
    if (redirectTo) window.location.replace(`${redirectTo}${window.location.search}${window.location.hash}`);
  }, [redirectTo]);

  useEffect(() => {
    if (redirectTo) return;
    const anchor = window.location.hash && document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
    if (anchor) anchor.scrollIntoView();
    else window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path, redirectTo]);

  if (redirectTo) {
    return <p className="p-8 text-center text-sm text-forge-text-muted">Redirecting to <a href={redirectTo} className="font-semibold text-forge-orange">ForgeOria</a>…</p>;
  }

  return (
    <div className="min-h-screen bg-white">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Header currentPath={path} />
      <main id="main-content" className={path.startsWith('/vigiparc') ? 'vigiparc-shell' : undefined}><Suspense fallback={null}><Page /></Suspense></main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
