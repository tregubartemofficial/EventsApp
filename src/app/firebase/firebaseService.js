import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from "../config/firebase";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { signIn, updateAvatarPhoto } from "../features/auth/authReducer";
import { toggleModal } from "../features/modal/modalReducer";

const db = firebase.firestore();
const storage = firebase.storage();
const auth = getAuth();


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
export function addEventToFirestore(event, currUser) {
  return db.collection("events").add({
    ...event,
    hostedBy: currUser.displayName,
    hostPhotoURL: currUser.photoURL,
    attendees: firebase.firestore.FieldValue.arrayUnion({
      id: currUser.uid,
      name: currUser.displayName,
      photoURL: currUser.photoURL,
    }),
  });
}

export function updateEventsInFirestore(event) {
  return db.collection("events").doc(event.id).update(event);
}

// used in registration functions
export function setUserProfileData(user) {
  return setDoc(doc(db, "users", user.uid), {
    displayName: user.displayName,
    email: user.email,
    createdAt: Math.floor(Date.now() / 1000),
    uid: user.uid,
    photoURL: user?.photoURL
  });
}

// used in signIn and in Profile
export async function getUserProfile(userId) {
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
  email,
  password,
  dispatch,
  setHelperText
) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    const profile = await getUserProfile(user?.uid)
    dispatch(
      signIn({
        email: user.email,
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
  email,
  password,
  name,
  dispatch,
  setSubmitting,
  setHelperText,
  navigate
) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    dispatch(
      signIn({
        email: user.email,
        photoURL: null,
        uid: user.uid,
        displayName: name,
      })
    );
    await setUserProfileData({
      ...user,
      photoURL: null,
      displayName: name,
    });
    setSubmitting(false);
    navigate("/events");
  } catch (error) {
    setHelperText(`Problem with username or password`);
    setSubmitting(false);
  }
};

// used in AuthModal to reg logIn ands singIn
export async function socialLogin(dispatch, signIn) {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.additionalUserInfo.isNewUser) {
      await setUserProfileData(result.user);
    }
    const profile = await getUserProfile(result.user["_delegate"].uid);
    dispatch(
      signIn({
        email: profile.email,
        photoURL: result.user["_delegate"]?.photoURL,
        uid: profile.uid,
        displayName: profile.displayName,
      })
    );
  } catch (error) {
    console.log(error.message);
  }
}

// used in EditProfileModal
export async function updateUserProfile(profile) {
  const user = auth.currentUser;
  try {
    return await db.collection("users").doc(user.uid).update(profile);
  } catch (error) {
    throw error;
  }
}

// used in EditProfileModal
export async function updateUserAvatar(img, profile, dispatch) {
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
  const avatarURL = await getDownloadURL(imgRef)
  updateUserProfile({photoURL: avatarURL})
  dispatch(
    updateAvatarPhoto({
      photoURL: avatarURL,
    })
  );
}
