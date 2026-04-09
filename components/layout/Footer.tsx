import Link from "next/link";
import { MapPin } from "lucide-react";

const footerLinks = {
  Support: [
    { label: "Help Center", href: "/help" },
    { label: "Safety information", href: "/safety" },
    { label: "Cancellation options", href: "/cancellation" },
    { label: "Report a concern", href: "/report" },
  ],
  Community: [
    { label: "StayLux.org", href: "/org" },
    { label: "Support refugees", href: "/refugees" },
    { label: "Fight discrimination", href: "/discrimination" },
  ],
  Hosting: [
    { label: "List your property", href: "/host/listings/new" },
    { label: "Host resources", href: "/host-resources" },
    { label: "Community forum", href: "/forum" },
    { label: "Hosting responsibly", href: "/responsible-hosting" },
  ],
  StayLux: [
    { label: "Newsroom", href: "/newsroom" },
    { label: "Learn about features", href: "/features" },
    { label: "Letter from our founders", href: "/founders" },
    { label: "Careers", href: "/careers" },
    { label: "Investors", href: "/investors" },
    { label: "Gift cards", href: "/gift-cards" },
  ],
};

// Inline SVGs for social icons (lucide-react v1 removed social icons)
const SocialIcons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
};

const socialLinks = [
  { Icon: SocialIcons.Instagram, href: "https://instagram.com", label: "Instagram" },
  { Icon: SocialIcons.X, href: "https://x.com", label: "X (Twitter)" },
  { Icon: SocialIcons.Facebook, href: "https://facebook.com", label: "Facebook" },
  { Icon: SocialIcons.Youtube, href: "https://youtube.com", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-20">
      <div className="container py-12">
        {/* Brand */}
        <div className="mb-10">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF385C] to-[#E61E4D] flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold tracking-tight">StayLux</span>
          </Link>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Discover extraordinary vacation rentals around the world. Premium
            stays, unforgettable experiences.
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-border">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                {section}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} StayLux, Inc.</span>
            <span>·</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <span>·</span>
            <Link href="/sitemap" className="hover:text-foreground transition-colors">Sitemap</Link>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              English (US)
            </span>
            <span>·</span>
            <span>$ USD</span>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-200"
                aria-label={social.label}
              >
                <social.Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
