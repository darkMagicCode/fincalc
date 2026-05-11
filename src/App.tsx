import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QuoteProvider } from "@/context/QuoteContext";
import { QuotePage } from "@/pages/QuotePage";
import { fincartTheme } from "@/theme/fincartTheme";

const DemoShowcasePage = lazy(async () => {
  const mod = await import("@/pages/DemoShowcasePage");
  return { default: mod.DemoShowcasePage };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2 },
    mutations: { retry: 0 },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={fincartTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <QuoteProvider>
                  <QuotePage />
                </QuoteProvider>
              }
            />
            <Route
              path="/demo"
              element={
                <Suspense
                  fallback={
                    <CircularProgress sx={{ display: "block", mx: "auto", my: 6 }} />
                  }
                >
                  <DemoShowcasePage />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
