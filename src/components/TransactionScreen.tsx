import { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import Keypad from "./Keypad";

interface TransactionScreenProps {
  type: "withdraw" | "deposit";
  balance: number;
  onSubmit: (amount: number) => boolean;
  onBack: () => void;
}

const quickAmounts = [20, 50, 100, 200, 500, 1000];

const TransactionScreen = ({ type, balance, onSubmit, onBack }: TransactionScreenProps) => {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<"success" | "error" | null>(null);
  const [mode, setMode] = useState<"quick" | "custom">("quick");

  const handleQuickAmount = (val: number) => {
    const success = onSubmit(val);
    setResult(success ? "success" : "error");
  };

  const handleCustomSubmit = () => {
    const val = parseFloat(amount);
    if (isNaN(val) || val <= 0) return;
    const success = onSubmit(val);
    setResult(success ? "success" : "error");
  };

  const handleKey = (key: string) => {
    if (amount.length < 8) {
      setAmount((a) => a + key);
    }
  };

  const handleClear = () => setAmount("");

  if (result) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
        {result === "success" ? (
          <>
            <CheckCircle className="w-16 h-16 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">
              {type === "withdraw" ? "Withdrawal" : "Deposit"} Successful
            </h3>
            <p className="text-sm text-muted-foreground">
              Please take your {type === "withdraw" ? "cash and " : ""}receipt
            </p>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-destructive" />
            <h3 className="text-xl font-semibold text-foreground">Transaction Failed</h3>
            <p className="text-sm text-muted-foreground">
              {type === "withdraw" ? "Insufficient funds" : "Invalid amount"}
            </p>
          </>
        )}
        <button onClick={onBack} className="atm-action-btn px-8 py-3 mt-4">
          Return to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Menu
      </button>

      <h2 className="text-lg font-semibold text-foreground mb-1 capitalize">{type}</h2>
      {type === "withdraw" && (
        <p className="text-xs text-muted-foreground mb-4">
          Available: <span className="gold-text font-mono">${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
        </p>
      )}

      {/* Mode toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode("quick")}
          className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${
            mode === "quick"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Quick Amount
        </button>
        <button
          onClick={() => setMode("custom")}
          className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${
            mode === "custom"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          Custom
        </button>
      </div>

      {mode === "quick" ? (
        <div className="grid grid-cols-3 gap-2 flex-1 content-start">
          {quickAmounts.map((val) => (
            <button
              key={val}
              onClick={() => handleQuickAmount(val)}
              className="atm-keypad-btn h-14 text-base"
            >
              ${val}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          <div className="bg-secondary/60 rounded-lg p-4 mb-2 text-center">
            <span className="text-sm text-muted-foreground">Amount: </span>
            <span className="text-2xl font-mono font-bold text-foreground">
              ${amount || "0"}
            </span>
          </div>
          <Keypad onKey={handleKey} onClear={handleClear} onSubmit={handleCustomSubmit} submitLabel="Confirm" />
        </div>
      )}
    </div>
  );
};

export default TransactionScreen;
