import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CompanyPage from './pages/CompanyPage';
import ForgeOriaPage from './pages/ForgeOriaPage';
import { FORGEORIA_PATH, LEGACY_FORGEASSIST_PATH } from './lib/forgeoria';

const routes: Record<string, () => JSX.Element> = {
  '/': HomePage,
  '/about': AboutPage,
  '/company': CompanyPage,
  [FORGEORIA_PATH]: ForgeOriaPage,
};

// Production answers /forgeassist with an nginx 301; this covers dev/preview servers.
const redirects: Record<string, string> = { [LEGACY_FORGEASSIST_PATH]: FORGEORIA_PATH };

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const redirectTo = redirects[path];
  const Page = routes[path] ?? HomePage;

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
      <Header />
      <main id="main-content"><Page /></main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
