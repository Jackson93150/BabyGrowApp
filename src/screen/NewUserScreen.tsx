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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  NewUser: undefined;
  AddBaby: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "NewUser"
>;

export default function NewUserScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <ImageBackground
      source={require("/assets/Background.png")}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={require("/assets/couple.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.card}>
          <Text style={styles.textWelcome}>
            Bonjour! Bienvenue sur BabyGrow
          </Text>
          <Text style={styles.textInfo}>
            Avec notre application, vous pouvez obtenir toute l'aide dont vous
            avez besoin pour prendre soin de votre bébé
          </Text>
          <Text style={styles.textInfo}>Parlez-nous un peu de votre bébé</Text>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("AddBaby")}
          >
            <Text style={styles.buttonText}>Ajoutez un bébé</Text>
          </Pressable>
        </View>
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
    color: "white",
  },
});
