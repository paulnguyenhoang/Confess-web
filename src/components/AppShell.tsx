import { ReactNode } from "react";
import "../styles/tailwind.css";
import "../styles/theme.css";

interface AppShellProps {
  children: ReactNode;
}

// Layout wrapper với background gradient
export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div className="app-background min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">{children}</div>
    </div>
  );
};
