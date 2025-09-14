import { useState, useRef, useEffect, useCallback } from "react";

export const Popover = ({
  buttonContent,
  children,
  placement = "bottom",
  open,
  closeOnClick = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (typeof open === "boolean") {
      setIsOpen(open);
    }
  }, [open]);

  // Placement classes mapping
  const placementClasses = {
    top: "bottom-full mb-2 left-1/2 transform -translate-x-1/2",
    "top-left": "bottom-full mb-2 left-0",
    "top-right": "bottom-full mb-2 right-0",
    bottom: "top-full mt-2 left-1/2 transform -translate-x-1/2",
    "bottom-left": "top-full mt-2 left-0",
    "bottom-right": "top-full mt-2 right-0",
    left: "right-full mr-2 top-1/2 transform -translate-y-1/2",
    right: "left-full ml-2 top-1/2 transform -translate-y-1/2",
    "bottom-full": "top-full left-0 w-full max-h-60 overflow-auto ",
  };

  const classes = placementClasses[placement] || placementClasses.bottom;

  const handleClick = useCallback(() => {
    if (closeOnClick) {
      setIsOpen(false);
    }
  }, [closeOnClick]);

  return (
    <div
      className={`relative inline-block text-left ${className || ""}`}
      ref={popoverRef}
    >
      <button
        className={className || ""}
        onClick={() => !open && setIsOpen(!isOpen)}
      >
        {buttonContent}
      </button>

      {isOpen && children && (
        <div
          onClick={handleClick}
          className={`absolute z-10 ${classes} bg-neutral-700 border border-neutral-800 rounded shadow-lg w-56 transition-transform duration-200 ease-out`}
        >
          <div className="px-2 py-1.5">{children}</div>
        </div>
      )}
    </div>
  );
};
