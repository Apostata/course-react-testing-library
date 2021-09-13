import axios from "axios";

export const getScoopsOrToppings = async (type) => {
  try {
    const resp = await axios.get(`http://localhost:3030/${type}`);
    return resp.data || [];
  } catch (e) {
    return { message: e.response.data.errorMessage };
  }
};
