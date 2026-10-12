import { useEffect } from 'react';

type SeoProps = { title: string; description: string; path: string; type?: 'website' | 'software' };

const setMeta = (selector: string, attribute: 'name' | 'property', value: string, content: string) => {
  let node = document.head.querySelector<HTMLMetaElement>(selector);
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attribute, value);
    document.head.appendChild(node);
  }
  node.content = content;
};

export default function Seo({ title, description, path, type = 'website' }: SeoProps) {
  useEffect(() => {
    const canonicalUrl = `https://forge3d.tech${path}`;
    document.title = title;
    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);
    setMeta('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
    setMeta('meta[property="og:type"]', 'property', 'og:type', type === 'software' ? 'product' : 'website');
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical); }
    canonical.href = canonicalUrl;
  }, [title, description, path, type]);
  return null;
}
