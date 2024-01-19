import { useNavigation } from "@react-navigation/native";
import { auth } from "../../firebase";

const navigation = useNavigation();

export const signOut = () => {
  auth.signOut();
  navigation.replace("Login");
};
