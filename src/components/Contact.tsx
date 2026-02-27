import { useState, FormEvent } from 'react';
import { Send, Mail, Phone, MapPin, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

const SUBJECTS = [
  'Infrastructure IT & Cloud',
  'Cybersécurité & Monitoring',
  'Migration Office 365',
  'Virtualisation VMware',
  'Support & Infogérance',
  'Impression 3D & Prototypage',
  'Autre demande',
];

const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@forge3d.tech',
    href: 'mailto:contact@forge3d.tech',
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+216 25 504 839',
    href: 'tel:+21625504839',
  },
  {
    icon: MapPin,
    label: 'Localisation',
    value: 'Tunisie',
    href: null,
  },
];

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [form, setForm] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: SUBJECTS[0],
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Envoyer via le backend API (avec SMTP + PostgreSQL)
      const apiUrl = import.meta.env.VITE_API_URL || '/api';

      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: form.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Erreur lors de l\'envoi');
      }

      setStatus('success');
      setForm({ name: '', company: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-padding bg-dark-grid" aria-labelledby="contact-title">
      <div className="container-forge">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-tag text-forge-orange">
            <span className="w-6 h-px bg-forge-orange inline-block" />
            Contact
            <span className="w-6 h-px bg-forge-orange inline-block" />
          </p>
          <h2 id="contact-title" className="section-title text-white mb-4">
            Démarrons votre projet
            <span className="text-gradient block">ensemble</span>
          </h2>
          <p className="section-subtitle mx-auto text-center text-white/60">
            Partagez-nous votre projet et nous vous répondons sous 24h avec
            une proposition personnalisée et un devis gratuit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6 reveal">
            <div className="bg-forge-dark-800 rounded-2xl p-6 border border-white/5">
              <h3 className="text-white font-display font-bold text-xl mb-6">
                Informations de contact
              </h3>

              <div className="space-y-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-forge-orange/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} className="text-forge-orange" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-white/40 text-xs mb-0.5">{label}</div>
                      {href ? (
                        <a
                          href={href}
                          className="text-white/85 text-sm hover:text-forge-orange transition-colors duration-200"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-white/85 text-sm">{value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp & LinkedIn */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <p className="text-white/40 text-xs mb-3">Contactez-nous directement</p>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/21625504839"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-200 group mb-3"
                  aria-label="Contacter Forge3D sur WhatsApp"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#25D366] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </div>
                  <span className="text-sm font-medium">
                    WhatsApp : +216 25 504 839
                  </span>
                  <ExternalLink size={12} className="text-white/30" aria-hidden="true" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/forge3d-tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors duration-200 group"
                  aria-label="Suivre Forge3D sur LinkedIn"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#0A66C2] flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                  </div>
                  <span className="text-sm font-medium">
                    Forge3D sur LinkedIn
                  </span>
                  <ExternalLink size={12} className="text-white/30" aria-hidden="true" />
                </a>
              </div>

              {/* Shop link */}
              <div className="mt-4">
                <a
                  href="https://shop.forge3d.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/80 hover:text-forge-orange transition-colors duration-200 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-forge-orange/20 flex items-center justify-center group-hover:bg-forge-orange/30 transition-colors">
                    <svg className="w-4 h-4 text-forge-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  </div>
                  <span className="text-sm font-medium">Accéder à la boutique</span>
                  <ExternalLink size={12} className="text-white/30" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Response time */}
            <div className="bg-forge-orange/10 border border-forge-orange/20 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-forge-orange rounded-full animate-pulse" aria-hidden="true" />
                <span className="text-forge-orange text-sm font-semibold">Réponse rapide garantie</span>
              </div>
              <p className="text-white/60 text-xs leading-relaxed">
                Nous nous engageons à répondre à toutes les demandes sous
                <strong className="text-white/80"> 24 heures ouvrées</strong> avec un devis
                personnalisé et sans engagement.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3 reveal reveal-delay-2">
            <form
              onSubmit={handleSubmit}
              className="bg-forge-dark-800 rounded-2xl p-7 border border-white/5"
              noValidate
              aria-label="Formulaire de contact"
            >
              <h3 className="text-white font-display font-bold text-xl mb-6">
                Décrivez votre projet
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wide">
                    Nom complet <span className="text-forge-orange" aria-label="requis">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jean Dupont"
                    className="w-full bg-forge-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-forge-orange/60 transition-colors duration-200"
                  />
                </div>

                {/* Company */}
                <div>
                  <label htmlFor="company" className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wide">
                    Entreprise
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Mon Entreprise SAS"
                    className="w-full bg-forge-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-forge-orange/60 transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wide">
                    Email professionnel <span className="text-forge-orange" aria-label="requis">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="contact@entreprise.com"
                    className="w-full bg-forge-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-forge-orange/60 transition-colors duration-200"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wide">
                    Téléphone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+213 XX XX XX XX"
                    className="w-full bg-forge-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-forge-orange/60 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label htmlFor="subject" className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wide">
                  Sujet <span className="text-forge-orange" aria-label="requis">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-forge-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-forge-orange/60 transition-colors duration-200 appearance-none cursor-pointer"
                >
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s} className="bg-forge-dark-700">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="mb-6">
                <label htmlFor="message" className="block text-white/60 text-xs font-medium mb-2 uppercase tracking-wide">
                  Décrivez votre projet <span className="text-forge-orange" aria-label="requis">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet, les dimensions, les matériaux souhaités, les quantités et le délai estimé..."
                  className="w-full bg-forge-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/25 focus:outline-none focus:border-forge-orange/60 transition-colors duration-200 resize-none"
                />
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <div role="alert" className="flex items-center gap-3 bg-green-500/10 border border-green-500/25 rounded-xl px-4 py-3 mb-4">
                  <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" aria-hidden="true" />
                  <p className="text-green-300 text-sm">
                    Message envoyé ! Nous vous répondrons sous 24h.
                  </p>
                </div>
              )}
              {status === 'error' && (
                <div role="alert" className="flex items-center gap-3 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3 mb-4">
                  <AlertCircle size={18} className="text-red-400 flex-shrink-0" aria-hidden="true" />
                  <p className="text-red-300 text-sm">
                    Une erreur s'est produite. Veuillez nous écrire directement à{' '}
                    <a href="mailto:contact@forge3d.tech" className="underline hover:text-red-200">
                      contact@forge3d.tech
                    </a>
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full btn-primary justify-center py-4 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:transform-none"
                aria-busy={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" />
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    <Send size={18} aria-hidden="true" />
                    Envoyer ma demande
                  </>
                )}
              </button>

              <p className="text-white/30 text-xs text-center mt-4">
                En soumettant ce formulaire, vous acceptez d'être contacté par Forge3D. Aucun engagement.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
