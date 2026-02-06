interface KeypadProps {
  onKey: (key: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  submitLabel?: string;
}

const Keypad = ({ onKey, onClear, onSubmit, submitLabel = "Enter" }: KeypadProps) => {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""];

  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {keys.map((key, i) => {
        if (key === "") {
          if (i === 9) {
            return (
              <button
                key="clear"
                onClick={onClear}
                className="atm-keypad-btn h-14 text-destructive text-sm"
              >
                Clear
              </button>
            );
          }
          return (
            <button
              key="submit"
              onClick={onSubmit}
              className="atm-action-btn h-14 text-sm font-semibold"
            >
              {submitLabel}
            </button>
          );
        }
        return (
          <button
            key={key}
            onClick={() => onKey(key)}
            className="atm-keypad-btn h-14"
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keypad;
