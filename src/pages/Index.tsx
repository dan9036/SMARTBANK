import { useState } from "react";
import ATMShell from "@/components/ATMShell";
import PinScreen from "@/components/PinScreen";
import MainMenu, { ATMView } from "@/components/MainMenu";
import BalanceScreen from "@/components/BalanceScreen";
import TransactionScreen from "@/components/TransactionScreen";
import HistoryScreen from "@/components/HistoryScreen";
import { useATM } from "@/hooks/useATM";

const Index = () => {
  const { balance, isAuthenticated, transactions, authenticate, logout, withdraw, deposit } = useATM();
  const [view, setView] = useState<ATMView>("menu");

  const handleLogout = () => {
    logout();
    setView("menu");
  };

  return (
    <ATMShell>
      {!isAuthenticated ? (
        <PinScreen onAuth={authenticate} />
      ) : view === "menu" ? (
        <MainMenu onNavigate={setView} onLogout={handleLogout} />
      ) : view === "balance" ? (
        <BalanceScreen balance={balance} onBack={() => setView("menu")} />
      ) : view === "withdraw" ? (
        <TransactionScreen
          type="withdraw"
          balance={balance}
          onSubmit={withdraw}
          onBack={() => setView("menu")}
        />
      ) : view === "deposit" ? (
        <TransactionScreen
          type="deposit"
          balance={balance}
          onSubmit={deposit}
          onBack={() => setView("menu")}
        />
      ) : view === "history" ? (
        <HistoryScreen transactions={transactions} onBack={() => setView("menu")} />
      ) : null}
    </ATMShell>
  );
};

export default Index;
