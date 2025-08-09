import { useState } from "react";

export const useMenuToggle = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return { isOpen, handleToggle };
};
