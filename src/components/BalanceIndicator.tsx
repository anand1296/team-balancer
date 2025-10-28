import { motion } from "framer-motion";
import type { BalanceResult } from "../types";

interface BalanceIndicatorProps {
  balance: BalanceResult | null;
}

export default function BalanceIndicator({ balance }: BalanceIndicatorProps) {
  if (!balance) return null;
  const { diff, avg, balancePercent } = balance;
  const color =
    parseFloat(balancePercent) > 80
      ? "text-green-600"
      : parseFloat(balancePercent) > 60
      ? "text-yellow-600"
      : "text-red-600";

  return (
    <motion.div
      className="bg-white shadow p-3 rounded-xl w-full mb-6 text-center"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <h3 className="text-lg font-semibold mb-1">Team Balance</h3>
      <p>
        Avg Score: <strong>{avg.toFixed(1)}</strong> | Difference:{" "}
        <strong>{diff}</strong>
      </p>
      <p className={`font-bold ${color}`}>Balance: {balancePercent}%</p>
    </motion.div>
  );
}
