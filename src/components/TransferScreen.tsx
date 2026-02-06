import { useState } from "react";
import { ArrowLeft, ArrowRightLeft, CheckCircle, XCircle } from "lucide-react";
import Keypad from "./Keypad";

interface TransferScreenProps {
  balance: number;
  onTransfer: (toAccount: string, amount: number) => boolean;
  onBack: () => void;
}

type Step = "account" | "amount" | "confirm" | "result";

const TransferScreen = ({ balance, onTransfer, onBack }: TransferScreenProps) => {
  const [step, setStep] = useState<Step>("account");
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState<"success" | "error" | null>(null);

  const handleAccountKey = (key: string) => {
    if (account.length < 10) setAccount((a) => a + key);
  };

  const handleAmountKey = (key: string) => {
    if (amount.length < 8) setAmount((a) => a + key);
  };

  const handleAccountSubmit = () => {
    if (account.length >= 4) setStep("amount");
  };

  const handleAmountSubmit = () => {
    const val = parseFloat(amount);
    if (!isNaN(val) && val > 0) setStep("confirm");
  };

  const handleConfirm = () => {
    const val = parseFloat(amount);
    const success = onTransfer(account, val);
    setResult(success ? "success" : "error");
    setStep("result");
  };

  if (step === "result") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
        {result === "success" ? (
          <>
            <CheckCircle className="w-16 h-16 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Transfer Successful</h3>
            <p className="text-sm text-muted-foreground">
              ${parseFloat(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })} sent to ****{account.slice(-4)}
            </p>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-destructive" />
            <h3 className="text-xl font-semibold text-foreground">Transfer Failed</h3>
            <p className="text-sm text-muted-foreground">Insufficient funds or invalid account</p>
          </>
        )}
        <button onClick={onBack} className="atm-action-btn px-8 py-3 mt-4">
          Return to Menu
        </button>
      </div>
    );
  }

  if (step === "confirm") {
    return (
      <div className="flex-1 flex flex-col">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </button>

        <h2 className="text-lg font-semibold text-foreground mb-4">Confirm Transfer</h2>

        <div className="rounded-xl border border-border bg-secondary/40 p-5 space-y-3 font-mono text-sm mb-6">
          <div className="flex justify-between">
            <span className="text-muted-foreground text-xs">To Account</span>
            <span className="text-foreground text-xs">****{account.slice(-4)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-xs">Amount</span>
            <span className="text-primary text-xs font-bold">
              ${parseFloat(amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="border-t border-dashed border-muted-foreground/30 pt-2 flex justify-between">
            <span className="text-muted-foreground text-xs">New Balance</span>
            <span className="text-foreground text-xs font-bold">
              ${(balance - parseFloat(amount)).toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div className="flex gap-3 mt-auto">
          <button
            onClick={() => setStep("amount")}
            className="flex-1 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground transition-colors text-sm"
          >
            Go Back
          </button>
          <button onClick={handleConfirm} className="flex-1 atm-action-btn py-3 text-sm">
            Confirm Transfer
          </button>
        </div>
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

      <div className="flex items-center gap-2 mb-1">
        <ArrowRightLeft className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          {step === "account" ? "Recipient Account" : "Transfer Amount"}
        </h2>
      </div>

      {step === "account" ? (
        <>
          <p className="text-xs text-muted-foreground mb-4">Enter the recipient's account number</p>
          <div className="bg-secondary/60 rounded-lg p-4 mb-2 text-center">
            <span className="text-sm text-muted-foreground">Account: </span>
            <span className="text-2xl font-mono font-bold text-foreground tracking-wider">
              {account || "—"}
            </span>
          </div>
          <Keypad onKey={handleAccountKey} onClear={() => setAccount("")} onSubmit={handleAccountSubmit} submitLabel="Next" />
        </>
      ) : (
        <>
          <p className="text-xs text-muted-foreground mb-4">
            Available: <span className="gold-text font-mono">${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
          </p>
          <div className="bg-secondary/60 rounded-lg p-4 mb-2 text-center">
            <span className="text-sm text-muted-foreground">Amount: </span>
            <span className="text-2xl font-mono font-bold text-foreground">
              ${amount || "0"}
            </span>
          </div>
          <Keypad onKey={handleAmountKey} onClear={() => setAmount("")} onSubmit={handleAmountSubmit} submitLabel="Next" />
        </>
      )}
    </div>
  );
};

export default TransferScreen;
