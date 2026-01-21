import { createHashRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ConfessPage } from "./pages/ConfessPage";
import { CelebrationPage } from "./pages/CelebrationPage";

// Router configuration - Hash Router for GitHub Pages
const router = createHashRouter([
  {
    path: "/",
    element: (
      <AppShell>
        <ConfessPage />
      </AppShell>
    ),
  },
  {
    path: "/yay",
    element: (
      <AppShell>
        <CelebrationPage />
      </AppShell>
    ),
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
