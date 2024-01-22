import { auth } from "../../firebase";
import { collection, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../../firebase";
import { Keyboard } from "react-native";

export const register = async (name, email, password, photoURL) => {
  let uid = "";
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (authUser) => {
      uid = authUser.user.uid;
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });
    })
    .catch((error) => alert(error.message));

  const newUser = {
    id: uid,
    name: name,
    email: email,
    photoURL: photoURL,
    favorites: [],
    paymentMethods: [
      {
        name: "Credit Card",
        ccNum: "**** **** **** 1234",
        ccName: "Joe Schmoe",
        ccExpiry: "04/26",
        icon: "cc-visa",
        type: "font-awesome",
      },
      {
        name: "Wallet",
        fundAvailable: 50.75,
        icon: "wallet",
        type: "font-awesome-5",
      },
      {
        name: "Google Pay",
        icon: "google-wallet",
        type: "font-awesome",
      },
      {
        name: "Apple Pay",
        icon: "apple",
        type: "font-awesome",
      },
    ],
  };
  await setDoc(doc(db, "users", uid), newUser).then(Keyboard.dismiss());
};
