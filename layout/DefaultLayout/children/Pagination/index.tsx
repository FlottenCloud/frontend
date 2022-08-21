import React from "react";
import { NextRouter, useRouter } from "next/router";
import * as Style from "./style";
import FigureImage from "components/common/FigureImage";
import PageItem from "./PageItem";

const BUTTON_WIDTH = 12;
const BUTTON_HEIGHT = 12;

const Pagination = ({ pages }) => {
  const router: NextRouter = useRouter();
  const block: number = 10;
  const currentPage: number = +router.query.page;
  const currentBlock: number = Math.floor((currentPage - 1) / block) + 1;
  const startPage: number = currentBlock * block - (block - 1);
  const endPage: number = Math.min(currentBlock * block, pages);

  const render = () => {
    const result = [];

    const isFirstPage = currentPage === 1;
    const firstPage = 1;
    result.push(
      <PageItem key={"firstPage"} page={!isFirstPage && firstPage}>
        <FigureImage
          width={BUTTON_WIDTH}
          height={BUTTON_HEIGHT}
          src={
            !isFirstPage ? "/images/left-arrow.png" : "/images/left-arrow.png"
          }
          alt={"firstPage"}
          borderRadius={50}
        />
      </PageItem>
    );

    const isExistPrev = startPage > 1;
    const prevPage = startPage - 1;
    result.push(
      <PageItem key={"prevPage"} page={isExistPrev && prevPage}>
        <FigureImage
          width={BUTTON_WIDTH}
          height={BUTTON_HEIGHT}
          src={
            isExistPrev ? "/images/left-arrow.png" : "/images/left-arrow.png"
          }
          alt={"prevPage"}
          borderRadius={50}
        />
      </PageItem>
    );

    for (let i = startPage; i <= endPage; i++) {
      const isCureentPage = i == currentPage;
      result.push(
        <PageItem key={i} page={!isCureentPage && i}>
          <Style.PageNumber isSelected={isCureentPage}>{i}</Style.PageNumber>
        </PageItem>
      );
    }

    const isExistNext = endPage < pages;
    const nextPage = endPage + 1;
    result.push(
      <PageItem key={"nextPage"} page={isExistNext && nextPage}>
        <FigureImage
          width={BUTTON_WIDTH}
          height={BUTTON_HEIGHT}
          src={
            isExistNext ? "/images/right-arrow.png" : "/images/right-arrow.png"
          }
          alt={"nextPage"}
          borderRadius={50}
        />
      </PageItem>
    );

    const isLastPage = currentPage === pages;
    const lastPage = pages;
    result.push(
      <PageItem key={"lastPage"} page={!isLastPage && lastPage}>
        <FigureImage
          width={BUTTON_WIDTH}
          height={BUTTON_HEIGHT}
          src={
            !isLastPage ? "/images/right-arrow.png" : "/images/right-arrow.png"
          }
          alt={"lastPage"}
          borderRadius={50}
        />
      </PageItem>
    );

    return result;
  };

  return (
    <Style.Pagination>
      <Style.PageList>{render()}</Style.PageList>
    </Style.Pagination>
  );
};

export default Pagination;
