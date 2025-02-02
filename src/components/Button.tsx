import React from "react";

interface IButton {
  children: React.ReactNode;
  className?: string;
  type?: "submit" | "button" | "reset" | undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const ButtonLarge = ({ children, className }: IButton) => {
  return (
    <button
      className={`${className} rounded-full font-bold shadow py-[18px] px-16`}
    >
      {children}
    </button>
  );
};

const ButtonMedium = ({ children, className, type }: IButton) => {
  return (
    <button
      type={type}
      className={`${className} text-sm rounded-full font-bold shadow py-2 px-6 md:py-3 md:px-12`}
    >
      {children}
    </button>
  );
};

const ButtonSmall = ({ children, className, onClick }: IButton) => {
  return (
    <button
      onClick={onClick}
      className={`${className} text-xs rounded-full font-bold shadow py-2 px-8`}
    >
      {children}
    </button>
  );
};

export { ButtonLarge, ButtonMedium, ButtonSmall };
