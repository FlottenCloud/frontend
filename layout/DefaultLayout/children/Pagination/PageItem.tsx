import React, { useCallback } from "react";
import { COLOR } from "constants/common/theme";
import { NextRouter, useRouter } from "next/router";
import Link from "next/link";
import * as Style from "./style";
import Image from "next/image";
import FigureImage from "../../../components/common/FigureImage";

interface PageItemProps {
  children;
  page?: number;
}

const PageItem = ({ children, page }: PageItemProps) => {
  const router = useRouter();

  const handlePageClick = useCallback(() => {
    router.push({ pathname: "", query: { ...router.query, page: page } });
  }, [router, page]);

  const activateItem = () => {
    return (
      <li onClick={handlePageClick} style={{ cursor: "pointer" }}>
        {children}
      </li>
    );
  };

  const deactiveItem = () => {
    return <li>{children}</li>;
  };

  const isActivate = page;

  return <>{isActivate ? activateItem() : deactiveItem()}</>;
};

export default PageItem;
