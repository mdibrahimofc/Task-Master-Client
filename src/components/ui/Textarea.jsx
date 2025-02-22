import React from "react";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export default Textarea;
