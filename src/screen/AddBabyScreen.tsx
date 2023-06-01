import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  Pressable,
} from "react-native";
import React from "react";
import Colors from "../constant/Colors";
import FontSize from "../constant/FontSize";

export default function AddBabyScreen() {
  return (
    <ImageBackground
      source={require("/assets/Background.png")}
      style={styles.container}
    >
      <View style={styles.content}>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    height: "35%",
    width: "100%",
    marginTop: 60,
  },
  card: {
    height: "50%",
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    alignItems: "center",
  },
  textWelcome: {
    width: "80%",
    fontSize: FontSize.XL,
    color: Colors.darkText,
    marginTop: 50,
    marginBottom: 15,
    borderColor: "red",
    textAlign: "center",
    fontWeight: "bold",
  },
  textInfo: {
    fontSize: FontSize.small,
    width: "90%",
    textAlign: "center",
    color: Colors.primary,
    marginBottom: 20,
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    width: "70%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: FontSize.medium,
    fontWeight: "500",
    color: "white"
  },
});
