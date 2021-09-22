import { keyValue } from "../types/interfaces";
import axios from "axios";

interface Error {
  response: {
    data: {
      errorMessage: string;
    };
  };
}

export const getScoopsOrToppings = async (
  type: String
): Promise<keyValue | Array<keyValue> | void> => {
  try {
    const resp = await axios.get(`http://localhost:3030/${type}`);
    return resp.data || [];
  } catch (e: unknown) {
    if (e && (e as Error).response) {
      return { message: (e as Error).response.data.errorMessage };
    } else {
      console.log(e);
    }
  }
};

export const postOrder = async (
  order: Object
): Promise<keyValue | Array<keyValue> | void> => {
  try {
    const resp = await axios.post("http://localhost:3030/order", order);
    return resp.data;
  } catch (e: unknown) {
    if (e && (e as Error).response) {
      return { message: (e as Error).response.data.errorMessage };
    } else {
      console.log(e);
    }
  }
};
