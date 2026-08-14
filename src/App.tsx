// src/App.tsx
// Route table — the only file in the codebase that knows the URL map.
// To find out what pages exist, read this file.

import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import ItemsPage from "./pages/ItemsPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import LoginPage from "./pages/LoginPage";
import ClaimsPage from "./pages/ClaimsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Layout renders the nav bar; every child fills its <Outlet /> */}
      <Route path="/" element={<Layout />}>
        {/* index = the default child shown at '/' */}
        <Route index element={<DashboardPage />} />

        {/* /items — searchable grid of lost & found items */}
        <Route path="items" element={<ItemsPage />} />

        {/* /items/:id — detail page; id is a URL parameter */}
        <Route path="items/:id" element={<ItemDetailPage />} />

        {/* /login — anyone can reach this */}
        <Route path="login" element={<LoginPage />} />

        {/* ProtectedRoute: pathless guard; redirects to /login when token is null */}
        <Route element={<ProtectedRoute />}>
          <Route path="claims" element={<ClaimsPage />} />
        </Route>

        {/* Catch-all: no URL gives a blank page */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;