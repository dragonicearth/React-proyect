import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebase/cliente";
import { collection, getDocs } from "firebase/firestore";

const ProductContext = createContext();
export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productCollection = collection(db, "products");
                const querySnapshot = await getDocs(productCollection);
                const productsData = [];

                querySnapshot.forEach((doc) => {
                    productsData.push({ id: doc.id, ...doc.data() });
                });

                setProducts(productsData);
            } catch (error) {
                console.error("Error obteniendo productos:", error);
            }
        };

        fetchProducts();
    }, []);

    const updateProducts = async () => {
      try {
          const productCollection = collection(db, "products");
          const querySnapshot = await getDocs(productCollection);
          const productsData = [];

          querySnapshot.forEach((doc) => {
              productsData.push({ id: doc.id, ...doc.data() });
          });

          setProducts(productsData);
      } catch (error) {
          console.error("Error obteniendo productos:", error);
      }
  };

    return <ProductContext.Provider value={{products, updateProducts}}>{children}</ProductContext.Provider>;
}

export function useProducts() {
    return useContext(ProductContext);
}
