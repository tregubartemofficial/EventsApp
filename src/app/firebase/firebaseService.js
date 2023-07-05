import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();

  return {
    ...data,
    id: snapshot.id, // adding id
    date: data.date?.toDate().getTime() || data.date, // convert date format from fb to jsDateObj
  };
}

export function listenToEventsFromFirestore() {
  return db.collection("events");
}

export function listenToEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId);
}
