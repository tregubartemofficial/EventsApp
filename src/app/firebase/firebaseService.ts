import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import firebase from "./firebaseConfig";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { User, signIn, updateAvatarPhoto } from "../features/auth/authSlice";
import { toggleModal } from "../features/modal/modalSlice";
import { Event, Filter } from "../features/event/eventSlice";
import { AppDispatch } from "../../store";
import { NavigateFunction } from "react-router";

const db = firebase.firestore();
const storage = firebase.storage();
const auth = getAuth();

// adds doc id to data
export function dataFromSnapshot(snapshot: any) {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();
  return {
    ...data,
    id: snapshot.id, // adding id
  };
}

// used in EventList and ProfileContent
export function listenToEventsFromFirestore(
  filter: Filter = "ALL",
  profileUid?: string
) {
  const user = auth.currentUser;
  let eventRef = db.collection("events").orderBy("date");
  if (user?.uid) {
    switch (filter) {
      case "GOING":
        if (profileUid)
          return eventRef.where("attendeesUid", "array-contains", profileUid);
        return eventRef.where("attendeesUid", "array-contains", user?.uid);
      case "HOSTING":
        return eventRef.where("uid", "==", user?.uid);
      default:
        return eventRef;
    }
  }
  return eventRef;
}

// used in EventDetailed
export function listenToEventFromFirestore(eventId: string) {
  return db.collection("events").doc(eventId);
}

// used in EventForm
export function addEventToFirestore(event: Event, currUser: User) {
  return db.collection("events").add({
    ...event,
    hostedBy: currUser.displayName,
    hostPhotoURL: currUser.photoURL,
    uid: currUser.uid,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      uid: currUser.uid,
      name: currUser.displayName,
      photoURL: currUser.photoURL,
    }),
  });
}

// used in EventForm
export function updateEventsInFirestore(event: Event) {
  return db.collection("events").doc(event.id).update(event);
}

// used in registration functions
export function setUserProfileData(user: any) {
  return setDoc(doc(db, "users", user.uid), {
    displayName: user.displayName,
    email: user.email,
    createdAt: user.createdAt,
    uid: user.uid,
    photoURL: user?.photoURL,
  });
}

// used in signIn and in Profile
export async function getUserProfile(userId: string): Promise<User> {
  const userRef = doc(db, "users", userId);
  return new Promise((resolve, reject) => {
    onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        resolve(doc.data());
      } else {
        console.log("Document does not exist");
        reject(new Error("Document does not exist"));
      }
    });
  });
}

// used in AuthModal
export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  dispatch: AppDispatch,
  setHelperText: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const profile: any = await getUserProfile(user?.uid);
    dispatch(
      signIn({
        email: profile.email,
        photoURL: profile?.photoURL,
        uid: user.uid,
        displayName: profile.displayName,
      })
    );
    dispatch(toggleModal("auth"));
  } catch (error) {
    setHelperText("Something went wrong with email or password");
  }
};

// used in RegisterForm
export const registerWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string,
  dispatch: AppDispatch,
  setHelperText: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (user.email !== null) {
      dispatch(
        signIn({
          email: user.email,
          photoURL: user?.photoURL,
          uid: user.uid,
          displayName: name,
        })
      );

      const userProfileData: User = {
        uid: user.uid,
        photoURL: "",
        displayName: name,
        email: user.email,
        createdAt: Math.floor(Date.now() / 1000),
      };
      await setUserProfileData(userProfileData);
    }

    navigate("/events");
  } catch (error) {
    setHelperText(`Problem with username or password`);
  }
};

// used in AuthModal to reg logIn ands singIn
export async function socialLogin(dispatch: AppDispatch) {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    console.log(result);
    // if (result.user) {
    //   if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
    //     await setUserProfileData({
    //       uid: result.user.uid,
    //       photoURL: result.user["_delegate"]?.photoURL,
    //       displayName: result.user?.displayName,
    //       email: result.user.email,
    //       createdAt: Math.floor(Date.now() / 1000),
    //     });
    //   }
    //   const profile:any = await getUserProfile(result.user["_delegate"].uid);
    //   dispatch(
    //     signIn({
    //       email: profile.email,
    //       photoURL: result.user["_delegate"]?.photoURL,
    //       uid: profile.uid,
    //       displayName: profile.displayName,
    //     })
    //   );
    // }
  } catch (error: any) {
    console.log(error.message);
  }
}

// used in EditProfileModal
export async function updateUserProfile(profile: User) {
  const user = auth.currentUser;
  try {
    return await db.collection("users").doc(user?.uid).update(profile);
  } catch (error) {
    throw error;
  }
}

// used in EditProfileModal
export async function updateUserAvatar(img: File, profile: User, dispatch: AppDispatch) {
  if (profile.photoURL) {
    try {
      const previousAvatarRef = storage.refFromURL(profile.photoURL);
      await previousAvatarRef.delete();
    } catch (error) {
      console.error("Error deleting previous avatar photo:", error);
    }
  }
  const imgRef = ref(storage, `userAvatars/${img.name}${profile.createdAt}`);
  await uploadBytes(imgRef, img);
  const avatarURL = await getDownloadURL(imgRef);
  updateUserProfile({ photoURL: avatarURL });
  dispatch(
    updateAvatarPhoto({
      photoURL: avatarURL,
    })
  );
}

// used in EventDetailed
export async function updateAttendees(
  eventId: string,
  currUser: User,
  action: string
) {
  try {
    const eventRef = db.collection("events").doc(eventId);
    const eventDoc = await eventRef.get();
    const eventData = eventDoc.data();
    // const userRef = db.collection("users").doc(currUser.uid);
    // const userDoc = await userRef.get();
    // const userData = userDoc.data();

    let updatedAttendees = [...eventData?.attendees];

    if (action === "ADD") {
      updatedAttendees.push({
        name: currUser.displayName,
        uid: currUser.uid,
        photoURL: currUser.photoURL,
      });
    } else if (action === "REMOVE") {
      updatedAttendees = updatedAttendees.filter(
        (attendee) => attendee.uid !== currUser.uid
      );
    } else {
      throw new Error("Invalid action specified.");
    }
    await eventRef.update({
      attendees: updatedAttendees,
      attendeesUid: updatedAttendees.map((attendee) => attendee.uid),
    });
  } catch (error) {
    console.error("Error updating attendees:", error);
  }
}
