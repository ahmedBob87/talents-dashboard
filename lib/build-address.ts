import { IUser } from "@/redux/api";

export const buildAddress = ({ suite, street, city }: IUser["address"]) =>
  `${suite}, ${street}, ${city}`;
