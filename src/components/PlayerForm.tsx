import { useForm } from "react-hook-form";
import type { Player } from "../types";
import { useEffect, useState } from "react";

interface PlayerFormProps {
  onAdd: (player: Player) => void;
  existingPlayers: Player[];
}

interface FormData {
  name: string;
  score: number;
}

export default function PlayerForm({ onAdd, existingPlayers }: PlayerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: "", score: 0 },
  });

  const nameValue = watch("name");
  const [isDuplicate, setIsDuplicate] = useState(false);

  // 🧠 Duplicate Check
  useEffect(() => {
    const isDup = existingPlayers.some(
      (p) => p.name.toLowerCase() === nameValue.trim().toLowerCase()
    );

    if (isDup && nameValue.trim()) {
      setIsDuplicate(true);
      setError("name", { message: "Player name already exists" });
    } else {
      setIsDuplicate(false);
      clearErrors("name");
    }
  }, [nameValue, existingPlayers, clearErrors, setError]);

  const onSubmit = (data: FormData) => {
    if (!data.name.trim() || isDuplicate) return;

    onAdd({ name: data.name.trim(), score: Number(data.score) || 0 });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-md border border-gray-100 dark:border-gray-700 p-5 rounded-2xl mb-6 transition-colors"
    >
      <h2 className="text-xl font-semibold text-slate-700 dark:text-gray-100 mb-3">
        👥 Add Player <span className="text-rose-500">*</span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 items-start">
        {/* Player Name Field */}
        <div className="flex-1 w-full">
          <input
            {...register("name", {
              required: "Player name is required",
            })}
            className={`border p-3 rounded-lg w-full focus:ring-2 ${
              errors.name
                ? "border-rose-400 focus:ring-rose-300"
                : "border-gray-300 focus:ring-emerald-400"
            }`}
            placeholder="Enter player name"
          />
          {errors.name && (
            <p className="text-rose-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Score Field */}
        <input
          {...register("score", {
            min: 0,
            max: 10,
          })}
          className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg w-full sm:w-24 focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Score (1-10)"
          type="number"
        />

        {/* Add Button */}
        <button
          type="submit"
          disabled={!nameValue.trim() || isDuplicate}
          className="px-5 py-3 rounded-xl text-white shadow-sm transition-transform "
        >
          Add
        </button>
      </div>
    </form>
  );
}
