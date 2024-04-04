import { Product } from "@/types/response";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useState, useEffect } from "react";

export const useFirebaseStorageURL = (product: Product) => {
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    const storage = getStorage();
    getDownloadURL(ref(storage, `images/${product.barcode}.jpg`))
      .then((url) => {
        setImgUrl(url)
      })
      .catch((error) => {
        setImgUrl("/products/loadFalse.jpg")
      })
  }, [product])
  return [imgUrl]
};