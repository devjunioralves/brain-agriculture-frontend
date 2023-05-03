import React from "react";
import NavComponent from "../../navigation/Nav/NavComponent";

interface Props {
  children: any;
}

const BaseLayoutComponent: React.FC<Props> = ({ children }) => (
  <>
    <NavComponent />
    {children}
  </>
);

export default BaseLayoutComponent;
