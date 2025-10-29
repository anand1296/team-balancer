import { motion, AnimatePresence } from "framer-motion";
import type { FC, ReactNode } from "react";

type Props = {
  open: boolean;
  title?: string;
  description?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationDialog: FC<Props> = ({
  open,
  title = "Confirm",
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* overlay */}
          <div
            className="absolute inset-0 bg-black/35 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* dialog */}
          <motion.div
            className="relative w-full max-w-md mx-4 bg-white/90 border border-gray-100 rounded-2xl shadow-2xl p-6 text-gray-800/90"
            initial={{ y: 20, scale: 0.98, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 10, scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{title}</h3>
                <button onClick={onCancel} className="bg-transparent! text-gray-800/80! p-0! cursor-pointer transition-all duration-300 ease-in-out font-semibold hover:scale-90">X</button>
            </div>
            {description && (
              <p className="text-sm text-gray-600 mb-4">{description}</p>
            )}

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-lg text-white! hover:opacity-95 transition"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-white! border border-gray-800! text-gray-700! hover:bg-gray-50! transition"
                onClick={onCancel}
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationDialog;
