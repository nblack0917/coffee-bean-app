import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getOrderHistory = async (user) => {
  const docRef = doc(db, "users", user.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data().favorites);
    return docSnap.data()?.orderHistory;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const addToFBOrderHistory = async (user, newOrder) => {
  const docRef = doc(db, "users", user.id);
  const docSnap = await getDoc(docRef);
  let prevHistory;
  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data().favorites);
    prevHistory = docSnap.data()?.orderHistory;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  await updateDoc(docRef, {
    orderHistory: [...prevHistory, newOrder],
  });
};
