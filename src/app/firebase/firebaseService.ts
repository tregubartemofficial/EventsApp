import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import firebase from './firebaseConfig';
import {
  doc,
  setDoc,
  arrayUnion,
  getDoc,
  DocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import {
  User,
  signIn,
  signOut,
  updateAvatarPhoto,
} from '../features/auth/authSlice';
import { toggleModal } from '../features/modal/modalSlice';
import {
  Comment,
  Event,
  Filter,
  setFilter,
} from '../features/event/eventSlice';
import { AppDispatch } from '../../store';
import { NavigateFunction } from 'react-router';
import { setFollowers } from '../features/profile/profileSlice';

const db = firebase.firestore();
const storage = firebase.storage();
const auth = getAuth();

// adds doc id to data
export const dataFromSnapshot = (snapshot: DocumentSnapshot<DocumentData>) => {
  if (!snapshot.exists) return undefined;
  const data = snapshot.data();
  return {
    ...data,
    id: snapshot.id, // adding id
  };
};

// used in fetch comments
export const firebaseObjectToArray = (data: any): Comment[] => {
  return Object.keys(data).map((key) => data[key]);
};

// used in EventList and ProfileContent
export const listenToEventsFromFirestore = (
  filter: Filter = 'ALL',
  profileUid?: string
) => {
  const user = auth.currentUser;
  let eventRef = db.collection('events').orderBy('date');
  if (user?.uid) {
    switch (filter) {
      case 'GOING':
        if (profileUid)
          return eventRef.where('attendeesUid', 'array-contains', profileUid);
        return eventRef.where('attendeesUid', 'array-contains', user?.uid);
      case 'HOSTING':
        return eventRef.where('uid', '==', user?.uid);
      default:
        return eventRef;
    }
  }
  return eventRef;
};

// used in EventDetailed
export const listenToEventFromFirestore = (eventId: string) => {
  return db.collection('events').doc(eventId);
};

// used in EventForm
export const addEventToFirestore = (event: Event, currUser: User) => {
  return db.collection('events').add({
    ...event,
    hostedBy: currUser.displayName,
    hostPhotoURL: currUser.photoURL,
    uid: currUser.uid,
    attendees: arrayUnion({
      uid: currUser.uid,
      name: currUser.displayName,
      photoURL: currUser.photoURL,
    }),
  });
};

// used in EventForm
export const updateEventsInFirestore = (event: Event) => {
  return db.collection('events').doc(event.id).update(event);
};

// used in registration functions
export const setUserProfileData = (user: any) => {
  return setDoc(doc(db, 'users', user.uid), {
    displayName: user.displayName,
    email: user.email,
    createdAt: user.createdAt,
    uid: user.uid,
    photoURL: user?.photoURL,
  });
};

// used in signIn and in Profile
export const getUserProfile = async (
  userId: string | string[]
): Promise<User | User[]> => {
  try {
    if (typeof userId === 'string') {
      const userRef = doc(db, 'users', userId);
      const docSnapshot = await getDoc(userRef);
      if (docSnapshot.exists()) {
        const userProfile: User = docSnapshot.data();
        return userProfile;
      } else return {} as User;
    } else {
      const userPromises: Promise<User>[] = userId.map(async (id) => {
        const userRef = doc(db, 'users', id);
        const docSnapshot = await getDoc(userRef);
        if (docSnapshot.exists()) return docSnapshot.data();
        else return {} as User;
      });

      const userProfiles = await Promise.all(userPromises);
      return userProfiles;
    }
  } catch (error) {
    return {} as User;
  }
};

// export async function getUserFollowers

// used in AuthModal
export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  dispatch: AppDispatch,
  setHelperText: React.Dispatch<React.SetStateAction<string>>,
  navigate: NavigateFunction
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
    dispatch(toggleModal('auth'));
    navigate('/events');
  } catch (error) {
    setHelperText('Something went wrong with email or password');
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
        photoURL: '',
        displayName: name,
        email: user.email,
        createdAt: Math.floor(Date.now() / 1000),
      };
      await setUserProfileData(userProfileData);
    }

    navigate('/events');
  } catch (error) {
    setHelperText(`Problem with username or password`);
  }
};

// used in AuthModal and RegisterForm to register and singIn
export const socialLogin = async (
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  try {
    const result = await firebase.auth().signInWithPopup(provider);
    if (result.user) {
      if (result.additionalUserInfo && result.additionalUserInfo.isNewUser) {
        await setUserProfileData({
          uid: result.user.uid,
          photoURL: result.user.photoURL,
          displayName: result.user?.displayName,
          email: result.user.email,
          createdAt: Math.floor(Date.now() / 1000),
        });
      }
      const profile: any = await getUserProfile(result.user.uid);
      dispatch(
        signIn({
          email: profile.email,
          photoURL: result.user?.photoURL,
          uid: profile.uid,
          displayName: profile.displayName,
        })
      );
      navigate('/events');
    }
  } catch (error: any) {
    console.log(error.message);
  }
};

export const signOutFromFirebase = async (
  dispatch: AppDispatch,
  navigate: NavigateFunction
) => {
  try {
    await auth.signOut();
    dispatch(signOut());
    dispatch(setFilter('ALL'));
    navigate('/');
  } catch (error) {
    console.log(error);
  }
};

// used in EditProfileModal
export const updateUserProfile = async (profile: User) => {
  const user = auth.currentUser;
  try {
    return await db.collection('users').doc(user?.uid).update(profile);
  } catch (error) {
    throw error;
  }
};

// used in EditProfileModal
export const updateUserAvatar = async (
  img: File,
  profile: User,
  dispatch: AppDispatch
) => {
  if (profile.photoURL) {
    try {
      const previousAvatarRef = storage.refFromURL(profile.photoURL);
      await previousAvatarRef.delete();
    } catch (error) {
      console.error('Error deleting previous avatar photo:', error);
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
};

// used in EventDetailed
export const updateAttendees = async (
  eventId: string,
  currUser: User,
  action: 'ADD' | 'REMOVE'
) => {
  try {
    const eventRef = db.collection('events').doc(eventId);
    const eventDoc = await eventRef.get();
    const eventData = eventDoc.data();
    let updatedAttendees = [...eventData?.attendees];

    if (action === 'ADD') {
      updatedAttendees.push({
        name: currUser.displayName,
        uid: currUser.uid,
        photoURL: currUser.photoURL,
      });
    } else if (action === 'REMOVE') {
      updatedAttendees = updatedAttendees.filter(
        (attendee) => attendee.uid !== currUser.uid
      );
    }

    await eventRef.update({
      attendees: updatedAttendees,
      attendeesUid: updatedAttendees.map((attendee) => attendee.uid),
    });
  } catch (error) {
    console.error('Error updating attendees:', error);
  }
};

// used in ProfileHeader
export const updateFollowers = async (
  followerUid: string,
  followingUid: string,
  action: 'FOLLOW' | 'UNFOLLOW',
  dispatch: AppDispatch
) => {
  const followerRef = db.collection('users').doc(followerUid);
  const followingRef = db.collection('users').doc(followingUid);

  const followerDoc = await followerRef.get();
  const followingDoc = await followingRef.get();

  let { followingUIDs }: any = followerDoc.data();
  let { followerUIDs }: any = followingDoc.data();

  try {
    if (action === 'FOLLOW') {
      followerUIDs.push(followerUid);
      followingUIDs.push(followingUid);
    } else if (action === 'UNFOLLOW') {
      followerUIDs = followerUIDs.filter(
        (follower: string) => follower !== followerUid
      );
      followingUIDs = followingUIDs.filter(
        (following: string) => following !== followingUid
      );
    }

    await followerRef.update({ followingUIDs: followingUIDs });
    await followingRef.update({ followerUIDs: followerUIDs });
    dispatch(setFollowers(followerUIDs));
  } catch (error) {
    console.error('Error updating followers:', error);
  }
};

export const addEventChatComment = async (eventId: string, comment: string) => {
  const user = auth.currentUser;
  const newComment = {
    displayName: user?.displayName,
    photoURL: user?.photoURL,
    uid: user?.uid,
    text: comment,
    date: Date.now(),
  };
  return firebase.database().ref(`chat/${eventId}`).push(newComment);
};

export const getEventChatRef = (eventId: string) => {
  return firebase.database().ref(`chat/${eventId}`).orderByKey();
};
