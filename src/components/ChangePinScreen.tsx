import { useState } from "react";
import { ArrowLeft, KeyRound, CheckCircle, XCircle } from "lucide-react";
import Keypad from "./Keypad";

interface ChangePinScreenProps {
  onChangePin: (oldPin: string, newPin: string) => boolean;
  onBack: () => void;
}

type Step = "old" | "new" | "confirm" | "success" | "error";

const ChangePinScreen = ({ onChangePin, onBack }: ChangePinScreenProps) => {
  const [step, setStep] = useState<Step>("old");
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");

  const currentPin = step === "old" ? oldPin : step === "new" ? newPin : confirmPin;
  const setCurrentPin = step === "old" ? setOldPin : step === "new" ? setNewPin : setConfirmPin;

  const handleKey = (key: string) => {
    if (currentPin.length < 4) {
      setCurrentPin((p) => p + key);
      setError("");
    }
  };

  const handleClear = () => {
    setCurrentPin("");
    setError("");
  };

  const handleSubmit = () => {
    if (currentPin.length !== 4) return;

    if (step === "old") {
      setStep("new");
    } else if (step === "new") {
      setStep("confirm");
    } else if (step === "confirm") {
      if (confirmPin !== newPin) {
        setError("PINs do not match");
        setConfirmPin("");
        return;
      }
      const success = onChangePin(oldPin, newPin);
      setStep(success ? "success" : "error");
      if (!success) setError("Current PIN is incorrect");
    }
  };

  if (step === "success" || step === "error") {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
        {step === "success" ? (
          <>
            <CheckCircle className="w-16 h-16 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">PIN Changed</h3>
            <p className="text-sm text-muted-foreground">Your PIN has been updated successfully</p>
          </>
        ) : (
          <>
            <XCircle className="w-16 h-16 text-destructive" />
            <h3 className="text-xl font-semibold text-foreground">PIN Change Failed</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </>
        )}
        <button onClick={onBack} className="atm-action-btn px-8 py-3 mt-4">
          Return to Menu
        </button>
      </div>
    );
  }

  const stepLabels: Record<string, { title: string; desc: string }> = {
    old: { title: "Current PIN", desc: "Enter your current 4-digit PIN" },
    new: { title: "New PIN", desc: "Enter your new 4-digit PIN" },
    confirm: { title: "Confirm PIN", desc: "Re-enter your new PIN to confirm" },
  };

  return (
    <div className="flex-1 flex flex-col">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Menu
      </button>

      <div className="text-center space-y-4 mb-4">
        <KeyRound className="w-10 h-10 mx-auto text-primary" />
        <div>
          <h2 className="text-lg font-semibold text-foreground">{stepLabels[step].title}</h2>
          <p className="text-sm text-muted-foreground">{stepLabels[step].desc}</p>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center gap-2">
          {["old", "new", "confirm"].map((s, i) => (
            <div
              key={s}
              className={`w-2 h-2 rounded-full transition-all ${
                s === step
                  ? "bg-primary w-6"
                  : i < ["old", "new", "confirm"].indexOf(step)
                  ? "bg-primary"
                  : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        {/* PIN dots */}
        <div className="flex justify-center gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                i < currentPin.length
                  ? "bg-primary border-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
                  : "border-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-destructive text-sm animate-fade-in">{error}</p>
        )}
      </div>

      <div className="mt-auto">
        <Keypad onKey={handleKey} onClear={handleClear} onSubmit={handleSubmit} submitLabel="Next" />
      </div>
    </div>
  );
};

export default ChangePinScreen;
