import { Link } from "react-router-dom";
import { MessageSquare, FileText, Star, Tag } from "lucide-react";
import { store } from "../data/store";
import { useTheme } from "./theme";

export default function Dashboard() {
  const T = useTheme();
  const testimonials = store.getTestimonials();
  const posts = store.getPosts();
  const featured = posts.filter((p) => p.featured).length;

  const catCounts = posts.reduce<Record<string, number>>((acc, p) => {
    acc[p.catLabel] = (acc[p.catLabel] ?? 0) + 1;
    return acc;
  }, {});

  const stats = [
    { label: "Testemunhos", value: testimonials.length, icon: MessageSquare, href: "/admin/testimonials" },
    { label: "Artigos",     value: posts.length,        icon: FileText,      href: "/admin/posts" },
    { label: "Em destaque", value: featured,            icon: Star,          href: "/admin/posts" },
  ];

  const card: React.CSSProperties = {
    padding: "24px 28px", borderRadius: 14, background: T.surface,
    border: `1px solid ${T.border}`, cursor: "pointer",
    transition: "border-color 200ms, box-shadow 200ms",
    boxShadow: T.shadow, textDecoration: "none",
  };

  return (
    <div>
      <h1 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 36, color: T.text, marginBottom: 6, letterSpacing: "-0.02em" }}>
        Dashboard
      </h1>
      <p style={{ color: T.faint, fontSize: 13, marginBottom: 40 }}>Bem-vindo ao painel de administração.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 40 }}>
        {stats.map(({ label, value, icon: Icon, href }) => (
          <Link key={label} to={href} style={{ textDecoration: "none" }}>
            <div
              style={card}
              onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = T.accent; el.style.boxShadow = `0 0 0 3px ${T.accentBg}`; }}
              onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = T.border; el.style.boxShadow = T.shadow; }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: T.accentBg, border: `1px solid ${T.accentBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={16} style={{ color: T.accent }} />
              </div>
              <div style={{ marginTop: 16, fontSize: 40, fontFamily: '"Instrument Serif", serif', color: T.text, lineHeight: 1 }}>
                {value}
              </div>
              <div style={{ marginTop: 4, fontSize: 12, color: T.faint, letterSpacing: "0.06em" }}>{label}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, padding: "24px 28px", boxShadow: T.shadow }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <Tag size={14} style={{ color: T.accent }} />
          <span style={{ fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, fontWeight: 500 }}>
            Artigos por categoria
          </span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {Object.entries(catCounts).map(([cat, count]) => (
            <div
              key={cat}
              style={{ padding: "7px 14px", borderRadius: 999, background: T.accentBg, border: `1px solid ${T.border}`, fontSize: 12, color: T.muted, display: "flex", alignItems: "center", gap: 6 }}
            >
              <span>{cat}</span>
              <span style={{ color: T.accent, fontWeight: 600 }}>{count}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        {[
          { label: "Adicionar testemunho", href: "/admin/testimonials" },
          { label: "Adicionar artigo",     href: "/admin/posts" },
        ].map(({ label, href }) => (
          <Link
            key={href} to={href}
            style={{
              padding: "10px 20px", borderRadius: 999, fontSize: 12, fontWeight: 600,
              background: `linear-gradient(135deg, ${T.accentDeep}, ${T.accent})`,
              color: "white", textDecoration: "none",
            }}
          >
            {label} →
          </Link>
        ))}
      </div>
    </div>
  );
}
