import axios from "axios";
import { useState } from "react";
export function useImages(type: string) {
  const [images, setImages] = useState([]);

  const getImages = async (retorno = false) => {
    const resp = await axios.get(`http://localhost:3030/${type}`);
    if (!retorno) {
      setImages(resp.data || []);
    } else {
      return resp.data || [];
    }
  };

  return {
    images,
    getImages,
  };
}
