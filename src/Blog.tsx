import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { C, Serif, MonoLabel, ScrollProgress, Header, Footer } from "./shared";
import { store } from "./data/store";
import type { Post, Category } from "./data/types";

const ALL_CAT: Category = { id: "all", label: "Todos" };

// ─── Blog hero ────────────────────────────────────────────────────────────────

function BlogHero() {
  return (
    <section
      className="relative pt-[180px] pb-[64px] overflow-hidden"
      style={{ background: `linear-gradient(180deg, ${C.bgDeep}, ${C.bg})` }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.55 0.13 65 / 0.18), transparent 70%)" }}
      />
      <div className="max-w-[1280px] mx-auto px-14 relative text-center">
        <MonoLabel className="block mb-6">Notas & análises</MonoLabel>
        <h1
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(56px, 8vw, 112px)",
            lineHeight: 0.95, letterSpacing: "-0.025em",
            color: C.cream, maxWidth: "14ch", margin: "0 auto",
          }}
        >
          Conversas <Serif italic style={{ color: C.gold }}>sobre casa</Serif>, em texto.
        </h1>
        <p
          className="mt-7 mx-auto text-[18px] leading-[1.55] max-w-[60ch]"
          style={{ color: C.dimS }}
        >
          Guias práticos, análises de mercado e histórias de processos reais — para quem está a pensar em comprar, vender ou refinanciar.
        </p>
      </div>
    </section>
  );
}

// ─── Filters ──────────────────────────────────────────────────────────────────

function Filters({ active, onSelect, posts, cats }: { active: string; onSelect: (cat: string) => void; posts: Post[]; cats: Category[] }) {
  const allCats = [ALL_CAT, ...cats];
  return (
    <div
      className="py-10 flex justify-center gap-[10px] flex-wrap"
      style={{ borderBottom: `1px solid ${C.border}` }}
    >
      {allCats.map((cat) => {
        const count = cat.id === "all" ? posts.length : posts.filter((p) => p.cat === cat.id).length;
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="px-[18px] py-[9px] rounded-full text-[13px] font-[500] transition-all duration-200"
            style={{
              background: isActive ? "oklch(0.55 0.13 65 / 0.18)" : C.bgDeep,
              border: `1px solid ${isActive ? C.gold : C.border}`,
              color: isActive ? C.gold : C.dimS,
            }}
          >
            {cat.label}
            <span
              className="ml-[6px] text-[11px]"
              style={{ color: isActive ? C.gold : C.dim }}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Featured post ────────────────────────────────────────────────────────────

function FeaturedPost({ post }: { post: Post }) {
  return (
    <section className="py-[80px]">
      <div className="max-w-[1280px] mx-auto px-14">
        <Link to={`/blog/${post.id}`} style={{ textDecoration: "none", display: "block" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.3, 1] }}
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center p-8 rounded-[20px] relative overflow-hidden"
          style={{ border: `1px solid ${C.border}`, background: `linear-gradient(135deg, ${C.bgSoft}, ${C.bgDeep})` }}
        >
          <div
            className="absolute top-0 right-0 w-3/5 h-full pointer-events-none"
            style={{ background: "radial-gradient(ellipse at right top, oklch(0.55 0.13 65 / 0.1), transparent 60%)" }}
          />
          <div className="relative aspect-[5/4] rounded-[14px] overflow-hidden group" style={{ background: C.bgDeep }}>
            <span
              className="absolute top-[18px] left-[18px] z-10 text-[10px] tracking-[0.24em] uppercase font-[600] px-3 py-[6px] rounded-full text-white"
              style={{ background: "oklch(0.55 0.13 65 / 0.95)", backdropFilter: "blur(8px)" }}
            >
              Em destaque
            </span>
            {post.img && <img src={post.img} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.04]" />}
          </div>
          <div className="relative">
            <div className="flex flex-wrap gap-[14px] items-center text-[11px] tracking-[0.16em] uppercase font-[500] mb-[22px]" style={{ color: C.dim }}>
              <span style={{ color: C.gold }}>{post.catLabel}</span>
              <span className="w-[3px] h-[3px] rounded-full" style={{ background: C.dim }} />
              <span>{post.read} de leitura</span>
              <span className="w-[3px] h-[3px] rounded-full" style={{ background: C.dim }} />
              <span>{post.date}</span>
            </div>
            <h2 style={{ fontFamily: '"Instrument Serif", serif', fontSize: "clamp(32px, 4.5vw, 52px)", lineHeight: 1.05, letterSpacing: "-0.02em", color: C.cream, marginBottom: 22 }}>
              {post.title}
            </h2>
            <p className="text-[15px] leading-[1.65] mb-7 max-w-[50ch]" style={{ color: C.dimS }}>{post.excerpt}</p>
            <div className="flex items-center gap-[14px] mb-7">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-none"
                style={{ background: `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})`, fontFamily: '"Instrument Serif", serif', fontSize: 16, color: "white", fontStyle: "italic" }}
              >
                f
              </div>
              <div>
                <div className="text-[14px] font-[500]" style={{ color: C.cream }}>Fernando Oliveira</div>
                <div className="text-[11px] mt-[2px] tracking-[0.12em] uppercase" style={{ color: C.dim }}>Consultor · BdP nº 4922</div>
              </div>
            </div>
            <Link to={`/blog/${post.id}`} className="inline-flex items-center gap-2 text-[13px] font-[500] transition-all duration-200 hover:gap-[14px]" style={{ color: C.gold }}>
              Ler artigo completo →
            </Link>
          </div>
        </motion.div>
        </Link>
      </div>
    </section>
  );
}

// ─── Post card ────────────────────────────────────────────────────────────────

function PostCard({ post, delay = 0 }: { post: Post; delay?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link to={`/blog/${post.id}`} style={{ textDecoration: "none", display: "block" }}>
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      className="cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden mb-[22px]" style={{ background: C.bgSoft }}>
        <span
          className="absolute top-[14px] left-[14px] z-10 text-[10px] tracking-[0.2em] uppercase font-[600] px-[10px] py-[5px] rounded-full"
          style={{ background: "oklch(0.15 0.01 250 / 0.85)", color: C.gold, backdropFilter: "blur(8px)" }}
        >
          {post.catLabel}
        </span>
        <img
          src={post.img}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)", transition: "transform 700ms ease" }}
        />
      </div>
      <div
        className="flex gap-[10px] items-center text-[11px] tracking-[0.12em] uppercase font-[500] mb-3"
        style={{ color: C.dim }}
      >
        <span>{post.date}</span>
        <span className="w-[3px] h-[3px] rounded-full" style={{ background: C.dim }} />
        <span>{post.read}</span>
      </div>
      <h3
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontSize: 26, lineHeight: 1.15, marginBottom: 12,
          color: hovered ? C.gold : C.cream,
          transition: "color 250ms",
        }}
      >
        {post.title}
      </h3>
      <p className="text-[14px] leading-[1.6]" style={{ color: C.dimS }}>
        {post.excerpt}
      </p>
      <div
        className="mt-[18px] pt-4 flex justify-between items-center"
        style={{ borderTop: `1px solid ${C.border}` }}
      >
        <div className="flex items-center gap-[10px] text-[12px]" style={{ color: C.dimS }}>
          <div
            className="w-[26px] h-[26px] rounded-full flex items-center justify-center flex-none"
            style={{
              background: `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})`,
              fontFamily: '"Instrument Serif", serif', fontSize: 11, color: "white", fontStyle: "italic",
            }}
          >
            f
          </div>
          Fernando Oliveira
        </div>
        <span
          style={{
            color: C.gold, fontSize: 14,
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 250ms",
            display: "inline-block",
          }}
        >
          →
        </span>
      </div>
    </motion.article>
    </Link>
  );
}

// ─── Posts grid ───────────────────────────────────────────────────────────────

function PostsGrid({ filter, posts }: { filter: string; posts: Post[] }) {
  const filtered = filter === "all" ? posts : posts.filter((p) => p.cat === filter);

  return (
    <section className="pb-[140px]">
      <div className="max-w-[1280px] mx-auto px-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex justify-between items-end mb-14 pb-7"
          style={{ borderBottom: `1px solid ${C.border}` }}
        >
          <h2
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: 40, color: C.cream, letterSpacing: "-0.02em",
            }}
          >
            Artigos recentes
          </h2>
          <span className="text-[13px]" style={{ color: C.dim }}>
            {filtered.length} publicações
          </span>
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center py-[80px] text-[14px]" style={{ color: C.dim }}>
            Sem artigos nesta categoria — para já.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-[36px]">
            {filtered.map((post, i) => (
              <PostCard key={post.title} post={post} delay={(i % 3) * 0.08} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section
      className="py-[100px] relative overflow-hidden"
      style={{
        background: C.bgDeep,
        borderTop: `1px solid ${C.border}`,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, oklch(0.55 0.13 65 / 0.1), transparent 70%)" }}
      />
      <div className="max-w-[640px] mx-auto px-14 text-center relative">
        <h2
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(40px, 5vw, 64px)",
            lineHeight: 1, color: C.cream, marginBottom: 18, letterSpacing: "-0.02em",
          }}
        >
          Uma <Serif italic style={{ color: C.gold }}>nota por mês</Serif>, no seu email.
        </h2>
        <p className="text-[16px] leading-[1.55] mb-9" style={{ color: C.dimS }}>
          Análises de mercado, atualizações de Euribor, um imóvel que vale a pena. Nada mais. Cancela quando quiser.
        </p>
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="flex gap-[10px] max-w-[480px] mx-auto"
        >
          <input
            type="email"
            placeholder="seu@email.com"
            required
            disabled={sent}
            className="flex-1 px-[18px] py-[14px] rounded-full text-[14px] outline-none transition-all"
            style={{
              background: C.bg,
              border: `1px solid ${C.border}`,
              color: C.cream,
              fontFamily: "inherit",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = C.gold; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = C.border; }}
          />
          <button
            type="submit"
            disabled={sent}
            className="px-7 py-[14px] rounded-full text-[13px] font-[600] text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70"
            style={{ background: `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})` }}
          >
            {sent ? "Inscrito ✓" : "Subscrever →"}
          </button>
        </form>
        <p className="mt-[14px] text-[11px] tracking-[0.06em]" style={{ color: C.dim }}>
          Sem spam. Sem partilha de dados. Apenas uma nota, no primeiro dia útil do mês.
        </p>
      </div>
    </section>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function Blog() {
  const [filter, setFilter] = useState("all");
  const [posts] = useState<Post[]>(store.getPosts);
  const [cats] = useState<Category[]>(store.getCategories);
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const nonFeatured = posts.filter((p) => p.id !== featured?.id);

  return (
    <div style={{ background: C.bg }}>
      <ScrollProgress />
      <Header />
      <main>
        <BlogHero />
        <Filters active={filter} onSelect={setFilter} posts={posts} cats={cats} />
        {featured && <FeaturedPost post={featured} />}
        <PostsGrid filter={filter} posts={nonFeatured} />
        <Newsletter />
      </main>
      <Footer compact />
    </div>
  );
}
