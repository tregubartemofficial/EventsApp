import firebase from "../config/firebase";

const db = firebase.firestore();

export function dataFromSnapshot(snapshot) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();
  return {
    ...data,
    id: snapshot.id, // adding id
  };
}

export function listenToEventsFromFirestore() {
  return db.collection("events");
}

export function listenToEventFromFirestore(eventId) {
  return db.collection("events").doc(eventId);
}

export function addEventToFirestore(event) {
  return db.collection("events").add({
    ...event,
    hostedBy: "Anna",
    hostPhotoURL: "https://randomuser.me/api/portraits/women/70.jpg",
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: Math.random(),
      dispayName: "Anna",
      hostPhotoURL: "https://randomuser.me/api/portraits/women/70.jpg",
    }),
  });
}

export function updateEventsInFirestore(event) {
  return db.collection("events").doc(event.id).update(event);
}

// export function getUserProfile(userId) {
//   return doc(db, "users", userId);
// }