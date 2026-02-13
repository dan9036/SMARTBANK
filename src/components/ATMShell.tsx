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
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="w-14 h-14 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center shadow-lg shadow-primary/10">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-mono glow-text tracking-wider">
            SMARTBANK <span className="text-muted-foreground text-lg">ATM</span>
          </h1>
        </div>

        {/* ATM Screen */}
        <div className="atm-screen rounded-2xl p-6 min-h-[480px] flex flex-col scanline relative overflow-hidden">
          <div className="relative z-10 flex-1 flex flex-col animate-fade-in">
            {children}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ATMShell;
