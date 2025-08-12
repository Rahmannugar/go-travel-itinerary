import { Spinner } from "./spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
}

export function Button({
  isLoading,
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`relative flex items-center justify-center gap-2 ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        children
      )}
    </button>
  );
}
