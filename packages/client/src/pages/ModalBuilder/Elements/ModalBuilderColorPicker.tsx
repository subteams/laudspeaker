import React, { FC, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import ArrowRight from "@heroicons/react/20/solid/ChevronRightIcon";
import { useClickAway } from "react-use";
import { createPortal } from "react-dom";

interface ModalBuilderColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  className?: string;
}

const validHexChars = "1234567890ABCDEFabcdef";

const ModalBuilderColorPicker: FC<ModalBuilderColorPickerProps> = ({
  color,
  onChange,
  className,
}) => {
  const [isColorPickerModalOpen, setIsColorPickerModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pickerRef = useRef(null);

  useClickAway(pickerRef, () => {
    setIsColorPickerModalOpen(false);
  });

  const inputRect = ref.current?.getBoundingClientRect();
  const left = inputRect ? inputRect.left - (220 - inputRect.width) : 0;
  const top = (inputRect?.top || 0) + 30;

  return (
    <div ref={ref} className="relative">
      <input
        type="text"
        className={`!m-0 max-w-[70px] max-h-[26px] text-[12px] rounded-md bg-transparent border-white focus:border-white focus:ring-transparent p-[4px] pl-[20px] ${
          className ? className : ""
        }`}
        value={color}
        onChange={(e) =>
          onChange(
            "#" +
              e.target.value
                .replaceAll("#", "")
                .split("")
                .filter((char) => validHexChars.includes(char))
                .join("")
                .substring(0, 6)
          )
        }
      />
      <div
        className="absolute w-[15px] h-[15px] top-1/2 left-[4px] -translate-y-1/2 rounded cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setIsColorPickerModalOpen((prev) => !prev)}
      />
      {isColorPickerModalOpen &&
        createPortal(
          <div
            ref={pickerRef}
            style={{
              left: left + "px",
              ...(top + 332 > document.body.clientHeight
                ? { bottom: "0px" }
                : { top: top + "px" }),
            }}
            className="absolute select-none z-[2147483647] bg-white text-black"
          >
            <div
              className="flex justify-end items-center px-[10px] cursor-pointer"
              onClick={() => setIsColorPickerModalOpen(false)}
            >
              X
            </div>
            <SketchPicker
              color={color}
              onChange={(newColor) => onChange(newColor.hex)}
            />
          </div>,
          document.body
        )}
      <ArrowRight
        className="absolute w-[20px] h-[16px]  cursor-pointer right-[2px] top-[50%] -translate-y-1/2"
        onClick={() => setIsColorPickerModalOpen((prev) => !prev)}
      />
    </div>
  );
};

export default ModalBuilderColorPicker;
