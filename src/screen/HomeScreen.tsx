import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import Colors from "../constant/Colors";
import FontSize from "../constant/FontSize";

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require("/assets/Background.png")}
      style={styles.container}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={require("/assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text
          style={{
            width: "68%",
            fontSize: FontSize.medium,
            color: "white",
            fontFamily: "Roboto",
          }}
        >
          Email
        </Text>
        <TextInput
          placeholder="example@gmail.com"
          style={{
            fontSize: FontSize.xs,
            padding: 10,
            borderRadius: 10,
            backgroundColor: "white",
            width: "70%",
            color: Colors.gray,
            marginBottom: 15,
          }}
        />
        <Text
          style={{
            width: "68%",
            fontSize: FontSize.medium,
            color: "white",
            fontFamily: "Roboto",
          }}
        >
          Mot de Passe
        </Text>
        <TextInput
          placeholder="example@gmail.com"
          style={{
            fontSize: FontSize.xs,
            padding: 10,
            borderRadius: 10,
            backgroundColor: "white",
            width: "70%",
            color: Colors.gray,
            marginBottom: 15,
          }}
        />
        <Pressable
          style={{
            padding: 8,
            borderRadius: 10,
            backgroundColor: "white",
            width: "70%",
            marginTop: 15,
            marginBottom: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FontSize.medium,
              fontWeight: "500",
            }}
          >
            Login
          </Text>
        </Pressable>
        <Text
          style={{
            fontSize: FontSize.xs,
            color: "white",
          }}
        >
          Si vous n'avez pas de compte
          <Text
            style={{
              fontSize: FontSize.xs,
              color: Colors.active,
              paddingLeft: 5,
              textDecorationLine: "underline",
            }}
          >
            Inscrivez-vous
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 130,
    width: "80%",
    marginBottom: 50,
  },
});
