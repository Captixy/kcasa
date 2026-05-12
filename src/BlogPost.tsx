import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { C, Serif, ScrollProgress, Header, Footer } from "./shared";
import { store } from "./data/store";

function BodyContent({ body }: { body: string }) {
  const paragraphs = body.split(/\n\n+/).filter(Boolean);
  return (
    <>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          style={{
            fontSize: 17,
            lineHeight: 1.8,
            color: C.dimS,
            marginBottom: 28,
          }}
        >
          {p}
        </p>
      ))}
    </>
  );
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const posts = useMemo(() => store.getPosts(), []);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column" }}>
        <Header />
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontSize: 96, color: C.gold, lineHeight: 1 }}>404</div>
            <p style={{ color: C.dimS, fontSize: 16, marginTop: 12, marginBottom: 28 }}>Artigo não encontrado.</p>
            <Link to="/blog" style={{ color: C.gold, fontSize: 14, fontWeight: 500 }}>← Voltar ao blogue</Link>
          </div>
        </div>
        <Footer compact />
      </div>
    );
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <ScrollProgress />
      <Header />

      <main>
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <section
          style={{
            position: "relative",
            paddingTop: 160,
            paddingBottom: 0,
            overflow: "hidden",
            background: `linear-gradient(180deg, ${C.bgDeep}, ${C.bg})`,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, oklch(0.55 0.13 65 / 0.15), transparent 70%)" }}
          />

          <div className="max-w-[860px] mx-auto px-14 relative">
            {/* Breadcrumb */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 mb-8"
              style={{ color: C.dim, fontSize: 13, textDecoration: "none", fontWeight: 500 }}
            >
              <ArrowLeft size={14} />
              Voltar ao blogue
            </Link>

            {/* Category + meta */}
            <div
              className="flex flex-wrap gap-[14px] items-center text-[11px] tracking-[0.18em] uppercase font-[500] mb-6"
              style={{ color: C.dim }}
            >
              <span style={{ color: C.gold }}>{post.catLabel}</span>
              <span className="w-[3px] h-[3px] rounded-full" style={{ background: C.dim }} />
              <span className="inline-flex items-center gap-[5px]"><Calendar size={11} />{post.date}</span>
              <span className="w-[3px] h-[3px] rounded-full" style={{ background: C.dim }} />
              <span className="inline-flex items-center gap-[5px]"><Clock size={11} />{post.read} de leitura</span>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.3, 1] }}
              style={{
                fontFamily: '"Instrument Serif", serif',
                fontSize: "clamp(36px, 5vw, 64px)",
                lineHeight: 1.06,
                letterSpacing: "-0.025em",
                color: C.cream,
                marginBottom: 24,
              }}
            >
              {post.title}
            </motion.h1>

            {/* Excerpt lead */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.2, 0.7, 0.3, 1] }}
              style={{ fontSize: 18, lineHeight: 1.65, color: C.dimS, maxWidth: "60ch", marginBottom: 48 }}
            >
              {post.excerpt}
            </motion.p>

            {/* Author row */}
            <div
              className="flex items-center gap-[14px] pb-10"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center flex-none"
                style={{
                  background: `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})`,
                  fontFamily: '"Instrument Serif", serif',
                  fontSize: 18, color: "white", fontStyle: "italic",
                }}
              >
                f
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.cream }}>Fernando Oliveira</div>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.dim, marginTop: 2 }}>
                  Consultor · BdP nº 4922
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Hero image ───────────────────────────────────────────── */}
        {post.img && (
          <section style={{ background: C.bg }}>
            <motion.div
              className="max-w-[1100px] mx-auto px-14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div
                className="relative rounded-[20px] overflow-hidden"
                style={{ aspectRatio: "21/9", background: C.bgDeep, marginTop: 48 }}
              >
                <img
                  src={post.img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </section>
        )}

        {/* ── Body ─────────────────────────────────────────────────── */}
        <section style={{ padding: "72px 0 140px" }}>
          <div className="max-w-[720px] mx-auto px-14">
            {post.body ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <BodyContent body={post.body} />
              </motion.div>
            ) : (
              <div
                style={{
                  padding: "48px 40px",
                  borderRadius: 16,
                  border: `1px solid ${C.border}`,
                  background: C.bgSoft,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontSize: 32,
                    color: C.gold,
                    marginBottom: 12,
                    fontStyle: "italic",
                  }}
                >
                  Em breve
                </div>
                <p style={{ color: C.dimS, fontSize: 15, lineHeight: 1.6 }}>
                  O conteúdo completo deste artigo está a ser preparado. Volte em breve.
                </p>
              </div>
            )}

            {/* Divider + back */}
            <div
              style={{
                marginTop: 64,
                paddingTop: 40,
                borderTop: `1px solid ${C.border}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-[14px] font-[500] transition-all duration-200"
                style={{ color: C.gold, textDecoration: "none" }}
              >
                <ArrowLeft size={14} />
                Todos os artigos
              </Link>

              <div className="flex items-center gap-[10px]" style={{ color: C.dim, fontSize: 12 }}>
                <div
                  className="w-[26px] h-[26px] rounded-full flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${C.goldDeep}, ${C.gold})`,
                    fontFamily: '"Instrument Serif", serif',
                    fontSize: 11, color: "white", fontStyle: "italic",
                  }}
                >
                  f
                </div>
                Fernando Oliveira
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer compact />
    </div>
  );
}
