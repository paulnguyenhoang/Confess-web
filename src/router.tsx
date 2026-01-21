import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { ConfessPage } from "./pages/ConfessPage";
import { CelebrationPage } from "./pages/CelebrationPage";

// Router configuration
const router = createBrowserRouter([
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
