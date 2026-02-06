import { useState, useCallback } from "react";

export interface Transaction {
  id: string;
  type: "withdrawal" | "deposit" | "balance";
  amount?: number;
  date: Date;
  balance: number;
}

interface ATMState {
  balance: number;
  pin: string;
  isAuthenticated: boolean;
  transactions: Transaction[];
}

const VALID_PIN = "1234";

export function useATM() {
  const [state, setState] = useState<ATMState>({
    balance: 25750.0,
    pin: "",
    isAuthenticated: false,
    transactions: [
      { id: "1", type: "deposit", amount: 5000, date: new Date(2026, 1, 4), balance: 25750 },
      { id: "2", type: "withdrawal", amount: 200, date: new Date(2026, 1, 3), balance: 20750 },
      { id: "3", type: "deposit", amount: 1500, date: new Date(2026, 1, 1), balance: 20950 },
    ],
  });

  const authenticate = useCallback((pin: string): boolean => {
    if (pin === VALID_PIN) {
      setState((s) => ({ ...s, isAuthenticated: true }));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setState((s) => ({ ...s, isAuthenticated: false }));
  }, []);

  const withdraw = useCallback((amount: number): boolean => {
    if (amount <= 0 || amount > state.balance) return false;
    setState((s) => {
      const newBalance = s.balance - amount;
      return {
        ...s,
        balance: newBalance,
        transactions: [
          {
            id: Date.now().toString(),
            type: "withdrawal",
            amount,
            date: new Date(),
            balance: newBalance,
          },
          ...s.transactions,
        ],
      };
    });
    return true;
  }, [state.balance]);

  const deposit = useCallback((amount: number): boolean => {
    if (amount <= 0) return false;
    setState((s) => {
      const newBalance = s.balance + amount;
      return {
        ...s,
        balance: newBalance,
        transactions: [
          {
            id: Date.now().toString(),
            type: "deposit",
            amount,
            date: new Date(),
            balance: newBalance,
          },
          ...s.transactions,
        ],
      };
    });
    return true;
  }, []);

  return {
    balance: state.balance,
    isAuthenticated: state.isAuthenticated,
    transactions: state.transactions,
    authenticate,
    logout,
    withdraw,
    deposit,
  };
}
