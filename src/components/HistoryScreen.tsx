import { ArrowLeft, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Transaction } from "@/hooks/useATM";

interface HistoryScreenProps {
  transactions: Transaction[];
  onBack: () => void;
}

const HistoryScreen = ({ transactions, onBack }: HistoryScreenProps) => {
  return (
    <div className="flex-1 flex flex-col">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4 self-start"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Menu
      </button>

      <h2 className="text-lg font-semibold text-foreground mb-4">Transaction History</h2>

      <div className="space-y-2 overflow-y-auto flex-1">
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No transactions yet</p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    tx.type === "deposit"
                      ? "bg-primary/15 text-primary"
                      : "bg-destructive/15 text-destructive"
                  }`}
                >
                  {tx.type === "deposit" ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground capitalize">{tx.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {tx.date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <span
                className={`font-mono text-sm font-semibold ${
                  tx.type === "deposit" ? "text-primary" : "text-destructive"
                }`}
              >
                {tx.type === "deposit" ? "+" : "-"}${tx.amount?.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryScreen;
