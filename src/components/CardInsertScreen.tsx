import { useState, useEffect } from "react";
import { CreditCard } from "lucide-react";

interface CardInsertScreenProps {
  onComplete: () => void;
}

const CardInsertScreen = ({ onComplete }: CardInsertScreenProps) => {
  const [phase, setPhase] = useState<"idle" | "inserting" | "reading">("idle");

  const handleInsert = () => {
    setPhase("inserting");
    setTimeout(() => setPhase("reading"), 800);
    setTimeout(() => onComplete(), 2000);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-8">
      <h2 className="text-lg font-semibold text-foreground font-mono tracking-wider">
        WELCOME
      </h2>
      <p className="text-sm text-muted-foreground text-center">
        Please insert your card to begin
      </p>

      {/* Card slot visual */}
      <div className="relative w-48 h-32 flex items-end justify-center">
        {/* The card */}
        <div
          className={`absolute w-36 h-24 rounded-lg border-2 border-primary/60 bg-gradient-to-br from-secondary to-muted flex items-center justify-center transition-all duration-700 ease-in-out ${
            phase === "idle"
              ? "bottom-0 opacity-100"
              : phase === "inserting"
              ? "bottom-16 opacity-80"
              : "bottom-24 opacity-0 scale-90"
          }`}
        >
          <CreditCard className="w-10 h-10 text-primary/70" />
          <div className="absolute top-2 left-3 w-6 h-4 rounded-sm bg-[hsl(var(--atm-gold))] opacity-80" />
        </div>

        {/* The slot */}
        <div className="absolute bottom-20 w-44 h-1.5 bg-primary/30 rounded-full shadow-[0_0_12px_hsl(var(--primary)/0.3)]" />
      </div>

      {phase === "reading" ? (
        <div className="flex items-center gap-2 text-sm text-primary animate-fade-in font-mono">
          <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
          Reading card...
        </div>
      ) : phase === "idle" ? (
        <button
          onClick={handleInsert}
          className="atm-action-btn px-8 py-3 text-sm font-mono tracking-wider hover-scale"
        >
          INSERT CARD
        </button>
      ) : (
        <div className="h-10" />
      )}
    </div>
  );
};

export default CardInsertScreen;
