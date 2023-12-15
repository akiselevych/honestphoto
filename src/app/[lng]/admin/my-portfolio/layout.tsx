"use client";

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface PortfolioLayoutProps {
  children: React.ReactNode;
}

const PortfolioLayout: React.FC<PortfolioLayoutProps> = ({ children }) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default PortfolioLayout;
