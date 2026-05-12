import { useState } from "react";
import {
  Plus, Pencil, Trash2, X, Check, Search,
  Home, Key, Shield, ArrowLeftRight, Ruler, TrendingUp,
  Building, Search as SearchIcon, Handshake, BarChart3,
  Calculator, ClipboardCheck, FileText, CreditCard, PiggyBank,
  Wallet, Building2, MapPin, Phone, Mail, CheckCircle, Star, Award,
  Users, Briefcase, Globe, Heart, ThumbsUp, Sparkles, Zap,
  Landmark, Scale, Percent, BadgePercent, ClipboardList,
  type LucideIcon,
} from "lucide-react";
import { store, newId } from "../data/store";
import type { Service } from "../data/types";
import { useTheme } from "./theme";

const ICONS: { name: string; Icon: LucideIcon }[] = [
  { name: "Home", Icon: Home },
  { name: "Key", Icon: Key },
  { name: "Shield", Icon: Shield },
  { name: "ArrowLeftRight", Icon: ArrowLeftRight },
  { name: "Ruler", Icon: Ruler },
  { name: "TrendingUp", Icon: TrendingUp },
  { name: "Building", Icon: Building },
  { name: "Search", Icon: SearchIcon },
  { name: "Handshake", Icon: Handshake },
  { name: "BarChart3", Icon: BarChart3 },
  { name: "Calculator", Icon: Calculator },
  { name: "ClipboardCheck", Icon: ClipboardCheck },
  { name: "FileText", Icon: FileText },
  { name: "CreditCard", Icon: CreditCard },
  { name: "PiggyBank", Icon: PiggyBank },
  { name: "Wallet", Icon: Wallet },
  { name: "Building2", Icon: Building2 },
  { name: "Landmark", Icon: Landmark },
  { name: "MapPin", Icon: MapPin },
  { name: "Phone", Icon: Phone },
  { name: "Mail", Icon: Mail },
  { name: "CheckCircle", Icon: CheckCircle },
  { name: "Star", Icon: Star },
  { name: "Award", Icon: Award },
  { name: "Users", Icon: Users },
  { name: "Briefcase", Icon: Briefcase },
  { name: "Globe", Icon: Globe },
  { name: "Heart", Icon: Heart },
  { name: "ThumbsUp", Icon: ThumbsUp },
  { name: "Sparkles", Icon: Sparkles },
  { name: "Zap", Icon: Zap },
  { name: "Scale", Icon: Scale },
  { name: "Percent", Icon: Percent },
  { name: "BadgePercent", Icon: BadgePercent },
  { name: "ClipboardList", Icon: ClipboardList },
];

function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const T = useTheme();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selected = ICONS.find((i) => i.name === value);
  const filtered = ICONS.filter((i) => i.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ position: "relative" }}>
      <label style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6, display: "block" }}>
        Ícone
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "11px 14px", borderRadius: 10,
          background: T.raised, border: `1px solid ${open ? T.accent : T.border}`,
          color: T.text, fontSize: 13, fontFamily: "inherit", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 10,
        }}
      >
        {selected ? (
          <>
            <selected.Icon size={18} style={{ color: T.accent }} />
            {selected.name}
          </>
        ) : (
          <span style={{ color: T.faint }}>Escolher ícone…</span>
        )}
      </button>

      {open && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 50 }}
            onClick={() => setOpen(false)}
          />
          <div
            style={{
              position: "absolute", top: "100%", left: 0, right: 0, zIndex: 51,
              marginTop: 6, background: T.surface, borderRadius: 12,
              border: `1px solid ${T.border}`, padding: 12,
              boxShadow: "0 16px 48px oklch(0.1 0.01 250 / 0.5)",
              maxHeight: 320, overflow: "hidden", display: "flex", flexDirection: "column",
            }}
          >
            <div style={{ position: "relative", marginBottom: 10, flexShrink: 0 }}>
              <Search size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: T.faint }} />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pesquisar…"
                autoFocus
                style={{
                  width: "100%", padding: "9px 12px 9px 34px", borderRadius: 8,
                  background: T.raised, border: `1px solid ${T.border}`,
                  color: T.text, fontSize: 13, fontFamily: "inherit", outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
                onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
              />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 6, overflowY: "auto", flex: 1 }}>
              {filtered.map(({ name, Icon }) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => { onChange(name); setOpen(false); }}
                  title={name}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    padding: "8px 4px", borderRadius: 8, border: 0,
                    background: name === value ? T.accentBg : "transparent",
                    cursor: "pointer", color: name === value ? T.accent : T.muted,
                    fontFamily: "inherit", fontSize: 10,
                    transition: "all 150ms",
                  }}
                  onMouseEnter={(e) => { if (name !== value) (e.currentTarget as HTMLButtonElement).style.background = T.raised; }}
                  onMouseLeave={(e) => { if (name !== value) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                >
                  <Icon size={20} />
                  <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%" }}>{name}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const EMPTY: Omit<Service, "id"> = { iconName: "Home", title: "", desc: "", details: "", link: "", tag: "" };

function Modal({
  title, data, onSave, onClose,
}: {
  title: string; data: Omit<Service, "id">;
  onSave: (d: Omit<Service, "id">) => void; onClose: () => void;
}) {
  const T = useTheme();
  const [form, setForm] = useState(data);
  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 10, boxSizing: "border-box",
    background: T.raised, border: `1px solid ${T.border}`,
    color: T.text, fontSize: 13, fontFamily: "inherit", outline: "none",
  };

  return (
    <div
      style={{ position: "fixed", inset: 0, background: "oklch(0.1 0.01 250 / 0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width: 520, maxWidth: "calc(100vw - 32px)", maxHeight: "90vh", overflowY: "auto", background: T.surface, borderRadius: 18, border: `1px solid ${T.border}`, padding: "32px 32px 28px", boxShadow: T.mode === "light" ? "0 16px 48px oklch(0.4 0.01 250 / 0.15)" : "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, color: T.text, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: 0, cursor: "pointer", color: T.faint, padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {([
            { key: "title" as const, label: "Título" },
            { key: "desc" as const, label: "Descrição", multi: true },
          ]).map(({ key, label, multi }) => (
            <div key={key}>
              <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>{label}</label>
              {multi ? (
                <textarea value={form[key]} onChange={set(key)} required rows={2} style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = T.border)} />
              ) : (
                <input value={form[key]} onChange={set(key)} required style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
                  onBlur={(e) => (e.currentTarget.style.borderColor = T.border)} />
              )}
            </div>
          ))}
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>Conteúdo detalhado (opcional)</label>
            <textarea value={form.details ?? ""} onChange={set("details")} rows={4} style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = T.border)} />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>Link (opcional)</label>
            <input value={form.link ?? ""} onChange={set("link")} placeholder="https://..."
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = T.border)} />
          </div>

          <IconPicker value={form.iconName} onChange={(v) => setForm((f) => ({ ...f, iconName: v }))} />

          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>Etiqueta (opcional)</label>
            <input value={form.tag} onChange={set("tag")} placeholder='ex: "Popular"'
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = T.border)} />
          </div>

          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
            <button type="button" onClick={onClose}
              style={{ padding: "10px 20px", borderRadius: 999, border: `1px solid ${T.border}`, background: "transparent", color: T.muted, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>
              Cancelar
            </button>
            <button type="submit"
              style={{ padding: "10px 20px", borderRadius: 999, border: 0, background: `linear-gradient(135deg, ${T.accentDeep}, ${T.accent})`, color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
              <Check size={14} /> Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const found = ICONS.find((i) => i.name === name);
  if (!found) return <Home size={20} />;
  return <found.Icon size={20} />;
}

export default function Services() {
  const T = useTheme();
  const [items, setItems] = useState<Service[]>(store.getServices);
  const [modal, setModal] = useState<{ mode: "add" } | { mode: "edit"; item: Service } | null>(null);

  const persist = (next: Service[]) => { setItems(next); store.setServices(next); };

  const handleSave = (data: Omit<Service, "id">) => {
    if (modal?.mode === "add") persist([...items, { id: newId(), ...data }]);
    else if (modal?.mode === "edit") persist(items.map((s) => (s.id === modal.item.id ? { ...modal.item, ...data } : s)));
    setModal(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Eliminar este serviço?")) persist(items.filter((s) => s.id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 36, color: T.text, marginBottom: 4, letterSpacing: "-0.02em" }}>Serviços</h1>
          <p style={{ color: T.faint, fontSize: 13 }}>{items.length} serviço{items.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => setModal({ mode: "add" })}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 999, border: 0, cursor: "pointer", fontFamily: "inherit", background: `linear-gradient(135deg, ${T.accentDeep}, ${T.accent})`, color: "white", fontSize: 13, fontWeight: 600 }}>
          <Plus size={14} /> Adicionar
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((s) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 24px", background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: T.accentBg, border: `1px solid ${T.accentBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: T.accent,
            }}>
              <ServiceIcon name={s.iconName} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 14, fontWeight: 500, color: T.text }}>{s.title}</span>
                {s.tag && (
                  <span style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, background: T.accentBg, padding: "2px 8px", borderRadius: 999 }}>
                    {s.tag}
                  </span>
                )}
              </div>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <button onClick={() => setModal({ mode: "edit", item: s })}
                style={{ padding: 8, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", color: T.muted }} title="Editar">
                <Pencil size={14} />
              </button>
              <button onClick={() => handleDelete(s.id)}
                style={{ padding: 8, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", color: T.muted }} title="Eliminar"
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = T.danger; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = T.muted; }}>
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {modal && (
        <Modal
          title={modal.mode === "add" ? "Novo serviço" : "Editar serviço"}
          data={modal.mode === "edit" ? { iconName: modal.item.iconName, title: modal.item.title, desc: modal.item.desc, details: modal.item.details ?? "", link: modal.item.link ?? "", tag: modal.item.tag ?? "" } : EMPTY}
          onSave={handleSave} onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
