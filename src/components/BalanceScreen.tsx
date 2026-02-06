import { ArrowLeft, Wallet } from "lucide-react";

interface BalanceScreenProps {
  balance: number;
  onBack: () => void;
}

const BalanceScreen = ({ balance, onBack }: BalanceScreenProps) => {
  return (
    <div className="flex-1 flex flex-col">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Menu
      </button>

      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <Wallet className="w-8 h-8 text-primary" />
        </div>

        <div>
          <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
          <p className="text-4xl font-bold font-mono glow-text">
            ${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>

        <div className="text-xs text-muted-foreground bg-secondary/60 rounded-lg px-4 py-2">
          Account ****4829 • Checking
        </div>
      </div>
    </div>
  );
};

export default BalanceScreen;
