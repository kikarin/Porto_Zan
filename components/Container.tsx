import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`mx-auto max-w-7xl px-2 md:px-2 lg:px-2 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
