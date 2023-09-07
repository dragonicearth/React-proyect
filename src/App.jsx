import Router from "./router/router";
import { db } from "./firebase/cliente"
import { getDoc, doc } from "firebase/firestore"
import { useEffect } from "react";

function App() {

  const productRef = doc(db, "products", "NrtMzgVw0pd8KOgV8y5F")

  const getProducts = () => {
    getDoc(productRef).then((snapshot => {
      if (snapshot.exists()) {
        console.log({ id: snapshot.id, ...snapshot.data() });
      }
    }))
  }

  useEffect(() => {
    getProducts()
  }, [])

  return <Router />

}

export default App;