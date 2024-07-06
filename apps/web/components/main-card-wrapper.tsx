import {FC} from "react";
interface MainCardWrapperProps {
  as: any ;
  items: any[];
}

const MainCardWrapper:FC<MainCardWrapperProps> = ({ as = false, items }) => {
  const ChildComponent = as || "div";
  return (
    <section className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all p-[50px]">
      {items.map((item) => (
        <ChildComponent key={item.id} {...item}/>
      ))}
    </section>
  );
};

export default MainCardWrapper;
