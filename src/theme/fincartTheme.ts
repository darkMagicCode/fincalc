import { createTheme } from "@mui/material/styles";

/**
 * Fincart-inspired logistics palette: navy primary, orange accent.
 */
export const fincartTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0B2A4A", contrastText: "#FFFFFF" },
    secondary: { main: "#E85D04", contrastText: "#0B0B0B" },
    success: { main: "#1B7F5A" },
    info: { main: "#1565C0" },
    background: { default: "#F4F6F8", paper: "#FFFFFF" },
    text: { primary: "#0F172A", secondary: "#475569" },
  },
  typography: {
    fontFamily:
      '"Inter", "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: "1.75rem", lineHeight: 1.2, letterSpacing: "-0.02em" },
    h2: { fontWeight: 600, fontSize: "1.25rem", lineHeight: 1.3 },
    subtitle1: { fontWeight: 600, fontSize: "1rem" },
    overline: { fontWeight: 600, letterSpacing: "0.08em" },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: {
      styleOverrides: { root: { textTransform: "none", fontWeight: 600 } },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: "1px solid",
          borderColor: "rgba(15, 23, 42, 0.08)",
        },
      },
    },
  },
});
