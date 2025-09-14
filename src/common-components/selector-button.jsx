import IconCheckmark from "./icons/IconCheckmark";

export const SelectorButton = ({ isSelected, children, onClick }) => {
  let classes = "bg-neutral-700";
  let selectedClasses = isSelected ? "bg-neutral-600" : "";
  return (
    <button
      onClick={onClick}
      className={`${
        !isSelected ? classes : selectedClasses
      } hover:bg-neutral-600 flex flex-row rounded-md  text-preset-7 justify-between gap-1.5 items-center w-full px-2 py-2.5`}
    >
      <span>{children}</span> {isSelected && <IconCheckmark />}
    </button>
  );
};
