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

export default function PlayerForm({
  onAdd,
  existingPlayers,
}: PlayerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: "", score: 1 },
    mode: "onChange",
  });

  const nameValue = watch("name");
  const scoreValue = watch("score");
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

    onAdd({ name: data.name.trim(), score: Number(data.score) || 1 });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/80 backdrop-blur-md shadow-md border border-gray-100 p-5 rounded-2xl mb-6 transition-colors"
    >
      <h2 className="text-start text-xl font-semibold text-slate-700 mb-3">
        👥 Add Player <span className="text-rose-500">*</span>
      </h2>

      <div className="flex gap-3 flex-1 w-full">
        <div className="flex flex-col w-7/12">
          {/* Player Name Field */}
          <input
            {...register("name", {
              required: "Player name is required",
              maxLength: {
                value: 20,
                message: "Name cannot exceed 30 characters",
              },
            })}
            className={`border p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none ${
              errors.name
                ? "border-rose-400 focus:ring-rose-300"
                : "border-gray-300 focus:ring-emerald-400"
            }`}
            placeholder="Enter player name"
          />
          {errors.name && (
            <p className="text-rose-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div className="flex flex-col w-5/12">
          {/* Score Field */}
          <input
            {...register("score", {
              min: 1,
              max: 10,
            })}
            min={1}
            max={10}
            className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder="Score (1-10)"
            type="number"
          />
          {errors.score && (
            <p className="text-rose-500 text-sm">{errors.score.message}</p>
          )}
        </div>
      </div>

      {/* Add Button */}
      <button
        type="submit"
        disabled={
          !nameValue.trim() || scoreValue < 1 || scoreValue > 10 || isDuplicate
        }
        className="px-5 my-3 w-full rounded-xl text-white shadow-sm transition-transform"
      >
        Add
      </button>
    </form>
  );
}
