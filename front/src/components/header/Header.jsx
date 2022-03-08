import Menu from "../menu/Menu";
import LanguageChooser from "../lang/LanguageChooser";

export default function Header() {
  return (
    <header>
      <Menu />
      <LanguageChooser />
    </header>
  );
}
