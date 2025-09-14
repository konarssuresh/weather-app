import IconSearch from "../icons/IconSearch";
import "./search-input.css";

export const SearchInput = ({
  placeholder,
  onChange,
  className,
  ref,
  ...rest
}) => {
  return (
    <div className={`relative ${className}`}>
      <IconSearch className="absolute left-3.5 top-5.25 text-neutral-200" />
      <input
        ref={ref}
        type="search"
        className="pl-10 py-4 pr-6 w-full bg-neutral-800  text-neutral-200 text-preset-5 rounded-lg hover:bg-neutral-700 focus:outline-3 focus:outline-offset-3 focus:outline-solid focus:outline-neutral-0"
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};
