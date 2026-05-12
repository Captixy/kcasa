import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../data/store";
import { Wordmark } from "../shared";
import { useTheme } from "./theme";

export default function Login() {
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(false);
  const nav = useNavigate();
  const T = useTheme();

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 10, boxSizing: "border-box",
    background: T.raised, border: `1px solid ${T.border}`,
    color: T.text, fontSize: 14, fontFamily: "inherit", outline: "none",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: T.bg }}>
      <div
        style={{
          width: 380, padding: "40px 36px", borderRadius: 20,
          background: T.surface, border: `1px solid ${T.border}`,
          boxShadow: T.mode === "light" ? "0 8px 40px oklch(0.4 0.01 250 / 0.12)" : "0 24px 64px oklch(0.1 0.01 250 / 0.5)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <Wordmark textColor={T.text} />
          <p style={{ marginTop: 8, fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: T.faint }}>
            Backoffice
          </p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setErr(false); if (auth.login(user, pw)) nav("/admin"); else setErr(true); }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>
              Utilizador
            </label>
            <input value={user} onChange={(e) => setUser(e.target.value)} placeholder="admin" required autoComplete="username" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: T.faint, marginBottom: 6 }}>
              Palavra-passe
            </label>
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••" required autoComplete="current-password" style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = T.accent)}
              onBlur={(e) => (e.currentTarget.style.borderColor = T.border)}
            />
          </div>
          {err && <p style={{ fontSize: 12, color: T.danger, margin: 0 }}>Credenciais incorretas.</p>}
          <button
            type="submit"
            style={{
              marginTop: 8, padding: "13px 0", borderRadius: 10, border: 0,
              background: `linear-gradient(135deg, ${T.accentDeep}, ${T.accent})`,
              color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}
          >
            Entrar →
          </button>
        </form>

        <p style={{ marginTop: 20, textAlign: "center", fontSize: 11, color: T.faint }}>
          Modo: <button onClick={T.toggle} style={{ background: "none", border: 0, color: T.accent, fontSize: 11, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
            {T.mode === "dark" ? "☀ Claro" : "☾ Escuro"}
          </button>
        </p>
      </div>

    </div>
  );
}
