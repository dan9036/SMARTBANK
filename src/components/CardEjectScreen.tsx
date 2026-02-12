import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";

interface CardEjectScreenProps {
  onComplete: () => void;
}

const CardEjectScreen = ({ onComplete }: CardEjectScreenProps) => {
  const [phase, setPhase] = useState<"ejecting" | "waiting" | "done">("ejecting");

  useEffect(() => {
    setTimeout(() => setPhase("waiting"), 800);
    setTimeout(() => setPhase("done"), 2200);
    setTimeout(() => onComplete(), 2800);
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8">
      <h2 className="text-lg font-semibold text-foreground font-mono tracking-wider">
        {phase === "ejecting" ? "LOGGING OUT..." : "PLEASE TAKE YOUR CARD"}
      </h2>

      {/* Card slot visual */}
      <div className="relative w-48 h-32 flex items-end justify-center">
        {/* The card */}
        <div
          className={`absolute w-36 h-24 rounded-lg border-2 border-primary/60 bg-gradient-to-br from-secondary to-muted flex items-center justify-center transition-all duration-700 ease-in-out ${
            phase === "ejecting"
              ? "bottom-24 opacity-0 scale-90"
              : phase === "waiting"
              ? "bottom-0 opacity-100 scale-100"
              : "bottom-[-4rem] opacity-0 scale-95"
          }`}
        >
          <CreditCard className="w-10 h-10 text-primary/70" />
          <div className="absolute top-2 left-3 w-6 h-4 rounded-sm bg-[hsl(var(--atm-gold))] opacity-80" />
        </div>

        {/* The slot */}
        <div className="absolute bottom-20 w-44 h-1.5 bg-primary/30 rounded-full shadow-[0_0_12px_hsl(var(--primary)/0.3)]" />
      </div>

      {phase === "waiting" && (
        <div className="flex items-center gap-2 text-sm text-[hsl(var(--atm-gold))] animate-fade-in font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-[hsl(var(--atm-gold))] animate-pulse" />
          Remove your card
        </div>
      )}

      <p className="text-xs text-muted-foreground text-center font-mono">
        Thank you for using SECURE ATM
      </p>
    </div>
  );
};

export default CardEjectScreen;
