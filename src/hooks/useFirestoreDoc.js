import { useEffect } from "react";
import { dataFromSnapshot } from "../app/firebase/firebaseService";

export const useFirestoreDoc = ({ query, data, deps }) => {
  useEffect(() => {
    const unsubscribe = query().onSnapshot(
      (snapshot) => data(dataFromSnapshot(snapshot)),
      (error) => console.log(error) // need to add ErrComponent
    );
    return () => {
      unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deps]);
};
