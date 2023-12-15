//libs
import { FC } from "react";
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
//types
import {
  ArtPhotoshoot,
  DefaultPhotoshoot,
  LocationPhotoshoot,
  RootState,
} from "@/types";
//styles
import styles from "./styles.module.scss";
//components
import PhotoshootCard from "@/components/PhotoshootList/PhotoshootCard/PhotoshootCard";


type SomeActionType = {
  type: string;
  payload: any;
  meta: {
    requestStatus: string;
  };
};

type Props = {
  items: Partial<DefaultPhotoshoot | LocationPhotoshoot | ArtPhotoshoot>[];
  deleteAction?: (
    id: number
  ) => ThunkAction<Promise<SomeActionType>, RootState, unknown, Action<string>>;
};
const PhotoshootList: FC<Props> = ({ items, deleteAction }) => {
  return (
    <div className={styles.container}>
      {items.map((item) => (
        <div className={styles.cardWrapper} key={item.id}>
          <PhotoshootCard item={item} deleteAction={deleteAction} />
        </div>
      ))}
    </div>
  );
};

export default PhotoshootList;
