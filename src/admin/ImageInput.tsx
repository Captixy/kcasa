import { useRef, useState } from "react";
import { Upload, Link as LinkIcon } from "lucide-react";
import { useTheme } from "./theme";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  aspectRatio?: "square" | "wide";
}

export default function ImageInput({ label, value, onChange, aspectRatio = "wide" }: Props) {
  const T = useTheme();
  const [mode, setMode] = useState<"url" | "upload">(value.startsWith("data:") ? "upload" : "url");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result as string);
    reader.readAsDataURL(file);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", borderRadius: 10, boxSizing: "border-box",
    background: T.raised, border: `1px solid ${T.border}`,
    color: T.text, fontSize: 13, fontFamily: "inherit", outline: "none",
  };

  const tabBtn = (active: boolean): React.CSSProperties => ({
    display: "flex", alignItems: "center", gap: 5,
    padding: "4px 10px", borderRadius: 6, border: 0, cursor: "pointer",
    fontSize: 11, fontFamily: "inherit", fontWeight: 500,
    background: active ? T.accentBg : "transparent",
    color: active ? T.accent : T.faint,
    transition: "all 150ms",
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <label style={{ fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, fontWeight: 500 }}>
          {label}
        </label>
        <div style={{ display: "flex", gap: 2, background: T.raised, borderRadius: 8, padding: 2 }}>
          <button type="button" style={tabBtn(mode === "url")} onClick={() => setMode("url")}>
            <LinkIcon size={11} /> URL
          </button>
          <button type="button" style={tabBtn(mode === "upload")} onClick={() => setMode("upload")}>
            <Upload size={11} /> Upload
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <input
          value={value.startsWith("data:") ? "" : value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          style={inputStyle}
          onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
          onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
        />
      ) : (
        <>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            style={{ ...inputStyle, cursor: "pointer", textAlign: "left", color: value.startsWith("data:") ? T.muted : T.faint, display: "flex", alignItems: "center", gap: 8 }}
          >
            <Upload size={14} style={{ color: T.accent, flexShrink: 0 }} />
            {value.startsWith("data:") ? "Imagem carregada — clique para substituir" : "Escolher ficheiro…"}
          </button>
        </>
      )}

      {value && (
        <div style={{ marginTop: 10, display: "flex", alignItems: "flex-start", gap: 10 }}>
          <img
            src={value} alt=""
            style={{ width: aspectRatio === "square" ? 52 : 96, height: 52, objectFit: "cover", borderRadius: 8, border: `1px solid ${T.border}`, flexShrink: 0 }}
          />
          <button
            type="button" onClick={() => onChange("")}
            style={{ fontSize: 11, color: T.faint, background: "none", border: 0, cursor: "pointer", padding: 0, marginTop: 2, fontFamily: "inherit" }}
          >
            Remover
          </button>
        </div>
      )}
    </div>
  );
}
