type PercentageBarProps = {
  count: number;
  name: string;
  percent: number;
};

const PercentageBar = ({ name, percent, count }: PercentageBarProps) => {
  return (
    <div className="grid grid-cols-7 gap-4">
      <div className="col-span-1">{name}</div>
      <div className="col-span-5 bg-gray-200 w-full h-4 rounded">
        <div className="bg-[#e87400] h-full rounded" style={{ width: `${percent}%` }} />
      </div>
      <div className="col-span-1">
        {count} ({percent}%)
      </div>
    </div>
  );
};

export default PercentageBar;
