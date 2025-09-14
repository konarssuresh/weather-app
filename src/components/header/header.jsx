import { Logo } from "../../common-components/icons/Logo";
import { Units } from "./units";

export const Header = () => {
  return (
    <div className="flex flex-row justify-between">
      <Logo />
      <Units />
    </div>
  );
};
