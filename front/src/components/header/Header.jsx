import Menu from "../menu/Menu";
import LanguageChooser from "../lang/LanguageChooser";
import MobileHeader from "./mobile/MobileHeader";

export default function Header() {
  return (
    <header>
      <div>
        <Menu />
        <LanguageChooser />
      </div>
      <MobileHeader />
    </header>
  );
}
