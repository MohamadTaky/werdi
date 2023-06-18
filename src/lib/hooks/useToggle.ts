import { useState } from "react";
export default function useToggle(
  initialValue: boolean
): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);
  const toggle = () => setValue((prev) => !prev);
  return [value, toggle];
}
