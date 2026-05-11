import * as React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  type Variants,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Home,
  TrendingUp,
  Shield,
  Phone,
  Mail,
  MapPin,
  Building2,
  CreditCard,
  FileText,
  Users,
  Star,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Zap,
  Award,
  ChevronDown,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

type PresetType =
  | "fade" | "slide" | "scale" | "blur" | "blur-slide"
  | "zoom" | "flip" | "bounce" | "rotate" | "swing";

type AnimatedGroupProps = {
  children: React.ReactNode;
  className?: string;
  variants?: { container?: Variants; item?: Variants };
  preset?: PresetType;
};

// ─── AnimatedGroup ────────────────────────────────────────────────────────────

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const presetVariants: Record<PresetType, { container: Variants; item: Variants }> = {
  fade: { container: defaultContainerVariants, item: { hidden: { opacity: 0 }, visible: { opacity: 1 } } },
  slide: { container: defaultContainerVariants, item: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } } },
  scale: { container: defaultContainerVariants, item: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } } },
  blur: { container: defaultContainerVariants, item: { hidden: { opacity: 0, filter: "blur(4px)" }, visible: { opacity: 1, filter: "blur(0px)" } } },
  "blur-slide": { container: defaultContainerVariants, item: { hidden: { opacity: 0, filter: "blur(4px)", y: 20 }, visible: { opacity: 1, filter: "blur(0px)", y: 0 } } },
  zoom: { container: defaultContainerVariants, item: { hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 20 } } } },
  flip: { container: defaultContainerVariants, item: { hidden: { opacity: 0, rotateX: -90 }, visible: { opacity: 1, rotateX: 0, transition: { type: "spring", stiffness: 300, damping: 20 } } } },
  bounce: { container: defaultContainerVariants, item: { hidden: { opacity: 0, y: -50 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 10 } } } },
  rotate: { container: defaultContainerVariants, item: { hidden: { opacity: 0, rotate: -180 }, visible: { opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 15 } } } },
  swing: { container: defaultContainerVariants, item: { hidden: { opacity: 0, rotate: -10 }, visible: { opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 300, damping: 8 } } } },
};

function AnimatedGroup({ children, className, variants, preset }: AnimatedGroupProps) {
  const selected = preset ? presetVariants[preset] : { container: defaultContainerVariants, item: defaultItemVariants };
  return (
    <motion.div initial="hidden" animate="visible" variants={variants?.container ?? selected.container} className={cn(className)}>
      {React.Children.map(children, (child, i) => (
        <motion.div key={i} variants={variants?.item ?? selected.item}>{child}</motion.div>
      ))}
    </motion.div>
  );
}

// ─── Scroll Progress Bar ──────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 z-[100] origin-left"
      style={{ scaleX }}
    />
  );
}

// ─── Count-Up Hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target, duration]);

  return { count, ref };
}

// ─── Tilt Card ────────────────────────────────────────────────────────────────

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [x, y]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      className={cn("transition-shadow duration-300 hover:shadow-2xl hover:shadow-amber-900/20", className)}
    >
      {children}
    </motion.div>
  );
}

// ─── Hero Slideshow ───────────────────────────────────────────────────────────

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=90&w=2560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=90&w=2560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=90&w=2560&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?q=90&w=2560&auto=format&fit=crop",
];

function HeroSlideshow() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % HERO_IMAGES.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            animate={{ scale: [1, 1.06] }}
            transition={{ duration: 8, ease: "linear" }}
            className="absolute inset-0"
          >
            <img
              src={HERO_IMAGES[current]}
              alt="Real estate"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/50 to-slate-950" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,_var(--tw-gradient-stops))] from-amber-900/25 via-transparent to-transparent" />
    </div>
  );
}

// ─── Floating Particles ───────────────────────────────────────────────────────

function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-400/20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{ y: [0, -120, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

const Logo = ({ className }: { className?: string }) => (
  <div className={cn("flex items-center gap-2", className)}>
    <div className="relative">
      <Building2 className="h-8 w-8 text-amber-500" />
      <div className="absolute inset-0 h-8 w-8 text-amber-500 blur-md opacity-50">
        <Building2 className="h-8 w-8" />
      </div>
    </div>
    <span className="text-xl font-bold bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 bg-clip-text text-transparent tracking-tight">
      KCasa
    </span>
  </div>
);

// ─── Header ───────────────────────────────────────────────────────────────────

const menuItems = [
  { name: "Serviços", href: "#services" },
  { name: "Sobre", href: "#about" },
  { name: "Testemunhos", href: "#testimonials" },
  { name: "Contacto", href: "#contact" },
];

function Header() {
  const [menuState, setMenuState] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 60));
  }, [scrollY]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav
        data-state={menuState ? "active" : undefined}
        className={cn(
          "group fixed z-50 w-full transition-all duration-500",
          scrolled
            ? "bg-slate-950/90 backdrop-blur-2xl border-b border-amber-900/20 shadow-2xl shadow-slate-950/50"
            : "border-b border-transparent"
        )}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-4 lg:gap-0">
            <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
              <a href="/" aria-label="home">
                <Logo />
              </a>
              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? "Fechar Menu" : "Abrir Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <AnimatePresence mode="wait">
                  {menuState ? (
                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <X className="size-6 text-amber-100" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Menu className="size-6 text-amber-100" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <div className="hidden lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.href}
                        className="relative text-amber-100/70 hover:text-amber-400 block duration-150 font-medium group/nav"
                      >
                        {item.name}
                        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-amber-500 transition-all duration-300 group-hover/nav:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <AnimatePresence>
              {(menuState || true) && (
                <div className={cn(
                  "bg-slate-950/95 backdrop-blur-xl group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-2xl border border-amber-900/20 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none lg:backdrop-blur-none"
                )}>
                  <div className="lg:hidden">
                    <ul className="space-y-6 text-base">
                      {menuItems.map((item, index) => (
                        <li key={index}>
                          <a href={item.href} className="text-amber-100/70 hover:text-amber-400 block duration-150" onClick={() => setMenuState(false)}>
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                    <Button asChild size="sm" className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white border-0 rounded-full px-6 shadow-lg shadow-amber-900/30">
                      <a href="#contact">Contactar</a>
                    </Button>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <HeroSlideshow />
      <FloatingParticles />

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.03)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-7xl px-6 py-32 w-full">
        <AnimatedGroup
          variants={{
            container: { visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } } },
            item: {
              hidden: { opacity: 0, filter: "blur(16px)", y: 30 },
              visible: { opacity: 1, filter: "blur(0px)", y: 0, transition: { type: "spring", bounce: 0.25, duration: 1.4 } },
            },
          }}
        >
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-900/20 border border-amber-700/30 mb-10 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
              <Star className="h-3.5 w-3.5 text-amber-500" />
              <span className="text-sm text-amber-100/90 font-medium tracking-wide">8 Anos de Experiência · +850 Clientes</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-[0.9] tracking-tighter">
              Consultoria
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-amber-300 to-amber-600 bg-clip-text text-transparent">
                Imobiliária
              </span>
              <br />
              <span className="text-5xl md:text-7xl font-bold text-amber-50/80">& Financeira</span>
            </h1>

            <p className="text-lg md:text-xl text-amber-100/60 mb-14 max-w-2xl mx-auto leading-relaxed font-light">
              Soluções completas em crédito, seguros e mediação imobiliária.
              Acompanhamento personalizado do início ao fim — pela <span className="text-amber-400 font-medium">KCasa</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white border-0 px-10 py-6 text-base rounded-full shadow-2xl shadow-amber-900/40 transition-all duration-300 hover:shadow-amber-700/40 hover:scale-105">
                <a href="#contact" className="flex items-center gap-2">
                  Avaliar Imóvel
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/20 text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm px-10 py-6 text-base rounded-full transition-all duration-300 hover:scale-105">
                <a href="#contact">Simular Crédito</a>
              </Button>
            </div>

            {/* Floating stats pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { label: "+850 Clientes", icon: <Users className="h-3.5 w-3.5" /> },
                { label: "+200 Imóveis", icon: <Home className="h-3.5 w-3.5" /> },
                { label: "Reg. BdP #4922", icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-sm text-amber-100/70"
                >
                  <span className="text-amber-500">{item.icon}</span>
                  {item.label}
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedGroup>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-amber-100/40 z-10"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown className="h-5 w-5" />
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
    </section>
  );
}

// ─── Proof / Stats ────────────────────────────────────────────────────────────

function StatCounter({ target, suffix = "", label }: { target: number; suffix?: string; label: string }) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref} className="text-center group">
      <div className="text-5xl md:text-6xl font-black bg-gradient-to-br from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent mb-2 tabular-nums">
        {suffix}{count}
      </div>
      <div className="text-amber-100/50 text-sm font-medium tracking-wide uppercase">{label}</div>
    </div>
  );
}

function ProofSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="about" className="relative py-28 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-3">Os Nossos Números</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Resultados que falam por si</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatCounter target={850} suffix="+" label="Clientes Satisfeitos" />
          <StatCounter target={200} suffix="+" label="Imóveis Angariados" />
          <StatCounter target={8} label="Anos de Experiência" />
          <StatCounter target={1} label="Prémio da Indústria" />
        </div>

        {/* Horizontal divider line */}
        <div className="mt-20 pt-8 border-t border-amber-900/20 flex flex-col md:flex-row items-center justify-center gap-8 text-center">
          <p className="text-amber-100/50 text-sm max-w-2xl leading-relaxed">
            A <span className="text-amber-400 font-medium">KCasa</span> (Factores Irreverentes Unipessoal Lda) é um intermediário de crédito registado no Banco de Portugal sob o n.º 4922, oferecendo soluções integradas em crédito, seguros e mediação imobiliária.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

function FeaturesSection() {
  const features = [
    { icon: <Home className="h-7 w-7" />, title: "Crédito Habitação", description: "Melhores condições de financiamento para a sua casa própria junto dos principais bancos.", tag: "Popular" },
    { icon: <CreditCard className="h-7 w-7" />, title: "Crédito Consolidado", description: "Junte todos os seus créditos numa única prestação mais baixa e com melhores condições." },
    { icon: <Shield className="h-7 w-7" />, title: "Seguros", description: "Proteção completa para si, família e património com as melhores seguradoras do mercado." },
    { icon: <TrendingUp className="h-7 w-7" />, title: "Investimento Imobiliário", description: "Apoio especializado na compra, venda e arrendamento de imóveis para investimento rentável." },
    { icon: <FileText className="h-7 w-7" />, title: "Avaliação de Imóveis", description: "Avaliações rigorosas e transparentes do valor de mercado do seu imóvel." },
    { icon: <Zap className="h-7 w-7" />, title: "Telecomunicações & Energia", description: "Serviços de telecomunicações, eletricidade e gás negociados para poupar mais." },
    { icon: <Users className="h-7 w-7" />, title: "Crédito Pessoal & Auto", description: "Financiamento para automóvel, obras e necessidades pessoais com as melhores taxas." },
    { icon: <Award className="h-7 w-7" />, title: "Transferência de Crédito", description: "Transfira o seu crédito habitação para condições mais vantajosas sem complicações." },
  ];

  return (
    <section id="services" className="py-28 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.02)_1px,transparent_1px)] bg-[size:80px_80px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-3"
          >
            O Que Oferecemos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-5 tracking-tight"
          >
            Serviços Integrados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-amber-100/50 max-w-2xl mx-auto font-light"
          >
            Tudo o que precisa num só lugar, com a confiança de quem conhece o mercado
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07, duration: 0.5 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <TiltCard className="h-full">
                <Card className="bg-slate-900/60 border-slate-800 hover:border-amber-700/40 transition-all duration-500 h-full backdrop-blur-sm relative overflow-hidden group/card">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-600/0 to-amber-600/0 group-hover/card:from-amber-600/5 group-hover/card:to-transparent transition-all duration-500" />
                  <CardHeader className="pb-0">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-600/20 to-amber-500/5 border border-amber-700/20 flex items-center justify-center text-amber-500 group-hover/card:scale-110 group-hover/card:border-amber-600/40 transition-all duration-300">
                        {feature.icon}
                      </div>
                      {feature.tag && (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-600/20 text-amber-400 border border-amber-600/20">
                          {feature.tag}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-white mb-0 group-hover/card:text-amber-100 transition-colors">
                      {feature.title}
                    </h3>
                  </CardHeader>
                  <CardContent className="pt-3">
                    <p className="text-amber-100/50 text-sm leading-relaxed">{feature.description}</p>
                    <div className="mt-4 flex items-center gap-1 text-amber-500/70 text-xs font-medium group-hover/card:text-amber-400 transition-colors">
                      Saber mais <ChevronRight className="h-3 w-3 group-hover/card:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function AnimatedTestimonials({ testimonials, autoplay = false, className }: { testimonials: Testimonial[]; autoplay?: boolean; className?: string }) {
  const [active, setActive] = useState(0);
  const handleNext = () => setActive((p) => (p + 1) % testimonials.length);
  const handlePrev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(handleNext, 6000);
    return () => clearInterval(t);
  }, [autoplay]);

  return (
    <div className={cn("max-w-5xl mx-auto px-4 md:px-8 py-16", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Image stack */}
        <div className="relative h-96 w-full">
          <AnimatePresence>
            {testimonials.map((t, i) => (
              <motion.div
                key={t.src}
                initial={{ opacity: 0, scale: 0.9, rotate: (Math.random() - 0.5) * 20, z: -100 }}
                animate={{
                  opacity: i === active ? 1 : 0.5,
                  scale: i === active ? 1 : 0.92,
                  rotate: i === active ? 0 : (Math.random() - 0.5) * 12,
                  zIndex: i === active ? 10 : testimonials.length - i,
                  y: i === active ? [0, -12, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.88, z: 100 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 origin-bottom"
              >
                <img
                  src={t.src}
                  alt={t.name}
                  className="h-full w-full rounded-3xl object-cover object-center shadow-2xl shadow-slate-950/60"
                  style={{ filter: i !== active ? "brightness(0.6)" : "none" }}
                />
                {i === active && (
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-amber-500/20" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Text */}
        <div className="flex flex-col justify-between py-4 min-h-[320px]">
          <motion.div key={active} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -24, opacity: 0 }} transition={{ duration: 0.3 }}>
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
              ))}
            </div>

            <blockquote className="text-xl text-white/90 leading-relaxed mb-8 font-light italic">
              "{testimonials[active].quote}"
            </blockquote>

            <div>
              <div className="font-bold text-white text-lg">{testimonials[active].name}</div>
              <div className="text-amber-400/70 text-sm mt-1">{testimonials[active].designation}</div>
            </div>
          </motion.div>

          <div className="flex items-center gap-4 mt-10">
            <button
              onClick={handlePrev}
              className="h-11 w-11 rounded-full bg-slate-800 border border-slate-700 hover:border-amber-600/50 hover:bg-amber-900/20 flex items-center justify-center transition-all duration-200 group/btn"
            >
              <ChevronRight className="h-5 w-5 text-amber-100 rotate-180 group-hover/btn:scale-110 transition-transform" />
            </button>
            <button
              onClick={handleNext}
              className="h-11 w-11 rounded-full bg-slate-800 border border-slate-700 hover:border-amber-600/50 hover:bg-amber-900/20 flex items-center justify-center transition-all duration-200 group/btn"
            >
              <ChevronRight className="h-5 w-5 text-amber-100 group-hover/btn:scale-110 transition-transform" />
            </button>

            {/* Dots */}
            <div className="flex gap-2 ml-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} className={cn("h-1.5 rounded-full transition-all duration-300", i === active ? "w-8 bg-amber-500" : "w-1.5 bg-slate-600 hover:bg-slate-500")} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      quote: "O Fernando ajudou-me a encontrar as melhores condições de crédito habitação. Profissionalismo e dedicação excepcionais!",
      name: "Maria Silva",
      designation: "Cliente desde 2022",
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop",
    },
    {
      quote: "Excelente acompanhamento na venda do meu imóvel. Sempre disponível e com soluções para tudo.",
      name: "João Santos",
      designation: "Cliente desde 2021",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    },
    {
      quote: "Consegui consolidar todos os meus créditos com condições muito melhores. Recomendo vivamente!",
      name: "Ana Costa",
      designation: "Cliente desde 2023",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
    },
  ];

  return (
    <section id="testimonials" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(217,119,6,0.07),transparent)]" />
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-4">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-3">
            Testemunhos
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-white tracking-tight">
            O Que Dizem os
            <br />
            <span className="bg-gradient-to-r from-amber-500 to-amber-300 bg-clip-text text-transparent">Nossos Clientes</span>
          </motion.h2>
        </div>
        <AnimatedTestimonials testimonials={testimonials} autoplay />
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  return (
    <section id="contact" className="py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-amber-700/30" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-amber-500 text-sm font-semibold tracking-widest uppercase mb-3">
            Contacto
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} viewport={{ once: true }} className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Vamos Conversar?
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <p className="text-xl text-amber-100/60 mb-10 font-light leading-relaxed">
              Entre em contacto connosco. Estamos prontos para ajudar a realizar os seus objetivos.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: <Phone className="h-5 w-5 text-amber-500" />,
                  label: "Telefone",
                  content: (
                    <>
                      <a href="tel:+351932773324" className="block text-amber-100/70 hover:text-amber-400 transition-colors">(+351) 932 773 324</a>
                      <a href="tel:+351938483143" className="block text-amber-100/70 hover:text-amber-400 transition-colors">(+351) 938 483 143</a>
                    </>
                  ),
                },
                {
                  icon: <Mail className="h-5 w-5 text-amber-500" />,
                  label: "Email",
                  content: (
                    <>
                      <a href="mailto:foliveira.kcasa@gmail.com" className="block text-amber-100/70 hover:text-amber-400 transition-colors">foliveira.kcasa@gmail.com</a>
                      <a href="mailto:fernando.oliveira@maxfinance.pt" className="block text-amber-100/70 hover:text-amber-400 transition-colors">fernando.oliveira@maxfinance.pt</a>
                    </>
                  ),
                },
                {
                  icon: <MapPin className="h-5 w-5 text-amber-500" />,
                  label: "Morada",
                  content: (
                    <p className="text-amber-100/70">
                      Rua Dom António Castro Meireles nº 1217<br />
                      4435-666 Baguim do Monte, Porto
                    </p>
                  ),
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-5 group"
                >
                  <div className="h-12 w-12 rounded-2xl bg-slate-800 border border-slate-700 group-hover:border-amber-700/40 group-hover:bg-amber-900/20 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-amber-500/70 uppercase tracking-widest mb-1">{item.label}</div>
                    {item.content}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-10 p-5 rounded-2xl bg-gradient-to-r from-amber-900/15 to-amber-800/10 border border-amber-700/20"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <p className="text-sm text-amber-100/60">
                  <strong className="text-amber-400">Intermediário de Crédito</strong> registado no Banco de Portugal — Registo nº 4922
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
            <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm shadow-2xl shadow-slate-950/50">
              <CardContent className="p-8">
                <form className="space-y-5">
                  {[
                    { label: "Nome", type: "text", placeholder: "O seu nome" },
                    { label: "Email", type: "email", placeholder: "seu@email.com" },
                    { label: "Telefone", type: "tel", placeholder: "+351 ..." },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs font-semibold text-amber-100/60 uppercase tracking-widest mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-600 focus:border-amber-600/60 focus:outline-none focus:ring-2 focus:ring-amber-600/15 transition-all duration-200"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-semibold text-amber-100/60 uppercase tracking-widest mb-2">Mensagem</label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-950/70 border border-slate-700 text-white placeholder-slate-600 focus:border-amber-600/60 focus:outline-none focus:ring-2 focus:ring-amber-600/15 transition-all duration-200 resize-none"
                      placeholder="Como podemos ajudar?"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white border-0 py-6 rounded-xl text-base font-semibold shadow-lg shadow-amber-900/30 hover:shadow-amber-700/40 hover:scale-[1.02] transition-all duration-300">
                    Enviar Mensagem
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const FOOTER_STYLES = `
@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.6; }
}
.animate-footer-breathe {
  animation: footer-breathe 10s ease-in-out infinite alternate;
}
`;

function FooterComponent() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        giantTextRef.current,
        { y: "15vh", scale: 0.75, opacity: 0 },
        { y: "0vh", scale: 1, opacity: 1, ease: "power2.out", scrollTrigger: { trigger: wrapperRef.current, start: "top 80%", end: "bottom bottom", scrub: 1.5 } }
      );
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_STYLES }} />
      <div ref={wrapperRef} className="relative h-screen w-full" style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}>
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-slate-950 text-amber-50">
          {/* Aurora glow */}
          <div className="animate-footer-breathe absolute left-1/2 top-1/2 h-[70vh] w-[90vw] rounded-[50%] blur-[100px] pointer-events-none z-0" style={{ background: "radial-gradient(circle, rgba(217,119,6,0.18) 0%, rgba(251,191,36,0.08) 50%, transparent 70%)" }} />

          {/* Grid */}
          <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(251,191,36,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(251,191,36,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "linear-gradient(to bottom, transparent, black 30%, black 70%, transparent)" }} />

          {/* Giant text */}
          <div
            ref={giantTextRef}
            className="absolute -bottom-[8vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none text-[22vw] font-black leading-[0.75] tracking-tighter"
            style={{ color: "transparent", WebkitTextStroke: "1px rgba(251,191,36,0.06)", background: "linear-gradient(180deg, rgba(251,191,36,0.12) 0%, transparent 60%)", WebkitBackgroundClip: "text", backgroundClip: "text" }}
          >
            KCASA
          </div>

          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 w-full max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 bg-gradient-to-b from-white to-white/30 bg-clip-text text-transparent leading-none">
                Pronto para<br />começar?
              </h2>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white border-0 px-10 py-6 text-lg rounded-full shadow-2xl shadow-amber-900/40 hover:shadow-amber-700/50 hover:scale-105 transition-all duration-300">
                  <a href="#contact">Contactar Agora <ArrowRight className="ml-2 h-5 w-5" /></a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white/15 text-white bg-white/5 hover:bg-white/10 px-10 py-6 text-lg rounded-full backdrop-blur-sm hover:scale-105 transition-all duration-300">
                  <a href="#services">Ver Serviços</a>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
            <div className="text-white/30 text-xs order-2 md:order-1">© 2024 KCasa · Factores Irreverentes Unipessoal Lda.</div>
            <Logo className="order-1 md:order-2" />
            <div className="text-white/30 text-xs order-3 text-center md:text-right">Intermediário de Crédito<br />Banco de Portugal — Reg. nº 4922</div>
          </div>
        </footer>
      </div>
    </>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="relative w-full bg-slate-950 min-h-screen overflow-x-hidden">
      <ScrollProgressBar />
      <Header />
      <main>
        <HeroSection />
        <ProofSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <FooterComponent />
    </div>
  );
}
