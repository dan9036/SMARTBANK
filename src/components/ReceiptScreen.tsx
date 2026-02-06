import { ArrowLeft, Printer, Download } from "lucide-react";
import { Transaction } from "@/hooks/useATM";
import { useRef } from "react";

interface ReceiptScreenProps {
  transaction: Transaction | null;
  balance: number;
  onBack: () => void;
}

const ReceiptScreen = ({ transaction, balance, onBack }: ReceiptScreenProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!receiptRef.current) return;

    const receiptContent = receiptRef.current;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const dateStr = transaction
      ? transaction.date.toLocaleString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : new Date().toLocaleString();

    printWindow.document.write(`
      <html>
        <head>
          <title>ATM Receipt</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
            body {
              font-family: 'JetBrains Mono', monospace;
              background: #fff;
              color: #111;
              padding: 40px;
              max-width: 400px;
              margin: 0 auto;
            }
            .receipt {
              border: 2px dashed #ccc;
              padding: 30px;
              border-radius: 8px;
            }
            .header {
              text-align: center;
              border-bottom: 1px dashed #ccc;
              padding-bottom: 16px;
              margin-bottom: 16px;
            }
            .header h1 { font-size: 20px; margin: 0 0 4px; }
            .header p { font-size: 12px; color: #666; margin: 0; }
            .row {
              display: flex;
              justify-content: space-between;
              padding: 6px 0;
              font-size: 13px;
            }
            .row .label { color: #666; }
            .row .value { font-weight: 600; }
            .divider {
              border-top: 1px dashed #ccc;
              margin: 12px 0;
            }
            .total {
              font-size: 18px;
              font-weight: 700;
              text-align: center;
              padding: 16px 0;
            }
            .footer {
              text-align: center;
              font-size: 11px;
              color: #999;
              margin-top: 16px;
              border-top: 1px dashed #ccc;
              padding-top: 16px;
            }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <h1>SECURE ATM</h1>
              <p>Transaction Receipt</p>
            </div>
            <div class="row"><span class="label">Date</span><span class="value">${dateStr}</span></div>
            <div class="row"><span class="label">Account</span><span class="value">****4829</span></div>
            <div class="row"><span class="label">Type</span><span class="value" style="text-transform:capitalize">${transaction?.type || "N/A"}</span></div>
            <div class="divider"></div>
            ${transaction?.amount ? `<div class="row"><span class="label">Amount</span><span class="value">$${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>` : ""}
            <div class="row"><span class="label">Balance</span><span class="value">$${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></div>
            <div class="divider"></div>
            <div class="row"><span class="label">Ref #</span><span class="value">${transaction?.id || "N/A"}</span></div>
            <div class="row"><span class="label">Terminal</span><span class="value">ATM-0042</span></div>
            <div class="footer">
              <p>Thank you for banking with us</p>
              <p>Please retain this receipt for your records</p>
            </div>
          </div>
          <script>window.print();</script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (!transaction) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
        <p className="text-muted-foreground">No recent transaction to display</p>
        <button onClick={onBack} className="atm-action-btn px-8 py-3">
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

      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <Printer className="w-5 h-5 text-primary" />
        Transaction Receipt
      </h2>

      {/* Receipt */}
      <div
        ref={receiptRef}
        className="rounded-xl border border-border bg-secondary/40 p-5 space-y-3 font-mono text-sm"
      >
        <div className="text-center border-b border-dashed border-muted-foreground/30 pb-3">
          <p className="text-base font-bold glow-text">SECURE ATM</p>
          <p className="text-xs text-muted-foreground">Transaction Receipt</p>
        </div>

        <div className="space-y-2">
          <ReceiptRow label="Date" value={transaction.date.toLocaleString("en-US", {
            month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit"
          })} />
          <ReceiptRow label="Account" value="****4829" />
          <ReceiptRow label="Type" value={transaction.type} capitalize />
        </div>

        <div className="border-t border-dashed border-muted-foreground/30 pt-2 space-y-2">
          {transaction.amount && (
            <ReceiptRow
              label="Amount"
              value={`$${transaction.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
              highlight={transaction.type === "deposit" ? "primary" : "destructive"}
            />
          )}
          <ReceiptRow
            label="Balance"
            value={`$${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`}
            bold
          />
        </div>

        <div className="border-t border-dashed border-muted-foreground/30 pt-2 space-y-2">
          <ReceiptRow label="Ref #" value={transaction.id} />
          <ReceiptRow label="Terminal" value="ATM-0042" />
        </div>

        <div className="text-center border-t border-dashed border-muted-foreground/30 pt-3">
          <p className="text-xs text-muted-foreground">Thank you for banking with us</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={handleDownloadPDF}
          className="flex-1 atm-action-btn py-3 flex items-center justify-center gap-2 text-sm"
        >
          <Download className="w-4 h-4" />
          Download / Print
        </button>
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors text-sm"
        >
          Done
        </button>
      </div>
    </div>
  );
};

interface ReceiptRowProps {
  label: string;
  value: string;
  capitalize?: boolean;
  bold?: boolean;
  highlight?: "primary" | "destructive";
}

const ReceiptRow = ({ label, value, capitalize, bold, highlight }: ReceiptRowProps) => (
  <div className="flex justify-between items-center">
    <span className="text-muted-foreground text-xs">{label}</span>
    <span
      className={`text-xs ${capitalize ? "capitalize" : ""} ${bold ? "font-bold text-foreground" : "text-foreground"} ${
        highlight === "primary" ? "text-primary" : highlight === "destructive" ? "text-destructive" : ""
      }`}
    >
      {value}
    </span>
  </div>
);

export default ReceiptScreen;
