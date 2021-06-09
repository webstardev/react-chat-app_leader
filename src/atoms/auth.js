import { atom } from "recoil";

export interface Auth {
  id: Number;
  username: String;
  token: string;
}

export const authState = atom({
  key: "authState",
  default: null,
});
