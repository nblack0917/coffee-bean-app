import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "@rneui/themed";
import * as ImagePicker from "expo-image-picker";
import uuid from "react-native-uuid";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import config from "../config";
import { storage } from "../firebase";
import getBlobFromUri from "../utils/getBlobFromURI";
import { register } from "../utils/auth/signUp";
import {
  validatePassword,
  matchPassword,
  errorResponse,
} from "../utils/auth/validatePassword";

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const storageRef = ref(storage, "avatars/" + uuid.v4());

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const blob = await getBlobFromUri(result.assets[0].uri);
      const metadata = {
        contentType: "image/jpeg",
      };
      const uploadTask = uploadBytesResumable(storageRef, blob, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              break;

            // ...

            case "storage/unknown":
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setPhotoURL(downloadURL);
          });
        }
      );
    }
  };

  const handleRegister = () => {
    const validate = validatePassword(password);
    const match = matchPassword(password, confirmPassword);

    if ((name?.length > 0) & (email?.length > 0) && validate.isValid && match) {
      setLoading(true);
      setErrorMessage("");
      register(name, email, password, photoURL);
    } else {
      const errors = {
        name: name.length > 0,
        email: email.length > 0,
        validate: validate.isValid,
        match: match,
      };
      const errorResponseMessage = errorResponse(errors);
      setErrorMessage(errorResponseMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container} className="flex-1">
      <ScrollView className="flex-1">
        <View className="flex-1 items-center">
          <View className="flex-row items-center ml-5 relative">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.5}
              className="absolute left-0 z-50"
            >
              <Icon name="arrow-back" type="ionicon" size={32} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-xl my-10 font-light flex-1 text-center mr-4">
              Sign up to start ordering
            </Text>
          </View>
          <TouchableOpacity
            onPress={pickImage}
            style="relative"
            className="mb-4"
          >
            <Icon
              name="plus-circle"
              type="font-awesome"
              size={45}
              color={config.color.ORANGE}
              containerStyle={{
                position: "absolute",
                right: 0,
                bottom: 10,
                zIndex: 50,
              }}
            />
            <Image
              source={
                !image
                  ? require("../assets/profileCupPlaceholder.png")
                  : { uri: image }
              }
              resizeMode="contain"
              style={{
                width: 150,
                height: 150,
                marginBottom: 20,
                borderRadius: 150 / 2,
              }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Full Name"
            style={styles.input}
            placeholderTextColor={config.color.LT_GRAY}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            placeholder="Email Address"
            style={styles.input}
            placeholderTextColor={config.color.LT_GRAY}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            placeholderTextColor={config.color.LT_GRAY}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            placeholder="Confirm Password"
            style={styles.input}
            secureTextEntry
            placeholderTextColor={config.color.LT_GRAY}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            className="w-7/12 p-5 rounded-3xl mt-5"
            style={
              !name || !email || !password
                ? styles.buttonDisabled
                : styles.button
            }
            activeOpacity={0.5}
            // disabled={!name || !email || !password}
            onPress={handleRegister}
          >
            <View className="flex-grow items-center">
              <Text className="text-white text-xl font-semibold">
                {loading ? (
                  <ActivityIndicator size="large" color="#ffffff" />
                ) : (
                  "Register"
                )}
              </Text>
            </View>
          </TouchableOpacity>
          {errorMessage && (
            <Text className="text-red-500 p-5 font-light text-center">
              {errorMessage}
            </Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: config.color.BLACK,
  },
  input: {
    width: "90%",
    backgroundColor: config.color.GRAY,
    borderRadius: 100,
    height: 55,
    color: config.color.LT_GRAY,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: config.color.ORANGE,
  },
  buttonDisabled: {
    backgroundColor: config.color.MD_GRAY,
  },
});
