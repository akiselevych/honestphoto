//libs
import { getPlaiceholder } from "plaiceholder";
import Image from "next/image";
//types
import { PortfolioPhotoshoot } from "@/types";
//styles
import styles from "@/components/Portfolio/styles.module.scss";

export default async function ImageCard({
  image,
}: {
  image: PortfolioPhotoshoot;
}) {
  const buffer = await fetch(image.blurred_image).then(async (res) => {
    return Buffer.from(await res.arrayBuffer());
  });
  const { base64 } = await getPlaiceholder(buffer);
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
      placeholder="blur"
      blurDataURL={base64}
    />
  );
}
