import { Keyboard } from "react-native";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then(Keyboard.dismiss())
    .catch((error) => alert(error.message));
};
