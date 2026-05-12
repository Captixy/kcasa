import { useState } from "react";
import { Navigate, Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, MessageSquare, FileText, Briefcase, Building, Handshake, LogOut, Sun, Moon, Globe } from "lucide-react";
import { auth, store, applyTheme } from "../data/store";
import { Wordmark } from "../shared";
import { useTheme } from "./theme";

export function AdminGuard() {
  return auth.check() ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

const NAV = [
  { to: "/admin",              label: "Dashboard",   icon: LayoutDashboard, end: true },
  { to: "/admin/testimonials", label: "Testemunhos", icon: MessageSquare,   end: false },
  { to: "/admin/posts",        label: "Artigos",     icon: FileText,        end: false },
  { to: "/admin/services",     label: "Serviços",    icon: Briefcase,       end: false },
  { to: "/admin/properties",   label: "Imóveis",     icon: Building,        end: false },
  { to: "/admin/partners",     label: "Parceiros",   icon: Handshake,       end: false },
];

export default function AdminLayout() {
  const nav = useNavigate();
  const T = useTheme();
  const [siteTheme, setSiteThemeState] = useState<"dark" | "light">(store.getSiteTheme);

  const toggleSiteTheme = () => {
    const next: "dark" | "light" = siteTheme === "dark" ? "light" : "dark";
    store.setSiteTheme(next);
    setSiteThemeState(next);
    applyTheme(next);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 232, flexShrink: 0, background: T.surface,
          borderRight: `1px solid ${T.border}`,
          display: "flex", flexDirection: "column",
          position: "sticky", top: 0, height: "100vh",
          boxShadow: T.mode === "light" ? "2px 0 8px oklch(0.4 0.01 250 / 0.06)" : "none",
        }}
      >
        <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${T.border}` }}>
          <Wordmark scale={0.82} textColor={T.text} />
          <span style={{ display: "block", marginTop: 6, fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: T.faint }}>
            Backoffice
          </span>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px" }}>
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderRadius: 10, marginBottom: 4,
                fontSize: 13, fontWeight: 500, textDecoration: "none",
                color: isActive ? T.accent : T.muted,
                background: isActive ? T.accentBg : "transparent",
                transition: "all 200ms",
              })}
            >
              <Icon size={15} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: "12px", borderTop: `1px solid ${T.border}` }}>
          {/* Site theme toggle */}
          <div style={{ fontSize: 9, letterSpacing: "0.26em", textTransform: "uppercase", color: T.faint, padding: "4px 14px 2px", marginBottom: 2 }}>
            Site público
          </div>
          <button
            onClick={toggleSiteTheme}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 14px", borderRadius: 10, border: 0, background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: 500, color: T.muted, fontFamily: "inherit", marginBottom: 8 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = T.raised; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            {siteTheme === "dark"
              ? <><Globe size={13} style={{ color: T.accent }} /><Sun size={13} style={{ color: T.accent }} /> Activar modo claro</>
              : <><Globe size={13} style={{ color: T.accent }} /><Moon size={13} style={{ color: T.accent }} /> Activar modo escuro</>
            }
          </button>

          {/* Admin UI theme toggle */}
          <div style={{ fontSize: 9, letterSpacing: "0.26em", textTransform: "uppercase", color: T.faint, padding: "4px 14px 2px", marginBottom: 2 }}>
            Interface
          </div>
          <button
            onClick={T.toggle}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 14px", borderRadius: 10, border: 0, background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: 500, color: T.muted, fontFamily: "inherit", marginBottom: 8 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = T.raised; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            {T.mode === "dark"
              ? <><Sun size={15} style={{ color: T.accent }} /> Modo claro</>
              : <><Moon size={15} style={{ color: T.accent }} /> Modo escuro</>
            }
          </button>

          <button
            onClick={() => { auth.logout(); nav("/admin/login"); }}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "9px 14px", borderRadius: 10, border: 0, background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: 500, color: T.muted, fontFamily: "inherit" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = T.danger; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = T.muted; }}
          >
            <LogOut size={15} />
            Sair
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: "40px 48px", minWidth: 0 }}>
        <Outlet />
      </main>
    </div>
  );
}
