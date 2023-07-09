import { useEffect } from "react";
import { dataFromSnapshot } from "../app/firebase/firebaseService";

export const useFirestoreCollection = ({ query, data, deps }) => {
  useEffect(() => {
    const unsubscribe = query().onSnapshot(
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => dataFromSnapshot(doc));
        data(docs);
      },
      (error) => console.log(error) // need to add ErrComponent
    );
    return () => {
      unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);
};
