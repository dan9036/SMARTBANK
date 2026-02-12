import { useState } from "react";
import { Lock, AlertCircle } from "lucide-react";
import Keypad from "./Keypad";
import { sounds } from "@/lib/sounds";

interface PinScreenProps {
  onAuth: (pin: string) => boolean;
}

const PinScreen = ({ onAuth }: PinScreenProps) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleKey = (key: string) => {
    if (pin.length < 4) {
      setPin((p) => p + key);
      setError(false);
    }
  };

  const handleClear = () => {
    setPin("");
    setError(false);
  };

  const handleSubmit = () => {
    if (pin.length === 4) {
      const success = onAuth(pin);
      if (!success) {
        sounds.error();
        setError(true);
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setPin("");
        }, 600);
      } else {
        sounds.success();
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between">
      <div className="text-center space-y-6">
        <Lock className="w-12 h-12 mx-auto text-primary opacity-80" />
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-1">Enter Your PIN</h2>
          <p className="text-sm text-muted-foreground">Please enter your 4-digit PIN</p>
        </div>

        {/* PIN dots */}
        <div
          className={`flex justify-center gap-4 transition-transform ${shake ? "animate-[shake_0.5s_ease-in-out]" : ""}`}
          style={shake ? { animation: "shake 0.4s ease-in-out" } : {}}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                i < pin.length
                  ? "bg-primary border-primary shadow-[0_0_10px_hsl(var(--primary)/0.5)]"
                  : "border-muted-foreground/40"
              }`}
            />
          ))}
        </div>

        {error && (
          <div className="flex items-center justify-center gap-2 text-destructive text-sm animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            <span>Incorrect PIN. Please try again.</span>
          </div>
        )}
      </div>

      <Keypad onKey={handleKey} onClear={handleClear} onSubmit={handleSubmit} />
    </div>
  );
};

export default PinScreen;
