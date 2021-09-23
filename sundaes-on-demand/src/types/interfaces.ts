export interface keyValue {
  [key: string | number | symbol]: string | number | Map<String, number>;
}

export interface keyValueNested {
  [key: string | number | symbol]: keyValue;
}
export interface Counters {
  scoops?: Map<string, number>;
  toppings?: Map<string, number>;
}

export interface NotNullCounters {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
}
