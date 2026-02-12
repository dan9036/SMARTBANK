import { useState, useEffect, useCallback, useRef } from "react";
import ATMShell from "@/components/ATMShell";
import CardInsertScreen from "@/components/CardInsertScreen";
import CardEjectScreen from "@/components/CardEjectScreen";
import PinScreen from "@/components/PinScreen";
import MainMenu, { ATMView } from "@/components/MainMenu";
import BalanceScreen from "@/components/BalanceScreen";
import TransactionScreen from "@/components/TransactionScreen";
import HistoryScreen from "@/components/HistoryScreen";
import ReceiptScreen from "@/components/ReceiptScreen";
import ChangePinScreen from "@/components/ChangePinScreen";
import TransferScreen from "@/components/TransferScreen";
import { useATM } from "@/hooks/useATM";

const SESSION_TIMEOUT = 30000; // 30 seconds

const Index = () => {
  const { balance, isAuthenticated, transactions, authenticate, logout, withdraw, deposit, changePin, transfer } = useATM();
  const [view, setView] = useState<ATMView>("menu");
  const [cardInserted, setCardInserted] = useState(false);
  const [ejecting, setEjecting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleLogout = useCallback(() => {
    logout();
    setView("menu");
    setEjecting(true);
  }, [logout]);

  const handleEjectComplete = useCallback(() => {
    setEjecting(false);
    setCardInserted(false);
  }, []);

  const resetTimer = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isAuthenticated) {
      timeoutRef.current = setTimeout(handleLogout, SESSION_TIMEOUT);
    }
  }, [isAuthenticated, handleLogout]);

  useEffect(() => {
    if (!isAuthenticated) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      return;
    }
    resetTimer();
    const events = ["mousedown", "keydown", "touchstart", "mousemove"];
    events.forEach((e) => window.addEventListener(e, resetTimer));
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach((e) => window.removeEventListener(e, resetTimer));
    };
  }, [isAuthenticated, resetTimer]);

  return (
    <ATMShell>
      {ejecting ? (
        <CardEjectScreen onComplete={handleEjectComplete} />
      ) : !cardInserted ? (
        <CardInsertScreen onComplete={() => setCardInserted(true)} />
      ) : !isAuthenticated ? (
        <PinScreen onAuth={authenticate} />
      ) : view === "menu" ? (
        <MainMenu onNavigate={setView} onLogout={handleLogout} />
      ) : view === "balance" ? (
        <BalanceScreen balance={balance} onBack={() => setView("menu")} />
      ) : view === "withdraw" ? (
        <TransactionScreen type="withdraw" balance={balance} onSubmit={withdraw} onBack={() => setView("menu")} />
      ) : view === "deposit" ? (
        <TransactionScreen type="deposit" balance={balance} onSubmit={deposit} onBack={() => setView("menu")} />
      ) : view === "history" ? (
        <HistoryScreen transactions={transactions} onBack={() => setView("menu")} />
      ) : view === "receipt" ? (
        <ReceiptScreen transaction={transactions[0] || null} balance={balance} onBack={() => setView("menu")} />
      ) : view === "changepin" ? (
        <ChangePinScreen onChangePin={changePin} onBack={() => setView("menu")} />
      ) : view === "transfer" ? (
        <TransferScreen balance={balance} onTransfer={transfer} onBack={() => setView("menu")} />
      ) : null}
    </ATMShell>
  );
};

export default Index;
