import { useForm } from "react-hook-form";
import type { Player } from "../types";

interface PlayerFormProps {
  onAdd: (player: Player) => void;
}

interface FormData {
  name: string;
  score: number;
}

export default function PlayerForm({ onAdd }: PlayerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: "", score: 0 },
  });

  const nameValue = watch("name");

  const onSubmit = (data: FormData) => {
    onAdd({ name: data.name.trim(), score: Number(data.score) || 0 });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/80 backdrop-blur-md shadow-md border border-gray-100 p-5 rounded-2xl mb-6"
    >
      <h2 className="text-xl font-semibold text-slate-700 mb-3">
        👥 Add Player <span className="text-rose-500">*</span>
      </h2>

      <div className="flex flex-col sm:flex-row gap-3 items-start">
        <div className="flex-1 w-full">
          <input
            {...register("name", { required: "Player name is required" })}
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

        <input
          {...register("score", {
            min: 0,
            max: 10,
          })}
          className="border border-gray-300 p-3 rounded-lg w-full sm:w-24 focus:ring-2 focus:ring-indigo-400 outline-none"
          placeholder="Score (1-10)"
          type="number"
        />

        <button
          type="submit"
          disabled={!nameValue.trim()}
          className={`px-5 py-3 rounded-xl text-white shadow-sm transition-transform ${
            nameValue.trim()
              ? "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.03]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Add
        </button>
      </div>
    </form>
  );
}
