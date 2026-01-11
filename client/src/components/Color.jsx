import { useEffect, useState } from "react";

const Color = ({
  colors,
  colorWidth = 4,
  colorHeight = 4,
  outlineOffset = 2,
  colorLength = false,
}) => {
  const [selectedColor, setSelectedColor] = useState({ name: "", code: "" });

  let printColors = [];
  let printColorsLength = 0;

  if (Array.isArray(colors) && colors.length > 0) {
    if (colorLength) {
      // show only 4 colors + count
      printColors = colors.slice(0, 4);
      if (colors.length > 4) {
        printColorsLength = colors.length - 4;
      }
    } else {
      // show all colors
      printColors = colors;
    }
  }

  useEffect(() => {
    if (colors?.length > 0) {
      setSelectedColor({
        name: colors[0].name,
        code: colors[0].hex,
      });
    }
  }, [colors]);

  return (
    <div className="flex flex-col gap-2">
      {colors?.length > 0 && (
        <div>
          <b className="open-sans bg-slate-200 px-3 py-[1px] rounded-full text-sm">
            {selectedColor.name}
          </b>
        </div>
      )}

      <div className="flex items-center gap-2 px-1 flex-wrap">
        {printColors.map((color) => {
          const isWhite =
            color.hex.toLowerCase() === "#ffffff" ||
            color.hex.toLowerCase() === "white";

          return (
            <span
              key={color.hex}
              onClick={() =>
                setSelectedColor({
                  name: color.name,
                  code: color.hex,
                })
              }
              className={`inline-block rounded-full cursor-pointer
                ${
                  selectedColor.code === color.hex
                    ? "outline outline-1 outline-black"
                    : ""
                }
                ${isWhite ? "bg-white border border-gray-400" : ""}`}
              style={{
                width: `${colorWidth}px`,
                height: `${colorHeight}px`,
                backgroundColor: color.hex,
                outlineOffset: `${outlineOffset}px`,
              }}
            />
          );
        })}

        {colorLength && printColorsLength > 0 && (
          <b className="flex items-center open-sans">
            +{printColorsLength}
          </b>
        )}
      </div>
    </div>
  );
};

export default Color;
