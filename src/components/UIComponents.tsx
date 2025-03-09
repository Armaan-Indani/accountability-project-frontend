import React from "react";

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

export const CardHeader = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

export const CardTitle = ({ children }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

export const CardContent = ({ children }) => <div className="p-4">{children}</div>;

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}) => (
  <button
    onClick={onClick}
    className={`
      px-2 py-3 ml-2 rounded-md font-medium
      ${
        variant === "primary"
          ? "bg-indigo-600 text-white hover:bg-indigo-700"
          : "border border-gray-300 hover:bg-gray-50"
      }
      ${size === "sm" ? "text-sm px-2 py-1" : ""}
      ${className}
    `}
  >
    {children}
  </button>
);

export const Input = React.forwardRef(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    {...props}
  />
));

export const Textarea = React.forwardRef(({ className = "", ...props }, ref) => (
  <textarea
    ref={ref}
    className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    {...props}
  />
));

export const Checkbox = ({ checked, onCheckedChange }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="h-4 w-4 rounded border-gray-300"
  />
);

export const Dialog = ({ open, children }) =>
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {children}
    </div>
  ) : null;

export const DialogContent = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg p-6 w-full mx-4 ${className}`}>
    {children}
  </div>
);

export const DialogHeader = ({ children }) => <div className="mb-4">{children}</div>;

export const DialogTitle = ({ children, className = "" }) => (
  <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
);

export const DialogClose = ({ onClick }) => (
  <button onClick={onClick} className="text-gray-500 hover:text-gray-700">
    &times;
  </button>
);
