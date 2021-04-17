import { ManagerTypes } from "./ManagerTypes";

export type ManagerParams<T extends ManagerTypes> = Optional<{
  [key in keyof T]: T[key]
}>
