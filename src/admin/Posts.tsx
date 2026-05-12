import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Star, Tag } from "lucide-react";
import { store, newId } from "../data/store";
import type { Post, Category } from "../data/types";
import { useTheme } from "./theme";
import ImageInput from "./ImageInput";

type PostForm = Omit<Post, "id">;

function buildEmpty(cats: Category[]): PostForm {
  const first = cats[0] ?? { id: "", label: "" };
  return {
    cat: first.id, catLabel: first.label, title: "", excerpt: "",
    date: new Date().toLocaleDateString("pt-PT", { day: "2-digit", month: "short", year: "numeric" }),
    read: "5 min", img: "", featured: false, body: "",
  };
}

// ─── Category modal ───────────────────────────────────────────────────────────

function CatsModal({ onClose, onChanged }: { onClose: () => void; onChanged: (c: Category[]) => void }) {
  const T = useTheme();
  const [cats, setCats] = useState<Category[]>(store.getCategories());
  const [input, setInput] = useState("");

  const persist = (next: Category[]) => { setCats(next); store.setCategories(next); onChanged(next); };

  const add = () => {
    const label = input.trim();
    if (!label) return;
    const id = label.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
    if (cats.some((c) => c.id === id)) return;
    persist([...cats, { id, label }]);
    setInput("");
  };

  const inputStyle: React.CSSProperties = {
    flex: 1, padding: "10px 14px", borderRadius: 10, boxSizing: "border-box",
    background: T.raised, border: `1px solid ${T.border}`,
    color: T.text, fontSize: 13, fontFamily: "inherit", outline: "none",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "oklch(0.1 0.01 250 / 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: 420, background: T.surface, borderRadius: 18, border: `1px solid ${T.border}`, padding: "32px 32px 28px", boxShadow: T.mode === "light" ? "0 16px 48px oklch(0.4 0.01 250 / 0.15)" : "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, color: T.text, margin: 0 }}>Categorias</h2>
          <button onClick={onClose} style={{ background: "none", border: 0, cursor: "pointer", color: T.faint, padding: 4 }}><X size={18} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
          {cats.map((c) => {
            const count = store.getPosts().filter((p) => p.cat === c.id).length;
            return (
              <div key={c.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, background: T.raised, border: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 13, color: T.text }}>{c.label}</span>
                  <span style={{ fontSize: 11, color: T.faint }}>({count})</span>
                </div>
                <button onClick={() => {
                  const n = store.getPosts().filter((p) => p.cat === c.id).length;
                  if (n > 0 && !confirm(`Esta categoria tem ${n} artigo(s). Eliminar mesmo assim?`)) return;
                  persist(cats.filter((x) => x.id !== c.id));
                }} style={{ background: "none", border: 0, cursor: "pointer", color: T.faint, padding: 4 }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = T.danger)}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = T.faint)}>
                  <Trash2 size={13} />
                </button>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Nova categoria…" style={inputStyle}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); add(); } }}
            onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
            onBlur={(e) => (e.currentTarget.style.borderColor = T.border)} />
          <button onClick={add} style={{ padding: "10px 16px", borderRadius: 10, border: 0, cursor: "pointer", background: `linear-gradient(135deg, ${T.accentDeep}, ${T.accent})`, color: "white", fontSize: 13, fontWeight: 600, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={14} /> Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Post modal ───────────────────────────────────────────────────────────────

function Modal({ title, data, cats, onSave, onClose }: { title: string; data: PostForm; cats: Category[]; onSave: (d: PostForm) => void; onClose: () => void }) {
  const T = useTheme();
  const [form, setForm] = useState<PostForm>(data);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 10, boxSizing: "border-box",
    background: T.raised, border: `1px solid ${T.border}`,
    color: T.text, fontSize: 13, fontFamily: "inherit", outline: "none",
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "oklch(0.1 0.01 250 / 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)", overflowY: "auto", padding: "40px 0" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: 560, background: T.surface, borderRadius: 18, border: `1px solid ${T.border}`, padding: "32px 32px 28px", boxShadow: T.mode === "light" ? "0 16px 48px oklch(0.4 0.01 250 / 0.15)" : "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, color: T.text, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: 0, cursor: "pointer", color: T.faint, padding: 4 }}><X size={18} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Category */}
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>Categoria</label>
            <select value={form.cat} onChange={(e) => { const c = cats.find((x) => x.id === e.target.value); if (c) setForm((f) => ({ ...f, cat: c.id, catLabel: c.label })); }}
              style={{ ...inputStyle, cursor: "pointer" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}>
              {cats.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          {/* Title */}
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>Título</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} required style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = T.border)} />
          </div>
          {/* Excerpt */}
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>Resumo</label>
            <textarea value={form.excerpt} onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} required rows={2} style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = T.border)} />
          </div>
          {/* Date + read */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {(["date", "read"] as const).map((key) => (
              <div key={key}>
                <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>{key === "date" ? "Data" : "Tempo de leitura"}</label>
                <input value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} required placeholder={key === "read" ? "7 min" : undefined} style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = T.border)} />
              </div>
            ))}
          </div>
          <ImageInput label="Imagem do artigo" value={form.img} onChange={(v) => setForm((f) => ({ ...f, img: v }))} aspectRatio="wide" />
          {/* Body */}
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>Conteúdo do artigo</label>
            <textarea value={form.body ?? ""} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))} rows={8} placeholder={"Escreva o artigo aqui. Separe parágrafos com uma linha em branco.\n\nSuporta múltiplos parágrafos."} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = T.border)} />
          </div>
          {/* Featured */}
          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none" }}>
            <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0, background: form.featured ? `linear-gradient(135deg, ${T.accentDeep}, ${T.accent})` : T.raised, border: `1px solid ${form.featured ? T.accent : T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}
              onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}>
              {form.featured && <Check size={11} color="white" />}
            </div>
            <span style={{ fontSize: 13, color: T.muted }}>Marcar como artigo em destaque</span>
          </label>
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
            <button type="button" onClick={onClose} style={{ padding: "10px 20px", borderRadius: 999, border: `1px solid ${T.border}`, background: "transparent", color: T.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>Cancelar</button>
            <button type="submit" style={{ padding: "10px 20px", borderRadius: 999, border: 0, background: `linear-gradient(135deg, ${T.accentDeep}, ${T.accent})`, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
              <Check size={14} /> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Posts page ───────────────────────────────────────────────────────────────

export default function Posts() {
  const T = useTheme();
  const [cats, setCats] = useState<Category[]>(store.getCategories);
  const [items, setItems] = useState<Post[]>(store.getPosts);
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState<{ mode: "add" } | { mode: "edit"; item: Post } | null>(null);
  const [showCats, setShowCats] = useState(false);

  const persist = (next: Post[]) => { setItems(next); store.setPosts(next); };
  const handleSave = (data: PostForm) => {
    if (modal?.mode === "add") persist([{ id: newId(), ...data }, ...items]);
    else if (modal?.mode === "edit") persist(items.map((p) => (p.id === modal.item.id ? { ...modal.item, ...data } : p)));
    setModal(null);
  };
  const handleDelete = (id: string) => { if (confirm("Eliminar este artigo?")) persist(items.filter((p) => p.id !== id)); };
  const toggleFeatured = (id: string) => persist(items.map((p) => ({ ...p, featured: p.id === id ? !p.featured : p.featured })));
  const visible = filter === "all" ? items : items.filter((p) => p.cat === filter);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 36, color: T.text, marginBottom: 4, letterSpacing: "-0.02em" }}>Artigos</h1>
          <p style={{ color: T.faint, fontSize: 13 }}>{items.length} artigo{items.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setShowCats(true)} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 16px", borderRadius: 999, border: `1px solid ${T.border}`, cursor: "pointer", background: "transparent", color: T.muted, fontSize: 13, fontFamily: "inherit" }}>
            <Tag size={13} /> Categorias
          </button>
          <button onClick={() => setModal({ mode: "add" })} style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 999, border: 0, cursor: "pointer", fontFamily: "inherit", background: `linear-gradient(135deg, ${T.accentDeep}, ${T.accent})`, color: "white", fontSize: 13, fontWeight: 600 }}>
            <Plus size={14} /> Novo artigo
          </button>
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {[{ id: "all", label: "Todos" }, ...cats].map((c) => (
          <button key={c.id} onClick={() => setFilter(c.id)}
            style={{ padding: "6px 14px", borderRadius: 999, fontSize: 12, fontWeight: 500, border: `1px solid ${filter === c.id ? T.accent : T.border}`, background: filter === c.id ? T.accentBg : "transparent", color: filter === c.id ? T.accent : T.muted, cursor: "pointer", fontFamily: "inherit" }}>
            {c.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, overflow: "hidden", boxShadow: T.shadow }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 80px 80px", padding: "10px 20px", borderBottom: `1px solid ${T.border}`, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: T.faint, fontWeight: 500 }}>
          <span>Título</span><span>Categoria</span><span>Data</span><span>Destaque</span>
          <span style={{ textAlign: "right" }}>Ações</span>
        </div>

        {visible.length === 0 && (
          <div style={{ padding: "40px 20px", textAlign: "center", color: T.faint, fontSize: 13 }}>Sem artigos nesta categoria.</div>
        )}

        {visible.map((p, i) => (
          <div key={p.id} style={{ display: "grid", gridTemplateColumns: "1fr 120px 100px 80px 80px", padding: "14px 20px", alignItems: "center", borderBottom: i < visible.length - 1 ? `1px solid ${T.border}` : undefined }}>
            <div style={{ minWidth: 0, paddingRight: 16 }}>
              <div style={{ fontSize: 13, color: T.text, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.title}</div>
              <div style={{ fontSize: 11, color: T.faint, marginTop: 2 }}>{p.read}</div>
            </div>
            <span style={{ display: "inline-flex", alignSelf: "center", padding: "3px 10px", borderRadius: 999, fontSize: 11, background: T.accentBg, color: T.accent, border: `1px solid ${T.accentBorder}`, whiteSpace: "nowrap" }}>{p.catLabel}</span>
            <span style={{ fontSize: 12, color: T.muted }}>{p.date}</span>
            <button onClick={() => toggleFeatured(p.id)} title={p.featured ? "Remover destaque" : "Marcar como destaque"}
              style={{ background: "none", border: 0, cursor: "pointer", padding: 4, color: p.featured ? T.accent : T.faint }}>
              <Star size={15} fill={p.featured ? T.accent : "none"} />
            </button>
            <div style={{ display: "flex", gap: 6, justifyContent: "flex-end" }}>
              <button onClick={() => setModal({ mode: "edit", item: p })} style={{ padding: 7, borderRadius: 7, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", color: T.muted }}><Pencil size={13} /></button>
              <button onClick={() => handleDelete(p.id)} style={{ padding: 7, borderRadius: 7, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", color: T.muted }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = T.danger)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = T.muted)}>
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal && <Modal title={modal.mode === "add" ? "Novo artigo" : "Editar artigo"} data={modal.mode === "edit" ? modal.item : buildEmpty(cats)} cats={cats} onSave={handleSave} onClose={() => setModal(null)} />}
      {showCats && <CatsModal onClose={() => setShowCats(false)} onChanged={(next) => { setCats(next); setFilter("all"); }} />}
    </div>
  );
}
