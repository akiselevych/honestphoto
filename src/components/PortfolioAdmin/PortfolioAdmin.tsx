"use client";

//libs
import Image from "next/image";
import { useState, useMemo, type FC } from "react";
import classNames from "classnames";

//redux
import { Action, ThunkAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/redux/hooks";
import { Status, updatePortfolioOrder } from "@/redux/slices/Portfolio.slice";

// components
import PortfolioCard from "./PortfolioCard/PortfolioCard";
import PortfolioCardWrapper from "./PortfolioCardWrapper/PortfolioCardWrapper";

//images
import spinner from "../../../public/images/icons/spinner.svg";

//styles
import styles from "./styles.module.scss";

// types
import { PortfolioPhotoshoot, RootState } from "@/types";

export type SomeActionType = {
  type: string;
  payload: any;
  meta: {
    requestStatus: string;
  };
};

interface PortfolioAdminProps {
  items: PortfolioPhotoshoot[];
  editingStatus: Status;
  deleteAction: (
    id: number
  ) => ThunkAction<Promise<SomeActionType>, RootState, unknown, Action<string>>;
}

const PortfolioAdmin: FC<PortfolioAdminProps> = ({
  items,
  editingStatus,
  deleteAction,
}) => {
  const dispatch = useAppDispatch();
  const [isDragging, setIsDragging] = useState(false);
  const [draggedOrder, setDraggedOrder] = useState<number | null>(null);

  const sortedItems = useMemo(() => {
    if (items && !!items.length) {
      const sortedArray = [...items];
      return sortedArray.sort((a, b) => a.order - b.order);
    }
    return [];
  }, [items]);

  const moveItem = (dragOrder: number, hoverOrder: number) => {
    const dragItem = items.find(
      (item) => item.order === dragOrder
    ) as PortfolioPhotoshoot;
    const hoverItem = items.find(
      (item) => item.order === hoverOrder
    ) as PortfolioPhotoshoot;

    dispatch(
      updatePortfolioOrder({
        dragItem: {
          id: dragItem.id,
          order: dragOrder,
        },
        hoverItem: {
          id: hoverItem.id,
          order: hoverOrder,
        },
      })
    );
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.content, {
            [styles.isDragging]: isDragging,
            [styles.isEditing]: editingStatus === Status.Pending,
          })}
        >
          {editingStatus === Status.Pending && (
            <div className={styles.spinner}>
              <Image
                width={70}
                height={70}
                src={spinner}
                alt="Spinner"
                className={styles.spiner}
              />
            </div>
          )}
          <div className={styles.bigCol}>
            {sortedItems?.map((img: PortfolioPhotoshoot, i: number) => {
              if ((img.order + 1) % 3 === 1) {
                return (
                  <PortfolioCardWrapper
                    setIsDragging={setIsDragging}
                    moveItem={moveItem}
                    image={img}
                    key={i}
                    deleteAction={deleteAction}
                  >
                    <PortfolioCard image={img} />
                  </PortfolioCardWrapper>
                );
              }
              return null;
            })}
          </div>
          <div className={styles.bigCol}>
            {sortedItems?.map((img: PortfolioPhotoshoot, i: number) => {
              if ((img.order + 1) % 3 === 2) {
                return (
                  <PortfolioCardWrapper
                    setIsDragging={setIsDragging}
                    moveItem={moveItem}
                    image={img}
                    key={i}
                    deleteAction={deleteAction}
                  >
                    <PortfolioCard image={img} />
                  </PortfolioCardWrapper>
                );
              }
              return null;
            })}
          </div>
          <div className={styles.bigCol}>
            {sortedItems?.map((img: PortfolioPhotoshoot, i: number) => {
              if ((img.order + 1) % 3 === 0) {
                return (
                  <PortfolioCardWrapper
                    setIsDragging={setIsDragging}
                    moveItem={moveItem}
                    image={img}
                    key={i}
                    deleteAction={deleteAction}
                  >
                    <PortfolioCard image={img} />
                  </PortfolioCardWrapper>
                );
              }
              return null;
            })}
          </div>

          <div className={styles.mediumCol}>
            {sortedItems?.map((img: PortfolioPhotoshoot, i: number) => {
              if (img.order % 2 !== 0) {
                return (
                  <PortfolioCardWrapper
                    setIsDragging={setIsDragging}
                    moveItem={moveItem}
                    image={img}
                    key={i}
                    deleteAction={deleteAction}
                  >
                    <PortfolioCard image={img} />
                  </PortfolioCardWrapper>
                );
              }
              return null;
            })}
          </div>
          <div className={styles.mediumCol}>
            {sortedItems?.map((img: PortfolioPhotoshoot, i: number) => {
              if (img.order % 2 === 0) {
                return (
                  <PortfolioCardWrapper
                    setIsDragging={setIsDragging}
                    moveItem={moveItem}
                    image={img}
                    key={i}
                    deleteAction={deleteAction}
                  >
                    <PortfolioCard image={img} />
                  </PortfolioCardWrapper>
                );
              }
              return null;
            })}
          </div>

          <div className={styles.smallCol}>
            {sortedItems?.map((img: PortfolioPhotoshoot, i: number) => (
              <PortfolioCardWrapper
                setIsDragging={setIsDragging}
                moveItem={moveItem}
                image={img}
                key={i}
                deleteAction={deleteAction}
              >
                <PortfolioCard image={img} />
              </PortfolioCardWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioAdmin;
