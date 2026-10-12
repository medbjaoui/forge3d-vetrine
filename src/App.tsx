import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CompanyPage from './pages/CompanyPage';
import ForgeAssistPage from './pages/ForgeAssistPage';

const routes: Record<string, () => JSX.Element> = {
  '/': HomePage,
  '/about': AboutPage,
  '/company': CompanyPage,
  '/forgeassist': ForgeAssistPage,
};

export default function App() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  const Page = routes[path] ?? HomePage;

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('visible')),
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [path]);

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
