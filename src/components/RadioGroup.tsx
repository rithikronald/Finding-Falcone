interface RadioGroupProps {
  list: [];
  show: boolean;
  onSelect: (val: any) => void;
  name: string;
  value: any;
}

export const RadioGroup = ({
  list,
  show,
  onSelect,
  name,
  value,
}: RadioGroupProps) => {
  return (
    <div className="flex flex-col">
      {list && show
        ? list.map((value, index) => {
            return (
              <label key={index}>
                <input
                  type="radio"
                  name={name}
                  value={value.name}
                  onChange={(e) => {
                    console.log("Eadasd", e.target.value);
                    onSelect(value);
                  }}
                />
                {value.name}
              </label>
            );
          })
        : null}
    </div>
  );
};
