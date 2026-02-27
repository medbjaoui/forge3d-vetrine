import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return visible ? (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Retour en haut"
      className="fixed bottom-6 right-6 z-50 bg-forge-orange hover:bg-forge-orange-dark text-white p-3 rounded-full shadow-forge-glow transition-all duration-200 hover:-translate-y-1 active:translate-y-0"
    >
      <ArrowUp size={20} />
    </button>
  ) : null;
}
