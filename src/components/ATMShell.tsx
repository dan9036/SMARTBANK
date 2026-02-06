import { ReactNode } from "react";
import { CreditCard } from "lucide-react";

interface ATMShellProps {
  children: ReactNode;
}

const ATMShell = ({ children }: ATMShellProps) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* ATM Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <CreditCard className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold font-mono glow-text tracking-wider">
            SECURE ATM
          </h1>
        </div>

        {/* ATM Screen */}
        <div className="atm-screen rounded-2xl p-6 min-h-[480px] flex flex-col scanline relative overflow-hidden">
          <div className="relative z-10 flex-1 flex flex-col animate-fade-in">
            {children}
          </div>
        </div>

        {/* ATM Footer */}
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            Demo PIN: <span className="gold-text">1234</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ATMShell;
