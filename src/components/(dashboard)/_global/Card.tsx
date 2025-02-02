import React from "react";
import { ReactNode } from "react";

interface ICard {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className }: ICard) => {
  return <div className={`${className} shadow-lg border`}>{children}</div>;
};

export default Card;
