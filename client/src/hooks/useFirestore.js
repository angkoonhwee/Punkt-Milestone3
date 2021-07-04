import React, { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export default function useFirestore(collection) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    // clean up function: unsubscribe from the collection (stop collecting data) when we no longer needs it
    return () => unsub();
  }, [collection]);

  return { docs };
}
