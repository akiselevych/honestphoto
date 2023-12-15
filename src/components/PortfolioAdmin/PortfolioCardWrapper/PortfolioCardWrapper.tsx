
//libs
import { Status } from "@/redux/slices/Portfolio.slice";
import { type Action, type ThunkAction } from "@reduxjs/toolkit";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useDrag, useDrop } from "react-dnd";
import { motion } from "framer-motion";
import { useAppDispatch } from "@/redux/hooks";
import classNames from "classnames";
// images
import deleteIcon from "../../../../public/images/icons/delete.svg";
import editIcon from "../../../../public/images/icons/edit.svg";
// types
import { type SomeActionType } from "../PortfolioAdmin";
import { RootState, type PortfolioPhotoshoot } from "@/types";
// styles
import styles from "./styles.module.scss";


interface PortfolioCardWrapperProps {
  children: React.ReactNode;
  image: PortfolioPhotoshoot;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  deleteAction: (
    id: number
  ) => ThunkAction<Promise<SomeActionType>, RootState, unknown, Action<string>>;
}

const PortfolioCardWrapper: React.FC<PortfolioCardWrapperProps> = ({
  children,
  image,
  setIsDragging,
  deleteAction,
  moveItem,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [deleteStatus, setDeleteStatus] = React.useState<string>(
    Status.Rejected
  );
  const [dragIndex, setDragIndex] = React.useState<number | null>(null);
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: { order: image.order },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ highlighted, hovered }, drop] = useDrop({
    accept: "item",
    drop(item: { order: number }) {
      setDragIndex(null);
      setIsDragging(false);

      const dragOrder = item.order;
      const hoverOrder = image.order;

      moveItem(dragOrder, hoverOrder);
    },
    collect: (monitor) => ({
      highlighted: monitor.canDrop(),
      hovered: monitor.isOver(),
    }),
    hover(item: { order: number }, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.order;
      const hoverIndex = image.order;

      setIsDragging(true);

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY =
        clientOffset && clientOffset.y - hoverBoundingRect.top;

      if (hoverClientY) {
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
      }
    },
  });

  drag(drop(ref));

  const handleDelete = (id: number) => {
    if (deleteAction) {
      dispatch(deleteAction(id)).then((res) => {
        if (res.meta.requestStatus === "rejected") {
          setDeleteStatus("rejected");
        }
      });
    }
  };

  const variants = {
    open: (i: number) => ({
      y: i * 68,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    }),
    closed: { y: 0, transition: { damping: 20, stiffness: 400 } },
  };

  return (
    <motion.div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      initial={{ scale: 1 }}
      animate={{ scale: isDragging ? 1.05 : 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        key={image.id}
        variants={variants}
        initial="closed"
        animate="open"
        exit="closed"
        style={{ width: "100%" }}
        className={styles.wrapper}
      >
        <div className={styles.overlay}></div>
        <div
          className={classNames(styles.overlayHovered, {
            [styles.overlayHoveredActive]: hovered,
          })}
        ></div>
        <button
          className={styles.deleteBtn}
          onClick={() => handleDelete(image.id)}
        >
          <div className={styles.deleteBtnWrapper}>
            <Image src={deleteIcon} width={18} height={18} alt="Delete Icon" />
          </div>
        </button>
        <Link
          className={styles.editBtn}
          href={`/admin/my-portfolio/${image.id}`}
        >
          <div className={styles.editBtnWrapper}>
            <Image src={editIcon} width={18} height={18} alt="Edit Icon" />
          </div>
        </Link>
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PortfolioCardWrapper;
