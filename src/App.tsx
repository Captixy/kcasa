import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, ChevronRight, X,
  Home, Key, Shield, ArrowLeftRight, Ruler, TrendingUp,
  Building, Search, Handshake, BarChart3, Calculator,
  ClipboardCheck, FileText, CreditCard, PiggyBank,
  Wallet, Building2, MapPin, Phone, Mail, CheckCircle,
  Star, Award, Users, Briefcase, Globe, Heart,
  ThumbsUp, Sparkles, Zap, Landmark, Scale, Percent,
  BadgePercent, ClipboardList,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { C, Serif, MonoLabel, ScrollProgress, Header, Footer } from "./shared";
import { store } from "./data/store";
import type { Testimonial, Service, Property, Partner } from "./data/types";

const ICON_MAP: Record<string, LucideIcon> = {
  Home, Key, Shield, ArrowLeftRight, Ruler, TrendingUp,
  Building, Search, Handshake, BarChart3, Calculator,
  ClipboardCheck, FileText, CreditCard, PiggyBank,
  Wallet, Building2, MapPin, Phone, Mail, CheckCircle,
  Star, Award, Users, Briefcase, Globe, Heart,
  ThumbsUp, Sparkles, Zap, Landmark, Scale, Percent,
  BadgePercent, ClipboardList,
};

// ─── Section head ─────────────────────────────────────────────────────────────

function SectionHead({ label, heading, sub, className }: {
  label: string; heading: React.ReactNode; sub?: string; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.2, 0.7, 0.3, 1] }}
      className={cn("text-center max-w-2xl mx-auto mb-20", className)}
    >
      <MonoLabel className="mb-4">{label}</MonoLabel>
      <h2
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontSize: "clamp(48px, 6vw, 80px)",
          lineHeight: 1, letterSpacing: "-0.02em", color: C.cream,
        }}
      >
        {heading}
      </h2>
      {sub && (
        <p className="mt-5 text-[17px] leading-[1.55]" style={{ color: C.dimS }}>{sub}</p>
      )}
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HERO_IMGS = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=85&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=85&w=2400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=85&w=2400&auto=format&fit=crop",
];

function HeroSection() {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setImgIdx((i) => (i + 1) % HERO_IMGS.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: C.bg }}>
      <div className="absolute inset-0">
        {HERO_IMGS.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            animate={{ opacity: i === imgIdx ? 1 : 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <img src={src} alt="" className="w-full h-full object-cover ken-burns" />
          </motion.div>
        ))}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, color-mix(in oklch, ${C.bgDeep} 70%, transparent) 0%, color-mix(in oklch, ${C.bgDeep} 50%, transparent) 50%, ${C.bg} 100%), radial-gradient(ellipse at top, color-mix(in oklch, ${C.gold} 25%, transparent), transparent 60%)`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-14 pt-[140px] pb-[120px] w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
          className="inline-flex items-center gap-[10px] px-4 py-2 rounded-full mb-8"
          style={{
            background: "oklch(0.45 0.1 65 / 0.18)",
            border: `1px solid oklch(0.6 0.13 65 / 0.35)`,
            backdropFilter: "blur(8px)",
          }}
        >
          <span className="live-pulse w-[7px] h-[7px] rounded-full" style={{ background: C.gold }} />
          <span className="text-[12px] font-[500]" style={{ color: C.dimS }}>8 anos · +850 clientes · Porto</span>
        </motion.div>

        <h1
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(64px, 9vw, 120px)",
            lineHeight: 0.92, letterSpacing: "-0.025em",
            color: C.cream, maxWidth: "14ch",
          }}
        >
          {["A próxima casa", <>começa com a <em style={{ fontStyle: "italic", color: C.gold }}>pessoa</em></>, "certa ao seu lado."].map((line, i) => (
            <motion.span
              key={i}
              className="block overflow-hidden pb-[0.05em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.25 + i * 0.15, ease: [0.2, 0.7, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
          className="mt-8 text-[18px] leading-[1.55] max-w-[52ch]"
          style={{ color: C.dimS }}
        >
          Consultoria imobiliária e financeira no Porto. Crédito habitação, seguros e mediação — uma única conversa, do primeiro contacto à entrega das chaves.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
          className="mt-11 flex gap-3 flex-wrap"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-[600] text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})`,
              boxShadow: "0 6px 22px oklch(0.4 0.1 65 / 0.35)",
            }}
          >
            Marcar conversa →
          </a>
          <a
            href="#partners"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-[500] transition-all duration-200 hover:bg-white/10"
            style={{
              background: "oklch(1 0 0 / 0.06)",
              border: "1px solid oklch(1 0 0 / 0.14)",
              color: C.cream,
              backdropFilter: "blur(8px)",
            }}
          >
            Ver parceiros
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
          className="mt-20 flex gap-[10px] flex-wrap"
        >
          {["Reg. BdP nº 4922", "+200 imóveis angariados", "Resposta em 24h"].map((chip) => (
            <div
              key={chip}
              className="inline-flex items-center gap-2 px-[14px] py-2 rounded-full text-[12px]"
              style={{
                background: "oklch(1 0 0 / 0.05)",
                border: "1px solid oklch(1 0 0 / 0.1)",
                color: C.dimS,
                backdropFilter: "blur(6px)",
              }}
            >
              <span className="w-[5px] h-[5px] rounded-full flex-none" style={{ background: C.gold }} />
              {chip}
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase"
        style={{ color: "oklch(0.85 0.01 80 / 0.4)" }}
      >
        <span>Scroll</span>
        <div className="scroll-bar w-px h-10" style={{ background: `linear-gradient(to bottom, transparent, ${C.gold})` }} />
      </motion.div>
    </section>
  );
}

// ─── Stats ────────────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return { count, ref };
}

function Stat({ target, suffix = "", label, desc, delay = 0 }: {
  target: number; suffix?: string; label: string; desc: string; delay?: number;
}) {
  const { count, ref } = useCountUp(target);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8, ease: [0.2, 0.7, 0.3, 1] }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <div
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontSize: 88, lineHeight: 1, letterSpacing: "-0.03em",
          background: `linear-gradient(180deg, ${C.cream} 0%, ${C.gold} 120%)`,
          WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {count}{suffix}
      </div>
      <div className="mt-2 text-[11px] tracking-[0.24em] uppercase font-[500]" style={{ color: C.dim }}>{label}</div>
      <p className="mt-3 text-[13px] leading-[1.5] max-w-[26ch]" style={{ color: C.dimS }}>{desc}</p>
    </motion.div>
  );
}

function StatsSection() {
  return (
    <section
      className="py-[100px] relative"
      style={{ background: C.bgDeep, borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}` }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, oklch(0.55 0.13 65 / 0.08), transparent 60%)" }} />
      <div className="max-w-[1280px] mx-auto px-14 grid grid-cols-2 md:grid-cols-4 gap-12 relative">
        <Stat target={1000} suffix="+" label="Clientes" desc="Famílias e investidores acompanhados desde 2017." delay={0} />
        <Stat target={350} suffix="+" label="Imóveis"  desc="Mediação e angariação em todo o Grande Porto." delay={0.08} />
        <Stat target={12}  label="Anos"     desc="Experiência consolidada no setor imobiliário e financeiro." delay={0.16} />
        <Stat target={100} suffix="+" label="Prémios"  desc="Prémios de indústria — reconhecimento e excelência." delay={0.24} />
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

function ServicesSection() {
  const [services] = useState<Service[]>(store.getServices);
  const [selected, setSelected] = useState<Service | null>(null);

  if (services.length === 0) return null;

  return (
    <section id="services" className="py-[140px]" style={{ background: C.bgSoft }}>
      <div className="max-w-[1280px] mx-auto px-14">
        <SectionHead
          label="O que faço"
          heading={<>Soluções integradas, <Serif italic style={{ color: C.gold }}>uma única pessoa</Serif>.</>}
          sub="Crédito, seguros e mediação imobiliária — tudo coordenado do mesmo lado da mesa, sem reencaminhamentos."
        />

        <div
          className="flex flex-wrap justify-center overflow-hidden rounded-xl"
          style={{ border: `1px solid ${C.border}` }}
        >
          {services.map((s, i) => {
            const Icon = ICON_MAP[s.iconName] ?? Home;

            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
                viewport={{ once: true, margin: "-40px" }}
                className="relative group cursor-pointer transition-colors duration-400 w-full md:w-1/3"
                style={{ background: C.bgSoft, padding: "44px 36px" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.cardHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = C.bgSoft)}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.55 0.13 65 / 0.12), transparent 60%)" }}
                />
                {s.tag && (
                  <span
                    className="absolute top-[18px] right-[18px] text-[10px] tracking-[0.2em] uppercase font-[600] px-[9px] py-1 rounded-full"
                    style={{ color: C.gold, background: "oklch(0.55 0.13 65 / 0.18)" }}
                  >
                    {s.tag}
                  </span>
                )}
                <div
                  className="relative z-10 w-[52px] h-[52px] rounded-xl flex items-center justify-center mb-7 transition-all duration-500 group-hover:scale-105"
                  style={{ background: "oklch(0.55 0.13 65 / 0.12)", border: "1px solid oklch(0.6 0.13 65 / 0.25)" }}
                >
                  <Icon className="w-[22px] h-[22px]" style={{ color: C.gold }} />
                </div>
                <h3 className="relative z-10 text-[19px] font-[500] mb-3" style={{ color: C.cream, letterSpacing: "-0.01em" }}>
                  {s.title}
                </h3>
                <p className="relative z-10 text-[14px] leading-[1.6]" style={{ color: C.dimS }}>{s.desc}</p>
                <button
                  onClick={() => setSelected(s)}
                  className="relative z-10 inline-flex items-center gap-[6px] mt-6 text-[12px] font-[500] transition-all duration-200 group-hover:gap-[10px]"
                  style={{ color: C.gold, background: "none", border: 0, cursor: "pointer", padding: 0, fontFamily: "inherit" }}
                >
                  Saber mais →
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ position: "fixed", inset: 0, background: "oklch(0.1 0.01 250 / 0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(6px)", padding: 20 }}
            onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
              style={{ width: 560, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", background: C.bgDeep, borderRadius: 20, border: `1px solid ${C.border}`, padding: "40px 36px 36px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", background: "oklch(0.55 0.13 65 / 0.12)", border: "1px solid oklch(0.6 0.13 65 / 0.25)" }}>
                    {(() => { const Icon = ICON_MAP[selected.iconName] ?? Home; return <Icon size={20} style={{ color: C.gold }} />; })()}
                  </div>
                  <div>
                    <h2 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 26, color: C.cream, margin: 0, letterSpacing: "-0.01em" }}>{selected.title}</h2>
                    {selected.tag && (
                      <span style={{ display: "inline-block", marginTop: 4, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: C.gold, background: "oklch(0.55 0.13 65 / 0.18)", padding: "2px 8px", borderRadius: 999 }}>
                        {selected.tag}
                      </span>
                    )}
                  </div>
                </div>
                <button onClick={() => setSelected(null)} style={{ background: "none", border: 0, cursor: "pointer", color: C.dim, padding: 4 }}>
                  <X size={20} />
                </button>
              </div>

              <p style={{ color: C.dimS, fontSize: 15, lineHeight: 1.7, margin: "0 0 20px" }}>{selected.desc}</p>

              {selected.details && (
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: C.gold, marginBottom: 10, fontWeight: 500 }}>Mais informações</div>
                  <div style={{ color: C.dimS, fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{selected.details}</div>
                </div>
              )}

              {selected.link && (
                <a
                  href={selected.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-[600] text-white transition-all duration-200 hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})`, boxShadow: "0 6px 22px oklch(0.4 0.1 65 / 0.35)", textDecoration: "none" }}
                >
                  Saber mais →
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="about" className="py-[140px]" style={{ background: C.bgDeep }}>
      <div className="max-w-[1280px] mx-auto px-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
            className="relative aspect-[4/5] rounded-2xl overflow-hidden group"
            style={{ background: `linear-gradient(135deg, oklch(0.3 0.04 250), oklch(0.25 0.06 65))` }}
          >
            <img
              src="/perfil.png"
              alt="Fernando Oliveira"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 to-transparent flex justify-between items-end">
              <div>
                <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 26, color: C.cream, lineHeight: 1 }}>
                  Fernando Oliveira
                </div>
                <div className="text-[10px] tracking-[0.24em] uppercase mt-1" style={{ color: C.gold }}>
                  Consultor Imobiliário
                </div>
              </div>
              <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 56, lineHeight: 0.9, color: C.gold, fontStyle: "italic" }}>
                '17
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.7, 0.3, 1] }}
          >
            <MonoLabel className="mb-6">Sobre mim</MonoLabel>
            <h2 style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(40px, 5vw, 60px)", lineHeight: 1, color: C.cream, marginBottom: 28, letterSpacing: "-0.02em" }}>
              Há oito anos a tratar de <Serif italic style={{ color: C.gold }}>casa</Serif> como quem trata de casa.
            </h2>
            <p className="text-[16px] leading-[1.65] mb-5" style={{ color: C.dimS, maxWidth: "52ch" }}>
              Comecei em 2017, em Baguim do Monte, com uma ideia simples: cada cliente merece o tempo de uma conversa antes da pressão de uma proposta. Hoje, são mais de 850 famílias e investidores acompanhados.
            </p>
            <p className="text-[16px] leading-[1.65]" style={{ color: C.dimS, maxWidth: "52ch" }}>
              Trabalho com a KCasa (Factores Irreverentes Lda.) e estou registado no Banco de Portugal como intermediário de crédito. Isso significa rigor e transparência em cada etapa — do primeiro telefonema à escritura.
            </p>

            <div className="mt-9 pt-7 grid grid-cols-2 gap-4" style={{ borderTop: `1px solid ${C.border}` }}>
              {[
                { t: "Registo BdP nº 4922",    s: "Intermediário de Crédito" },
                { t: "8+ anos de experiência", s: "Mediação · Crédito · Seguros" },
                { t: "Porto · Norte",          s: "Cobertura nacional sob pedido" },
                { t: "Resposta em 24h",        s: "Compromisso, não promessa" },
              ].map((c) => (
                <div key={c.t} className="flex gap-3 items-start">
                  <div className="w-[6px] h-[6px] rounded-full mt-[7px] flex-none" style={{ background: C.gold }} />
                  <div>
                    <div className="text-[14px] font-[500]" style={{ color: C.cream }}>{c.t}</div>
                    <div className="text-[12px] mt-[3px]" style={{ color: C.dim }}>{c.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Properties Marquee ──────────────────────────────────────────────────────

function PropertyCard({ property, onClick }: { property: Property; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl flex-shrink-0 group cursor-pointer"
      style={{ width: 380, height: 460 }}
    >
      <img
        src={property.img}
        alt={property.title}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, transparent 30%, oklch(0.12 0.01 250 / 0.88) 80%, oklch(0.15 0.01 250) 100%)",
        }}
      />
      <div className="absolute top-4 right-4">
        <span
          className="px-[10px] py-[5px] rounded-full text-[10px] tracking-[0.2em] uppercase font-[600]"
          style={{ color: C.gold, background: "oklch(0.15 0.01 250 / 0.7)", backdropFilter: "blur(8px)", border: "1px solid oklch(0.55 0.13 65 / 0.25)" }}
        >
          {property.type}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="text-[10px] tracking-[0.2em] uppercase font-[500] mb-2" style={{ color: C.gold }}>
          {property.area}
        </div>
        <h3 className="text-[20px] font-[500] mb-[6px]" style={{ color: C.cream, letterSpacing: "-0.01em" }}>
          {property.title}
        </h3>
        <p className="text-[13px]" style={{ color: C.dimS }}>{property.location}</p>
        <div
          className="mt-[10px] text-[24px] leading-none"
          style={{ fontFamily: '"Instrument Serif", serif', color: C.gold, fontStyle: "italic" }}
        >
          {property.price}
        </div>
      </div>
    </div>
  );
}

function PropertyDetailModal({ property, onClose }: { property: Property; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{ position: "fixed", inset: 0, background: "oklch(0.1 0.01 250 / 0.75)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(8px)", padding: 20 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
        style={{ width: 640, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", background: C.bgDeep, borderRadius: 20, border: `1px solid ${C.border}` }}
      >
        <div style={{ position: "relative", width: "100%", aspectRatio: "16/10" }}>
          <img src={property.img} alt={property.title} className="w-full h-full object-cover" />
          <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 36, height: 36, borderRadius: "50%", background: "oklch(0.15 0.01 250 / 0.7)", backdropFilter: "blur(8px)", border: "1px solid oklch(0.55 0.13 65 / 0.25)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: C.cream }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: "28px 32px 32px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.gold, fontWeight: 500 }}>{property.type}</span>
            <span style={{ color: C.dim, fontSize: 10, letterSpacing: "0.1em" }}>·</span>
            <span style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: C.dim }}>{property.area}</span>
          </div>
          <h2 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 32, color: C.cream, margin: "0 0 8px", letterSpacing: "-0.01em" }}>{property.title}</h2>
          <p style={{ color: C.dimS, fontSize: 14, margin: "0 0 6px" }}>{property.location}</p>
          <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 28, color: C.gold, fontStyle: "italic", marginBottom: 20 }}>{property.price}</div>

          {property.link && (
            <a
              href={property.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-[600] text-white transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})`, boxShadow: "0 6px 22px oklch(0.4 0.1 65 / 0.35)", textDecoration: "none" }}
            >
              Saber mais →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function PropertiesSection() {
  const [properties] = useState<Property[]>(store.getProperties);
  const [selected, setSelected] = useState<Property | null>(null);

  if (properties.length === 0) return null;

  const tripled = [...properties, ...properties, ...properties];

  return (
    <section id="properties" className="py-[140px]" style={{ background: C.bgDeep }}>
      <div className="max-w-[1280px] mx-auto px-14">
        <SectionHead
          label="Imóveis"
          heading={<>Propriedades em <Serif italic style={{ color: C.gold }}>destaque</Serif>.</>}
          sub="Uma seleção dos imóveis disponíveis neste momento. Novas oportunidades todas as semanas."
        />
      </div>

      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 4%, black 96%, transparent)",
          padding: "20px 0",
        }}
      >
        <div className="marquee-track flex gap-6" style={{ width: "max-content" }}>
          {tripled.map((p, i) => (
            <PropertyCard key={i} property={p} onClick={() => setSelected(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <PropertyDetailModal property={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Partners ─────────────────────────────────────────────────────────────────

function PartnersSection() {
  const [partners] = useState<Partner[]>(store.getPartners);

  if (partners.length === 0) return null;

  const items = [...partners, ...partners, ...partners];

  return (
    <section id="partners" className="pt-[140px] pb-[60px]" style={{ background: C.bgSoft }}>
      <div className="max-w-[1280px] mx-auto px-14">
        <SectionHead
          label="Nossos parceiros"
          heading={<>As marcas que <Serif italic style={{ color: C.gold }}>trabalham comigo</Serif>.</>}
          sub="Bancos, seguradoras e operadores que tornam possível oferecer-lhe sempre a melhor solução do mercado."
        />
      </div>

      <div
        className="overflow-hidden"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          padding: "40px 0",
        }}
      >
        <div className="marquee-track flex gap-16 items-center" style={{ width: "max-content" }}>
          {items.map((p, i) => (
            <div
              key={i}
              style={{ width: 220, height: 96, flexShrink: 0, cursor: "pointer", opacity: 0.5, transition: "opacity 350ms" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.opacity = "1";
                const img = el.firstElementChild as HTMLImageElement;
                img.classList.add("hovered");
                img.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.opacity = "0.5";
                const img = el.firstElementChild as HTMLImageElement;
                img.classList.remove("hovered");
                img.style.transform = "scale(1)";
              }}
            >
              <img
                src={p.img}
                alt={p.name}
                loading="lazy"
                className="partner-logo"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  objectPosition: "center",
                  transform: "scale(1)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

const STEPS = [
  { n: "01", title: "Conversa inicial",  desc: "Entendo o objetivo, a urgência e o orçamento. Sem compromisso." },
  { n: "02", title: "Plano à medida",    desc: "Apresento opções de crédito, seguros e/ou imóveis com números reais." },
  { n: "03", title: "Negociação",        desc: "Trato dos bancos, das seguradoras e das contrapartes. Você decide." },
  { n: "04", title: "Escritura & após",  desc: "Acompanho até à entrega das chaves e faço acompanhamento pós-venda." },
];

function ProcessSection() {
  return (
    <section id="process" className="py-[140px]" style={{ background: C.bgSoft }}>
      <div className="max-w-[1280px] mx-auto px-14">
        <SectionHead
          label="Como trabalho"
          heading={<>Quatro passos. <Serif italic style={{ color: C.gold }}>Sem mistério.</Serif></>}
          sub="Do primeiro contacto à chave na mão — um processo claro, com prazos reais."
        />

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-0">
          <div
            className="absolute top-[30px] hidden md:block"
            style={{ left: "8%", right: "8%", height: 1, background: `linear-gradient(90deg, transparent, ${C.gold} 20%, ${C.gold} 80%, transparent)`, opacity: 0.5 }}
          />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              className="px-5 relative"
            >
              <div
                className="w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-7 relative"
                style={{
                  background: C.bgSoft,
                  border: `1px solid ${C.gold}`,
                  boxShadow: `0 0 0 6px ${C.bgSoft}`,
                  fontFamily: '"Instrument Serif", serif',
                  fontSize: 24, color: C.gold, fontStyle: "italic",
                }}
              >
                {s.n}
              </div>
              <h3 className="text-center text-[17px] font-[500] mb-2" style={{ color: C.cream }}>{s.title}</h3>
              <p className="text-center text-[13px] leading-[1.55] max-w-[26ch] mx-auto" style={{ color: C.dimS }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function TestimonialsSection() {
  const [testimonials] = useState<Testimonial[]>(store.getTestimonials);
  const [active, setActive] = useState(0);
  const go = useCallback((i: number) => setActive((i + testimonials.length) % testimonials.length), [testimonials.length]);

  useEffect(() => {
    const t = setInterval(() => go(active + 1), 7000);
    return () => clearInterval(t);
  }, [active, go]);

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-[140px]" style={{ background: C.bgDeep }}>
      <div className="max-w-[1280px] mx-auto px-14">
        <SectionHead label="Testemunhos" heading={<>O que dizem <Serif italic style={{ color: C.gold }}>os clientes</Serif>.</>} />

        <div className="max-w-[900px] mx-auto">
          <div
            className="relative px-16 py-14 rounded-2xl min-h-[320px]"
            style={{
              border: `1px solid ${C.border}`,
              background: `linear-gradient(180deg, ${C.bgSoft}, ${C.bgDeep})`,
            }}
          >
            <div
              className="absolute -top-8 left-10 leading-none pointer-events-none select-none opacity-70"
              style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", fontSize: 140, color: C.gold, lineHeight: 1 }}
            >
              "
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
              >
                <blockquote
                  className="text-[28px] leading-[1.35] mb-8"
                  style={{ fontFamily: '"Instrument Serif", serif', fontStyle: "italic", color: C.cream, letterSpacing: "-0.005em" }}
                >
                  {testimonials[active].quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div
                    className="w-[52px] h-[52px] rounded-full flex-none bg-cover bg-center"
                    style={{ backgroundImage: `url('${testimonials[active].avatar}')`, border: `1px solid ${C.border}` }}
                  />
                  <div>
                    <div className="text-[15px] font-[500]" style={{ color: C.cream }}>{testimonials[active].name}</div>
                    <div className="text-[12px] mt-[3px] tracking-[0.1em] uppercase" style={{ color: C.gold }}>{testimonials[active].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center mt-9">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{ width: i === active ? 28 : 8, background: i === active ? C.gold : "oklch(0.35 0.01 250)", border: 0, padding: 0 }}
                  aria-label={`Testemunho ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-[10px]">
              {([["prev", -1], ["next", 1]] as const).map(([id, dir]) => (
                <button
                  key={id}
                  onClick={() => go(active + dir)}
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ background: C.bgSoft, border: `1px solid ${C.border}`, color: C.cream }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.gold; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = C.border; }}
                  aria-label={id === "prev" ? "Anterior" : "Seguinte"}
                >
                  {dir === -1 ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value ?? "",
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value ?? "",
      email: (form.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
      subject: (form.elements.namedItem("subject") as HTMLSelectElement)?.value ?? "",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "",
    };

    try {
      const res = await fetch("http://localhost:3001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Erro ao enviar. Tente novamente ou ligue diretamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-[140px]" style={{ background: C.bg }}>
      <div className="max-w-[1280px] mx-auto px-14">
        <SectionHead
          label="Falar comigo"
          heading={<>Vamos <Serif italic style={{ color: C.gold }}>conversar</Serif>?</>}
          sub="Sem compromisso. Resposta em 24 horas, em dias úteis."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.3, 1] }}
            viewport={{ once: true }}
          >
            {[
              { l: "Telefone",  v: <a href="tel:+351932773324" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 18, color: C.cream }}>(+351) 932 773 324</a> },
              { l: "Email",     v: <a href="mailto:foliveira.kcasa@gmail.com" style={{ fontFamily: '"Instrument Serif", serif', fontSize: 18, color: C.cream }}>foliveira.kcasa@gmail.com</a> },
              { l: "Escritório",v: <p style={{ fontFamily: '"Instrument Serif", serif', fontSize: 18, color: C.cream, lineHeight: 1.4 }}>Rua Dom António Castro Meireles 1217<br/>4435-666 Baguim do Monte, Porto</p> },
            ].map((f) => (
              <div key={f.l} className="mb-7">
                <div className="text-[10px] tracking-[0.28em] uppercase font-[500] mb-2" style={{ color: C.gold }}>{f.l}</div>
                {f.v}
              </div>
            ))}

            <div
              className="mt-9 p-[22px] rounded-xl flex items-center gap-[14px]"
              style={{ background: "oklch(0.55 0.13 65 / 0.08)", border: "1px solid oklch(0.6 0.13 65 / 0.2)" }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-none"
                style={{ background: "oklch(0.55 0.13 65 / 0.18)", border: `1px solid ${C.gold}`, fontFamily: '"Instrument Serif", serif', fontStyle: "italic", color: C.gold, fontSize: 16 }}
              >
                ✓
              </div>
              <div>
                <div className="text-[13px] font-[500]" style={{ color: C.cream }}>Intermediário de Crédito</div>
                <div className="text-[11px] mt-[2px] tracking-[0.06em]" style={{ color: C.dim }}>Banco de Portugal · Reg. nº 4922</div>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.2, 0.7, 0.3, 1] }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Nome",     type: "text",  name: "name", placeholder: "O seu nome", required: true },
                { label: "Telefone", type: "tel",   name: "phone", placeholder: "+351 ..." },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] tracking-[0.28em] uppercase font-[500] mb-2" style={{ color: C.dim }}>{f.label}</label>
                  <input name={f.name} type={f.type} placeholder={f.placeholder} required={f.required}
                    className="w-full px-4 py-[14px] rounded-[10px] text-[15px] transition-all duration-200 outline-none"
                    style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.cream, fontFamily: "inherit" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = C.bgSoft; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}
                  />
                </div>
              ))}
            </div>

            {[{ label: "Email", type: "email", name: "email", placeholder: "seu@email.com", required: true }].map((f) => (
              <div key={f.label}>
                <label className="block text-[10px] tracking-[0.28em] uppercase font-[500] mb-2" style={{ color: C.dim }}>{f.label}</label>
                <input name={f.name} type={f.type} placeholder={f.placeholder} required={f.required}
                  className="w-full px-4 py-[14px] rounded-[10px] text-[15px] transition-all duration-200 outline-none"
                  style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.cream, fontFamily: "inherit" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = C.bgSoft; }}
                  onBlur={(e)  => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}
                />
              </div>
            ))}

            <div>
              <label className="block text-[10px] tracking-[0.28em] uppercase font-[500] mb-2" style={{ color: C.dim }}>Como posso ajudar?</label>
              <select
                name="subject"
                className="w-full px-4 py-[14px] rounded-[10px] text-[15px] transition-all duration-200 outline-none"
                style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.cream, fontFamily: "inherit" }}
                onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = C.border; }}
              >
                <option>Crédito habitação</option>
                <option>Mediação · Compra ou venda</option>
                <option>Seguros</option>
                <option>Transferência de crédito</option>
                <option>Outro</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] tracking-[0.28em] uppercase font-[500] mb-2" style={{ color: C.dim }}>Mensagem</label>
              <textarea
                name="message"
                rows={4} placeholder="Conte-me o que está a pensar..."
                className="w-full px-4 py-[14px] rounded-[10px] text-[15px] transition-all duration-200 outline-none resize-y"
                style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.cream, fontFamily: "inherit", minHeight: 110 }}
                onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = C.bgSoft; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}
              />
            </div>

            <button
              type="submit"
              disabled={sent || sending}
              className="w-full py-4 rounded-[10px] text-[14px] font-[600] tracking-[0.02em] text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-80"
              style={{
                background: sent ? "oklch(0.55 0.13 65 / 0.5)" : `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})`,
                boxShadow: "0 10px 28px oklch(0.4 0.1 65 / 0.35)",
              }}
            >
              {sending ? "A enviar..." : sent ? "Mensagem enviada ✓" : "Enviar mensagem →"}
            </button>
            {error && (
              <p className="text-[12px] mt-2" style={{ color: "oklch(0.65 0.2 25)" }}>{error}</p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: C.bg }}>
      <ScrollProgress />
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <PropertiesSection />
        <AboutSection />
        <PartnersSection />
        <ProcessSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
