
export const Button=({ children, className = "", variant = "primary", ...props })=>{
    const baseStyle =
      variant === "outline"
        ? "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
        : "bg-blue-600 text-white hover:bg-blue-700";
  
    return (
      <button
        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${baseStyle} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  