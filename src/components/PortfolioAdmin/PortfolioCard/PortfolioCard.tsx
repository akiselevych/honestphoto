"use client";
//libs
import React from "react";
import Image from "next/image";
//types
import { PortfolioPhotoshoot } from "@/types";
//styles
import styles from "@/components/Portfolio/styles.module.scss";

export default function PortfolioCard({
  image,
}: {
  image: PortfolioPhotoshoot;
}) {
  const calculateImageHeights = (image: PortfolioPhotoshoot) => {
    const aspectRatioH = image.width / image.height;
    const aspectRatioV = image.height / image.width;
    const newHeight =
      (aspectRatioH > aspectRatioV ? 340 : 600) /
      (aspectRatioH > aspectRatioV ? aspectRatioH : aspectRatioV);
    return newHeight;
  };

  return (
    <Image
      className={styles.item}
      src={image.image as string}
      alt="Portfolio image"
      width={image.width}
      height={calculateImageHeights(image)}
    />
  );
}
