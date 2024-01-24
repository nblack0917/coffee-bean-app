import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export const getFavorites = async (user) => {
  const docRef = doc(db, "users", user.id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data()?.favorites;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
};
