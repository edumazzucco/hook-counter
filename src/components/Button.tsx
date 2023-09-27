export default function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="border-2 rounded-md p-2 w-32 disabled:border-red-400 disabled:cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
}
