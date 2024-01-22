import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getPaymentMethods = async (user) => {
  const docRef = doc(db, "users", user.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data().favorites);
    return { paymentMethods: docSnap.data()?.paymentMethods };
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
