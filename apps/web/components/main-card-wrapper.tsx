import React from "react";

interface CardWrapperProps {
  as: any | false;
  items: any[];
}

const CardWrapper: React.FC<CardWrapperProps> = ({ as = false, items }) => {
  const ChildComponent = as || "div";
  return (
    <div className="flex">
      {items.map((item) => (
        <ChildComponent key={item.id} {...item} className="w-1/2" />
      ))}
    </div>
  );
};

export default CardWrapper;
