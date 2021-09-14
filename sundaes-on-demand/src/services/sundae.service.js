import axios from "axios";

export const getScoopsOrToppings = async (type) => {
  try {
    const resp = await axios.get(`http://localhost:3030/${type}`);
    return resp.data || [];
  } catch (e) {
    return { message: e.response.data.errorMessage };
  }
};

export const postOrder = async (order) => {
  try {
    const resp = await axios.post("http://localhost:3030/order", order);
    return resp.data;
  } catch (e) {
    return { message: e.response.data.errorMessage };
  }
};
