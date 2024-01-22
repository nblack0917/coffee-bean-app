import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

export const updatePayments = async (user) => {
  const paymentMethods = [
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
  ];

  const userRef = doc(db, "users", user?.id);
  await updateDoc(userRef, {
    paymentMethods: paymentMethods,
  });
};
