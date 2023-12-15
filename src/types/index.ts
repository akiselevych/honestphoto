import { store } from "@/redux/store";
import { StaticImageData } from "next/image";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type LoginFormInputs = {
  username: string;
  password: string;
};
export type T = {
  [key: string]: any;
};

export type DefaultPhotoshoot = {
  id: number;
  title: string;
  price: string;
  image: StaticImageData | FormData | string;
  width: number;
  height: number;
  style_variant: number;
};

export type LocationPhotoshoot = DefaultPhotoshoot & {
  date: string;
};

export type ArtPhotoshoot = DefaultPhotoshoot & {
  old_price: number;
  description: string;
};

export type PortfolioPhotoshoot = {
  id: number;
  image: StaticImageData | FormData | string;
  width: number;
  height: number;
  blurred_image: string;
  order: number;
};

export type Review = {
  id: number;
  title: string;
  description: string;
};

export type FAQ = {
  id: number;
  title: string;
  description: string;
};

export type HeroType = {
  id: number;
  name: string;
  image: StaticImageData | FormData | string;
};

export interface ITranslateProp {
  t: (key: string) => string;
}