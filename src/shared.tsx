// Shared design tokens, primitives, Header and Footer used by all pages.
import { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ─── Brand tokens ─────────────────────────────────────────────────────────────
export const C = {
  bg:        "oklch(0.18 0.01 250)",
  bgDeep:    "oklch(0.15 0.01 250)",
  bgSoft:    "oklch(0.22 0.01 250)",
  gold:      "oklch(0.78 0.14 75)",
  goldDeep:  "oklch(0.68 0.15 65)",
  cream:     "oklch(0.96 0.01 80)",
  dim:       "oklch(0.72 0.01 80 / 0.55)",
  dimS:      "oklch(0.85 0.01 80 / 0.75)",
  border:    "oklch(0.55 0.13 65 / 0.18)",
} as const;

// ─── Primitives ───────────────────────────────────────────────────────────────

export function Serif({ children, className, italic = false, style }: {
  children: React.ReactNode; className?: string; italic?: boolean; style?: React.CSSProperties;
}) {
  return (
    <span
      className={className}
      style={{ fontFamily: '"Instrument Serif", serif', fontStyle: italic ? "italic" : "normal", ...style }}
    >
      {children}
    </span>
  );
}

export function MonoLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn("block text-[11px] font-[500] tracking-[0.28em] uppercase", className)}
      style={{ color: C.gold }}
    >
      {children}
    </span>
  );
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[100]"
      style={{ scaleX, background: `linear-gradient(90deg, ${C.goldDeep}, ${C.gold}, ${C.goldDeep})` }}
    />
  );
}

// ─── Wordmark ─────────────────────────────────────────────────────────────────

export function Wordmark({ scale = 1, inverted = false }: { scale?: number; inverted?: boolean }) {
  const fg = inverted ? C.bg : C.cream;
  return (
    <div
      style={{
        display: "inline-flex", alignItems: "baseline",
        fontFamily: '"Space Grotesk", sans-serif',
        fontWeight: 300, fontSize: 22 * scale, letterSpacing: "-0.02em",
        color: fg, lineHeight: 1,
      }}
    >
      <span>fernando</span>
      <span
        className="dot-pulse"
        style={{
          display: "inline-block",
          width: 4 * scale, height: 4 * scale, borderRadius: "50%",
          background: C.gold, margin: `0 ${8 * scale}px ${2 * scale}px`,
        }}
      />
      <span style={{ fontWeight: 500 }}>oliveira</span>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Serviços",    href: "/#services" },
  { label: "Sobre",       href: "/#about" },
  { label: "Parceiros",   href: "/#partners" },
  { label: "Testemunhos", href: "/#testimonials" },
  { label: "Blog",        href: "/blog" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();

  useEffect(() => scrollY.on("change", (v) => setScrolled(v > 60)), [scrollY]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "oklch(0.16 0.01 250 / 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-14 flex items-center justify-between py-[22px]">
        <Link to="/"><Wordmark /></Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((l) => {
            const isCurrent = l.href === "/blog"
              ? location.pathname === "/blog"
              : location.pathname === "/";
            return (
              <Link
                key={l.href}
                to={l.href}
                className="relative text-[13px] font-[500] transition-colors duration-200 group"
                style={{ color: isCurrent && l.href === "/blog" ? C.gold : C.dimS }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
                onMouseLeave={(e) => (e.currentTarget.style.color = isCurrent && l.href === "/blog" ? C.gold : C.dimS)}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 right-0 h-px origin-left transition-transform duration-300",
                    isCurrent && l.href === "/blog" ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )}
                  style={{ background: C.gold }}
                />
              </Link>
            );
          })}
        </nav>

        <Link
          to="/#contact"
          className="hidden lg:inline-flex items-center gap-2 px-6 py-[11px] rounded-full text-[13px] font-[600] text-white transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})`,
            boxShadow: "0 6px 22px oklch(0.4 0.1 65 / 0.35)",
          }}
        >
          Contactar
        </Link>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden flex flex-col gap-[5px] p-2" aria-label="Menu">
          <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} className="block w-[22px] h-[1.5px]" style={{ background: C.cream }} />
          <motion.span animate={{ opacity: open ? 0 : 1 }} className="block w-[22px] h-[1.5px]" style={{ background: C.cream }} />
          <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} className="block w-[22px] h-[1.5px]" style={{ background: C.cream }} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden px-14 pb-6"
            style={{ borderTop: `1px solid ${C.border}` }}
          >
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-[15px] font-[500] transition-colors"
                style={{ color: C.dimS, borderBottom: `1px solid ${C.border}` }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/#contact"
              onClick={() => setOpen(false)}
              className="mt-5 inline-block px-6 py-3 rounded-full text-[13px] font-[600] text-white"
              style={{ background: `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})` }}
            >
              Contactar →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export function Footer({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  if (compact) {
    return (
      <footer ref={ref} className="py-[60px]" style={{ background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-[1280px] mx-auto px-14">
          <div className="flex flex-wrap justify-between items-center gap-6 pb-8" style={{ borderBottom: `1px solid ${C.border}` }}>
            <Link to="/"><Wordmark /></Link>
            <div className="flex flex-wrap gap-7">
              {[["Serviços","/#services"],["Sobre","/#about"],["Blog","/blog"],["Contacto","/#contact"]].map(([l,h]) => (
                <Link key={l} to={h} className="text-[13px] transition-colors" style={{ color: C.dimS }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.gold)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.dimS)}>
                  {l}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-7 flex flex-wrap justify-between gap-3 text-[11px] tracking-[0.04em]" style={{ color: C.dim }}>
            <div>© 2026 Fernando Oliveira · KCasa (Factores Irreverentes Lda.)</div>
            <div>Intermediário de Crédito · BdP nº 4922</div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer ref={ref} className="relative overflow-hidden pt-[90px] pb-10" style={{ background: C.bgDeep, borderTop: `1px solid ${C.border}` }}>
      <motion.div
        initial={{ y: "15%", scale: 0.8, opacity: 0 }}
        animate={inView ? { y: 0, scale: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.2, 0.7, 0.3, 1] }}
        className="absolute -bottom-[8vw] left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap"
        style={{
          fontFamily: '"Space Grotesk", sans-serif', fontWeight: 300,
          fontSize: "22vw", lineHeight: 0.85, letterSpacing: "-0.05em",
          color: "transparent", WebkitTextStroke: "1px oklch(0.55 0.13 65 / 0.12)",
        }}
      >
        fernando
        <span style={{ display: "inline-block", width: "2vw", height: "2vw", borderRadius: "50%", background: "oklch(0.55 0.13 65 / 0.18)", margin: "0 1vw 1vw", verticalAlign: "middle" }} />
        oliveira
      </motion.div>
      <div className="max-w-[1280px] mx-auto px-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-14 pb-14" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div>
            <Link to="/"><Wordmark /></Link>
            <p className="mt-5 text-[13px] leading-[1.65] max-w-[28ch]" style={{ color: C.dimS }}>
              Consultoria imobiliária e financeira no Porto. 8 anos a acompanhar famílias e investidores do início ao fim.
            </p>
          </div>
          {[
            { h: "Serviços", links: [["Crédito habitação","/#services"],["Mediação","/#services"],["Seguros","/#services"],["Investimento","/#services"]] },
            { h: "Sobre",    links: [["Sobre mim","/#about"],["Testemunhos","/#testimonials"],["Parceiros","/#partners"],["Processo","/#process"]] },
            { h: "Contacto", links: [["(+351) 932 773 324","tel:+351932773324"],["foliveira.kcasa@gmail.com","mailto:foliveira.kcasa@gmail.com"],["Baguim do Monte, Porto","/#contact"]] },
          ].map((col) => (
            <div key={col.h}>
              <h4 className="text-[10px] tracking-[0.28em] uppercase font-[600] mb-[18px]" style={{ color: C.gold }}>{col.h}</h4>
              {col.links.map(([label, href]) => (
                <Link key={label} to={href}
                  className="block text-[13px] mb-[10px] transition-colors"
                  style={{ color: C.dimS }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = C.cream)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = C.dimS)}
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-9 flex flex-col md:flex-row justify-between gap-3 text-[11px] tracking-[0.04em]" style={{ color: C.dim }}>
          <div>© 2026 Fernando Oliveira · KCasa (Factores Irreverentes Lda.)</div>
          <div>Intermediário de Crédito · BdP nº 4922</div>
        </div>
      </div>
    </footer>
  );
}
