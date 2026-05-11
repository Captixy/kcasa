import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { C, Serif, MonoLabel, ScrollProgress, Header, Footer } from "./shared";

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
            background: `linear-gradient(180deg, oklch(0.18 0.01 250 / 0.7) 0%, oklch(0.18 0.01 250 / 0.5) 50%, ${C.bg} 100%), radial-gradient(ellipse at top, oklch(0.55 0.13 65 / 0.25), transparent 60%)`,
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
        <Stat target={850} suffix="+" label="Clientes" desc="Famílias e investidores acompanhados desde 2017." delay={0} />
        <Stat target={200} suffix="+" label="Imóveis"  desc="Mediação e angariação em todo o Grande Porto." delay={0.08} />
        <Stat target={8}   label="Anos"    desc="Experiência consolidada no setor imobiliário e financeiro." delay={0.16} />
        <Stat target={98}  suffix="%" label="Recomendação" desc="Taxa de clientes que voltariam a trabalhar comigo." delay={0.24} />
      </div>
    </section>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

const SERVICES = [
  { glyph: "C", title: "Crédito Habitação",     desc: "Melhores condições junto dos principais bancos. Eu negoceio, você assina.", tag: "Popular" },
  { glyph: "M", title: "Mediação Imobiliária",  desc: "Comprar, vender ou arrendar — com avaliação rigorosa e marketing pensado para o seu imóvel." },
  { glyph: "S", title: "Seguros",               desc: "Proteção para si, família e património. Comparo o mercado por si." },
  { glyph: "T", title: "Transferência de Crédito", desc: "Reveja o seu crédito atual. Se houver melhor, mudamos sem complicações." },
  { glyph: "A", title: "Avaliação de Imóveis",  desc: "Avaliações independentes e transparentes do valor real do seu imóvel." },
  { glyph: "I", title: "Investimento",          desc: "Rentabilidade pensada — onde comprar, a que preço, para que retorno." },
];

function ServicesSection() {
  return (
    <section id="services" className="py-[140px]" style={{ background: C.bg }}>
      <div className="max-w-[1280px] mx-auto px-14">
        <SectionHead
          label="O que faço"
          heading={<>Soluções integradas, <Serif italic style={{ color: C.gold }}>uma única pessoa</Serif>.</>}
          sub="Crédito, seguros e mediação imobiliária — tudo coordenado do mesmo lado da mesa, sem reencaminhamentos."
        />

        <div
          className="grid grid-cols-1 md:grid-cols-3 overflow-hidden rounded-xl"
          style={{ background: C.border, border: `1px solid ${C.border}` }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 3) * 0.08, duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
              viewport={{ once: true, margin: "-40px" }}
              className="relative group cursor-pointer transition-colors duration-400"
              style={{ background: C.bg, padding: "44px 36px" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.bgSoft)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.bg)}
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
                <span style={{ fontFamily: '"Instrument Serif", serif', fontSize: 22, color: C.gold, fontStyle: "italic" }}>
                  {s.glyph}
                </span>
              </div>
              <h3 className="relative z-10 text-[19px] font-[500] mb-3" style={{ color: C.cream, letterSpacing: "-0.01em" }}>
                {s.title}
              </h3>
              <p className="relative z-10 text-[14px] leading-[1.6]" style={{ color: C.dimS }}>{s.desc}</p>
              <span
                className="relative z-10 inline-flex items-center gap-[6px] mt-6 text-[12px] font-[500] transition-all duration-200 group-hover:gap-[10px]"
                style={{ color: C.gold }}
              >
                Saber mais →
              </span>
            </motion.div>
          ))}
        </div>
      </div>
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

// ─── Partners ─────────────────────────────────────────────────────────────────

function PartnersSection() {
  const partners = [1, 2, 3, 4, 5, 6, 7];
  const items = [...partners, ...partners, ...partners];

  return (
    <section id="partners" className="pt-[140px] pb-[60px]" style={{ background: C.bg }}>
      <div className="max-w-[1280px] mx-auto px-14">
        <SectionHead
          label="Nossos parceiros"
          heading={<>As marcas que <Serif italic style={{ color: C.gold }}>trabalham comigo</Serif>.</>}
          sub="Bancos, seguradoras e operadores que tornam possível oferecer-lhe sempre a melhor solução do mercado."
        />
      </div>

      <div
        className="overflow-hidden py-6"
        style={{
          maskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="marquee-track flex gap-20 items-center" style={{ width: "max-content" }}>
          {items.map((n, i) => (
            <img
              key={i}
              src={`/partners/partner-${n}.png`}
              alt={`Parceiro ${n}`}
              loading="lazy"
              className="flex-none h-[72px] w-auto object-contain cursor-pointer"
              style={{ opacity: 0.45, filter: "brightness(0) invert(1)", transition: "opacity 400ms, filter 400ms" }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.opacity = "1";
                el.style.filter = "none";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                el.style.opacity = "0.45";
                el.style.filter = "brightness(0) invert(1)";
              }}
            />
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
  { n: "04", title: "Escritura & após",  desc: "Acompanho até à entrega das chaves — e depois, se for preciso." },
];

function ProcessSection() {
  return (
    <section id="process" className="py-[140px]" style={{ background: C.bgDeep }}>
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
                  background: C.bgDeep,
                  border: `1px solid ${C.gold}`,
                  boxShadow: `0 0 0 6px ${C.bgDeep}`,
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

interface Testimonial {
  quote: string; name: string; role: string; avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  { quote: "O Fernando ajudou-me a encontrar as melhores condições de crédito habitação. Profissionalismo e dedicação excepcionais — tratou de tudo, eu só precisei de assinar.", name: "Maria Silva", role: "Cliente · 2022", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
  { quote: "Excelente acompanhamento na venda do meu imóvel. Sempre disponível e com soluções para tudo o que ia surgindo. Recomendo de olhos fechados.", name: "João Santos", role: "Cliente · 2021", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
  { quote: "Consegui consolidar todos os meus créditos com condições muito melhores. Acabou um problema que arrastava há anos. Obrigada, Fernando.", name: "Ana Costa", role: "Cliente · 2023", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
];

function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const go = useCallback((i: number) => setActive((i + TESTIMONIALS.length) % TESTIMONIALS.length), []);

  useEffect(() => {
    const t = setInterval(() => go(active + 1), 7000);
    return () => clearInterval(t);
  }, [active, go]);

  return (
    <section id="testimonials" className="py-[140px]" style={{ background: C.bg }}>
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
                  {TESTIMONIALS[active].quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div
                    className="w-[52px] h-[52px] rounded-full flex-none bg-cover bg-center"
                    style={{ backgroundImage: `url('${TESTIMONIALS[active].avatar}')`, border: `1px solid ${C.border}` }}
                  />
                  <div>
                    <div className="text-[15px] font-[500]" style={{ color: C.cream }}>{TESTIMONIALS[active].name}</div>
                    <div className="text-[12px] mt-[3px] tracking-[0.1em] uppercase" style={{ color: C.gold }}>{TESTIMONIALS[active].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between items-center mt-9">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
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

  return (
    <section id="contact" className="py-[140px]" style={{ background: C.bgDeep }}>
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
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Nome",     type: "text",  placeholder: "O seu nome", required: true },
                { label: "Telefone", type: "tel",   placeholder: "+351 ..." },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-[10px] tracking-[0.28em] uppercase font-[500] mb-2" style={{ color: C.dim }}>{f.label}</label>
                  <input type={f.type} placeholder={f.placeholder} required={f.required}
                    className="w-full px-4 py-[14px] rounded-[10px] text-[15px] transition-all duration-200 outline-none"
                    style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.cream, fontFamily: "inherit" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = C.bgSoft; }}
                    onBlur={(e)  => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}
                  />
                </div>
              ))}
            </div>

            {[{ label: "Email", type: "email", placeholder: "seu@email.com", required: true }].map((f) => (
              <div key={f.label}>
                <label className="block text-[10px] tracking-[0.28em] uppercase font-[500] mb-2" style={{ color: C.dim }}>{f.label}</label>
                <input type={f.type} placeholder={f.placeholder} required={f.required}
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
                rows={4} placeholder="Conte-me o que está a pensar..."
                className="w-full px-4 py-[14px] rounded-[10px] text-[15px] transition-all duration-200 outline-none resize-y"
                style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.cream, fontFamily: "inherit", minHeight: 110 }}
                onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; e.currentTarget.style.background = C.bgSoft; }}
                onBlur={(e)  => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.bg; }}
              />
            </div>

            <button
              type="submit"
              disabled={sent}
              className="w-full py-4 rounded-[10px] text-[14px] font-[600] tracking-[0.02em] text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-80"
              style={{
                background: sent ? "oklch(0.55 0.13 65 / 0.5)" : `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})`,
                boxShadow: "0 10px 28px oklch(0.4 0.1 65 / 0.35)",
              }}
            >
              {sent ? "Mensagem enviada ✓" : "Enviar mensagem →"}
            </button>
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
