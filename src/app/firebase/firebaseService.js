import firebase from "../config/firebase";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

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

export function setUserProfileData(user) {
  return setDoc(doc(db, "users", user.uid), {
    displayName: user.displayName,
    email: user.email,
    createdAt: serverTimestamp(),
  });
}

export function getUserProfile(userId) {
  return doc(db, "users", userId);
}

export async function socialLogin() {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    const result = await firebase.auth().signInWithPopup(provider)
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user)
    }
  } catch (error) {
    console.log(error.message);
  }
}

// export function getUserProfile(userId) {
//   return doc(db, "users", userId);
// }