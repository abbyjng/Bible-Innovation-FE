import React, { useState } from "react";
import { classNames } from "@/utils/helper";

interface Props {
  selected: string;
  setSelected: (val: string) => void;
  options: string[];
}

const Selector: React.FC<Props> = ({ selected, setSelected, options }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      className="bg-gray-300 rounded relative px-2 py-0.5 whitespace-nowrap cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      {selected}
      {open && (
        <div className="absolute z-50 bottom-[35px] left-0 bg-gray-300 rounded h-[100px] overflow-scroll">
          {options.map((option, index) => {
            if (option === selected) return;
            return (
              <div
                key={index}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                }}
                className="whitespace-nowrap px-2 py-0.5"
              >
                {option}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Selector;
