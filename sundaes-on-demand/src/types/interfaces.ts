import { Key } from "react-transition-group/node_modules/@types/react";

export interface keyValue {
  [key: Key]: string | number | Map<String, number>;
}

export interface keyValueNested {
  [key: Key]: keyValue;
}
export interface Counters {
  scoops?: Map<string, number>;
  toppings?: Map<string, number>;
}
