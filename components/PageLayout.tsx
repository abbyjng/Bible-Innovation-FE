import React from "react";

interface Props {
  children: any;
  menuBar: any;
}

const PageLayout: React.FC<Props> = ({ children, menuBar }) => {
  return (
    <div className="h-screen w-screen flex flex-col justify-between">
      <div className="overflow-scroll">{children}</div>
      <div>{menuBar}</div>
    </div>
  );
};

export default PageLayout;
