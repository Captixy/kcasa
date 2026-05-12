import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Building2 } from "lucide-react";
import { store, newId } from "../data/store";
import type { Partner } from "../data/types";
import { useTheme } from "./theme";
import ImageInput from "./ImageInput";

const EMPTY: Omit<Partner, "id"> = { name: "", img: "" };

function Modal({
  title, data, onSave, onClose,
}: {
  title: string; data: Omit<Partner, "id">;
  onSave: (d: Omit<Partner, "id">) => void; onClose: () => void;
}) {
  const T = useTheme();
  const [form, setForm] = useState(data);
  const set = (k: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement>) =>
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
      <div style={{ width: 480, maxWidth: "calc(100vw - 32px)", maxHeight: "90vh", overflowY: "auto", background: T.surface, borderRadius: 18, border: `1px solid ${T.border}`, padding: "32px 32px 28px", boxShadow: T.mode === "light" ? "0 16px 48px oklch(0.4 0.01 250 / 0.15)" : "none" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 24, color: T.text, margin: 0 }}>{title}</h2>
          <button onClick={onClose} style={{ background: "none", border: 0, cursor: "pointer", color: T.faint, padding: 4 }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>Nome do parceiro</label>
            <input value={form.name} onChange={set("name")} required style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = T.border)} />
          </div>

          <ImageInput label="Logo do parceiro" value={form.img} onChange={(v) => setForm((f) => ({ ...f, img: v }))} />

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

export default function Partners() {
  const T = useTheme();
  const [items, setItems] = useState<Partner[]>(store.getPartners);
  const [modal, setModal] = useState<{ mode: "add" } | { mode: "edit"; item: Partner } | null>(null);

  const persist = (next: Partner[]) => { setItems(next); store.setPartners(next); };

  const handleSave = (data: Omit<Partner, "id">) => {
    if (modal?.mode === "add") persist([...items, { id: newId(), ...data }]);
    else if (modal?.mode === "edit") persist(items.map((p) => (p.id === modal.item.id ? { ...modal.item, ...data } : p)));
    setModal(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Eliminar este parceiro?")) persist(items.filter((p) => p.id !== id));
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: '"Instrument Serif", serif', fontSize: 36, color: T.text, marginBottom: 4, letterSpacing: "-0.02em" }}>Parceiros</h1>
          <p style={{ color: T.faint, fontSize: 13 }}>{items.length} parceiro{items.length !== 1 ? "s" : ""}</p>
        </div>
        <button onClick={() => setModal({ mode: "add" })}
          style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 18px", borderRadius: 999, border: 0, cursor: "pointer", fontFamily: "inherit", background: `linear-gradient(135deg, ${T.accentDeep}, ${T.accent})`, color: "white", fontSize: 13, fontWeight: 600 }}>
          <Plus size={14} /> Adicionar
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((p) => (
          <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 24px", background: T.surface, borderRadius: 14, border: `1px solid ${T.border}`, boxShadow: T.shadow }}>
            {p.img ? (
              <img src={p.img} alt={p.name} style={{ width: 180, height: 56, borderRadius: 8, objectFit: "contain", flexShrink: 0, border: `1px solid ${T.border}`, background: T.raised }} />
            ) : (
              <div style={{ width: 180, height: 56, borderRadius: 8, flexShrink: 0, background: T.raised, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: T.faint }}>
                <Building2 size={18} />
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{ fontSize: 14, fontWeight: 500, color: T.text }}>{p.name}</span>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <button onClick={() => setModal({ mode: "edit", item: p })}
                style={{ padding: 8, borderRadius: 8, border: `1px solid ${T.border}`, background: "transparent", cursor: "pointer", color: T.muted }} title="Editar">
                <Pencil size={14} />
              </button>
              <button onClick={() => handleDelete(p.id)}
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
          title={modal.mode === "add" ? "Novo parceiro" : "Editar parceiro"}
          data={modal.mode === "edit" ? { name: modal.item.name, img: modal.item.img } : EMPTY}
          onSave={handleSave} onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
