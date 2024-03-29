import { ReactNode } from "react";

const Button = (props: PropsTypes) => {
  const { title = "", variant = "fill", onClick, icon = "", disabled = false, loading = false, fill = true, noSpace = false, type = "button", className = "", size = "default" } = props;

  let sizeClass = variant === "outline" ? " py-[calc(0.75rem-1px)]" : " py-3";
  if (size === "small") sizeClass = variant === "outline" ? " py-[calc(0.375rem-1px)]" : " py-1.5";
  else if (size === "large") sizeClass = variant === "outline" ? " py-[calc(1rem-1px)]" : " py-4";

  const _className = `${className} truncate relative flex justify-center items-center z-10
      ${
        disabled
          ? "cursor-not-allowed " + (variant === "fill" ? "bg-disable" : "bg-transparent")
          : loading
          ? "cursor-progress " + (variant === "fill" ? "bg-disable" : "bg-transparent")
          : variant === "fill"
          ? "text-white bg-secondary from-secondary to-primary hover:bg-gradient-to-l"
          : "text-gray-600 bg-translate border border-gray-400 hover:bg-gray-100"
      }
      
      font-medium rounded text-sm px-8 ${sizeClass} text-center
      ${noSpace ? " mb-0" : " mb-6"}
      ${fill ? " w-full" : ""}
  `;

  return (
    <button
      //
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={_className}
    >
      {loading ? (
        <svg aria-hidden="true" role="status" className="inline h-4 w-4 animate-spin text-white ms-3" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="#E5E7EB"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <>
          {icon}
          {title && <span className="ms-1">{title}</span>}
        </>
      )}
    </button>
  );
};

type PropsTypes = {
  type?: "button" | "submit";
  title?: string;
  variant?: "fill" | "outline";
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fill?: boolean;
  noSpace?: boolean;
  onClick?: any;
  size?: "small" | "default" | "large";
};

export default Button;
