import { useAppearance } from "@vincecao/use-tools";
import { zinc } from 'tailwindcss/colors';

export default function useStyles() {
  const { appearance } = useAppearance();
  const isDark = appearance === 'dark';
  const boxShadow = {
    INITIAL: `5px 5px ${zinc[600]}`,
    HOVER: `3px 3px ${zinc[600]}`,
    TAP: `1.5px 1.5px ${zinc[600]}`,
  };
  return { boxShadow, isDark };
}