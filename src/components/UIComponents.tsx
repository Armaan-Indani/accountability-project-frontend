import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>{children}</div>
);

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4 border-b">{children}</div>
);

export const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-lg font-semibold">{children}</h3>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-4">{children}</div>
);

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
}

export const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) => (
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

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", ...props }, ref) => (
  <input
    ref={ref}
    className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    {...props}
  />
));

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className = "", ...props }, ref) => (
  <textarea
    ref={ref}
    className={`border rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 ${className}`}
    {...props}
  />
));

interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const Checkbox = ({ checked, onCheckedChange }: CheckboxProps) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onCheckedChange(e.target.checked)}
    className="h-4 w-4 rounded border-gray-300"
  />
);

interface DialogProps {
  open: boolean;
  children: React.ReactNode;
}

export const Dialog = ({ open, children }: DialogProps) =>
  open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {children}
    </div>
  ) : null;

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogContent = ({
  children,
  className = "",
}: DialogContentProps) => (
  <div className={`bg-white rounded-lg p-6 w-full mx-4 ${className}`}>
    {children}
  </div>
);

interface DialogHeaderProps {
  children: React.ReactNode;
}

export const DialogHeader = ({ children }: DialogHeaderProps) => (
  <div className="mb-4">{children}</div>
);

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogTitle = ({ children, className = "" }: DialogTitleProps) => (
  <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
);

interface DialogCloseProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const DialogClose = ({ onClick }: DialogCloseProps) => (
  <button onClick={onClick} className="text-gray-500 hover:text-gray-700">
    &times;
  </button>
);
