import type React from "react";

type ContainerProps = {
  children?: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="w-50 flex flex-col gap-5 bg-white ზ border border-gray-300 pl-10 pr-10 pt-5 pb-5 items-center hover:bg-red-500 hover:text-white cursor-pointer transition duration-300">
      {children}
    </div>
  );
}
