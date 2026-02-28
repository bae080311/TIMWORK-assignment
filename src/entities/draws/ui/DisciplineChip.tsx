import { DISCIPLINE_COLOR } from "@entities/draws/const/DISCIPLINE_COLOR";

interface Props {
  name: string;
  active: boolean;
  onClick: () => void;
}

export default function DisciplineChip({ name, active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
        active
          ? (DISCIPLINE_COLOR[name] ??
            "bg-gray-100 text-gray-700 border-gray-300")
          : "bg-white text-gray-300 border-gray-200 line-through"
      }`}
    >
      {name}
    </button>
  );
}
