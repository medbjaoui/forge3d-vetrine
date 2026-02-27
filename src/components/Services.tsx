import { Server, Shield, Cloud, Database, Package, Wrench, ArrowRight, Network, Lock, BarChart } from 'lucide-react';

const SERVICES = [
  {
    icon: Server,
    title: 'Administration Systèmes & Réseaux',
    description: 'Gestion complète de votre infrastructure IT : Windows Server, Active Directory, DNS, DHCP, virtualisation VMware ESXi & Docker.',
    color: 'from-blue-500/20 to-blue-600/5',
    features: ['Windows Server & AD', 'VMware & Docker', 'Gestion DNS/DHCP'],
    category: 'IT',
  },
  {
    icon: Shield,
    title: 'Cybersécurité & Protection',
    description: 'Sécurisation réseau, firewall Fortigate, VPN, architecture Zero Trust, protection DNS Cloudflare et audit de sécurité complet.',
    color: 'from-red-500/20 to-red-600/5',
    features: ['Firewall Fortigate', 'VPN & Zero Trust', 'Audit de sécurité'],
    category: 'IT',
  },
  {
    icon: BarChart,
    title: 'Monitoring & SIEM',
    description: 'Surveillance infrastructure 24/7 avec Wazuh et ELK Stack. Détection d\'intrusions, alertes en temps réel et tableaux de bord.',
    color: 'from-purple-500/20 to-purple-600/5',
    features: ['Wazuh SIEM', 'ELK Stack', 'Alertes temps réel'],
    category: 'IT',
  },
  {
    icon: Cloud,
    title: 'Cloud & Migration Office 365',
    description: 'Migration cloud, déploiement Office 365, sauvegarde Veeam, continuité d\'activité et optimisation infrastructure cloud.',
    color: 'from-cyan-500/20 to-cyan-600/5',
    features: ['Migration O365', 'Veeam Backup', 'Reprise d\'activité'],
    category: 'IT',
  },
  {
    icon: Network,
    title: 'Infogérance & Support',
    description: 'Support technique réactif, maintenance préventive, gestion proactive de votre parc informatique et assistance utilisateurs.',
    color: 'from-green-500/20 to-green-600/5',
    features: ['Support 24/7', 'Maintenance préventive', 'Gestion parc IT'],
    category: 'IT',
  },
  {
    icon: Database,
    title: 'Optimisation Infrastructure',
    description: 'Audit complet, optimisation performances, modernisation infrastructure, conseil stratégique et accompagnement transformation digitale.',
    color: 'from-indigo-500/20 to-indigo-600/5',
    features: ['Audit infrastructure', 'Optimisation perf', 'Conseil stratégique'],
    category: 'IT',
  },
  {
    icon: Package,
    title: 'E-commerce Impression 3D',
    description: 'Boutique en ligne d\'objets 3D : figurines personnalisées, prototypes techniques, objets déco. Production à la demande B2B/B2C.',
    color: 'from-orange-500/20 to-orange-600/5',
    features: ['Figurines custom', 'Prototypes rapides', 'Livraison internationale'],
    category: '3D',
  },
  {
    icon: Wrench,
    title: 'Fabrication 3D Sur Mesure',
    description: 'Modélisation CAO, impression 3D professionnelle (FDM/SLA), pièces techniques et décoratives, production petite/moyenne série.',
    color: 'from-yellow-500/20 to-yellow-600/5',
    features: ['Modélisation 3D', 'FDM & SLA', 'Pièces sur mesure'],
    category: '3D',
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-forge-gray" aria-labelledby="services-title">
      <div className="container-forge">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-tag">
            <span className="w-6 h-px bg-forge-orange inline-block" />
            Nos Services
            <span className="w-6 h-px bg-forge-orange inline-block" />
          </p>
          <h2 id="services-title" className="section-title text-forge-text mb-4">
            Double expertise pour
            <span className="text-gradient block">vos besoins technologiques</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Sous-traitance IT (infrastructure, cybersécurité, cloud) et fabrication 3D à la demande.
            Un partenaire unique pour votre transformation digitale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map(({ icon: Icon, title, description, color, features }, i) => (
            <article
              key={title}
              className={`reveal reveal-delay-${(i % 3) + 1} bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-forge-card-hover hover:-translate-y-1.5 transition-all duration-300 group cursor-default`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={22} className="text-forge-orange" aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-display font-bold text-forge-text mb-3">{title}</h3>

              {/* Description */}
              <p className="text-forge-text-muted text-sm leading-relaxed mb-5">{description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-forge-text-muted">
                    <span className="w-1.5 h-1.5 bg-forge-orange rounded-full flex-shrink-0" aria-hidden="true" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-forge-orange text-sm font-semibold hover:gap-2.5 transition-all duration-200 group/link"
                aria-label={`En savoir plus sur ${title}`}
              >
                En savoir plus
                <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14 reveal">
          <p className="text-forge-text-muted mb-6">
            Vous avez un projet spécifique ? Parlons-en ensemble.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-flex"
          >
            Demander une consultation gratuite
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
