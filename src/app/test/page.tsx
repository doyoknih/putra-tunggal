"use client";

import React, { useRef } from "react";

const Test = () => {
  const refComponent1 = useRef<HTMLDivElement>(null);
  const refComponent2 = useRef<HTMLDivElement>(null);

  const scrollToBanner = (component: string) => {
    if (component === "component1") {
      refComponent1.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (component === "component2") {
      refComponent2.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div>
      <div className="h-screen flex justify-start items-start gap-5">
        <button onClick={() => scrollToBanner("component1")}>test1</button>
        <button onClick={() => scrollToBanner("component2")}>test2</button>
      </div>

      {/* <div
        id="component1"
        ref={refComponent1}
        className="h-screen bg-gray-200 flex items-center justify-center"
      >
        <p>component 1</p>
      </div>

      <div
        id="component2"
        ref={refComponent2}
        className="h-screen bg-gray-300 flex items-center justify-center"
      >
        <p>component 2</p>
      </div> */}
    </div>
  );
};

export default Test;
