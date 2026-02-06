import {
  Banknote,
  PiggyBank,
  Receipt,
  History,
  LogOut,
} from "lucide-react";

export type ATMView = "menu" | "withdraw" | "deposit" | "balance" | "history";

interface MainMenuProps {
  onNavigate: (view: ATMView) => void;
  onLogout: () => void;
}

const menuItems: { view: ATMView; label: string; icon: typeof Banknote; desc: string }[] = [
  { view: "balance", label: "Balance", icon: Receipt, desc: "Check balance" },
  { view: "withdraw", label: "Withdraw", icon: Banknote, desc: "Cash withdrawal" },
  { view: "deposit", label: "Deposit", icon: PiggyBank, desc: "Cash deposit" },
  { view: "history", label: "History", icon: History, desc: "Recent transactions" },
];

const MainMenu = ({ onNavigate, onLogout }: MainMenuProps) => {
  return (
    <div className="flex-1 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-1">Welcome Back</h2>
        <p className="text-sm text-muted-foreground mb-6">Select a transaction</p>

        <div className="grid grid-cols-2 gap-3">
          {menuItems.map(({ view, label, icon: Icon, desc }) => (
            <button
              key={view}
              onClick={() => onNavigate(view)}
              className="group flex flex-col items-center gap-2 p-5 rounded-xl bg-secondary/60 border border-border hover:border-primary/40 hover:bg-secondary transition-all duration-200 active:scale-95"
            >
              <Icon className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
              <span className="font-medium text-foreground text-sm">{label}</span>
              <span className="text-xs text-muted-foreground">{desc}</span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center justify-center gap-2 mt-6 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors text-sm"
      >
        <LogOut className="w-4 h-4" />
        Exit / Remove Card
      </button>
    </div>
  );
};

export default MainMenu;
