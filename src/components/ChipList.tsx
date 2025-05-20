import Chip from "./Chip";

type ChipListProps = {
  chips: string[];
  selectedIndex?: number;
  onChipClick?: (index: number) => void;
};

const ChipList: React.FC<ChipListProps> = ({
  chips,
  selectedIndex,
  onChipClick,
}) => {
  return (
    <div style={{ display: "flex" }}>
      {chips.map((label, idx) => (
        <Chip
          key={label}
          selected={selectedIndex === idx}
          onClick={() => onChipClick?.(idx)}
        >
          {label}
        </Chip>
      ))}
    </div>
  );
};

export default ChipList;
