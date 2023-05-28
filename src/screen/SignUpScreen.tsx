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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "SignUp"
>;

export default function SignUpScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ImageBackground
      source={require("/assets/Background.png")}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={require("/assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.textFieldName}>Nom</Text>
        <TextInput
          placeholder="Entrez votre nom"
          style={styles.textFieldPlaceholder}
        />
        <Text style={styles.textFieldName}>Prénom</Text>
        <TextInput
          placeholder="Entrez votre prénom"
          style={styles.textFieldPlaceholder}
        />
        <Text style={styles.textFieldName}>Email</Text>
        <TextInput
          placeholder="example@gmail.com"
          style={styles.textFieldPlaceholder}
        />
        <Text style={styles.textFieldName}>Mot de Passe</Text>
        <TextInput placeholder="••••••••" style={styles.textFieldPlaceholder} />
        <Pressable style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Inscrivez-vous</Text>
        </Pressable>
        <Text style={styles.signUpText}>
          Si vous avez déjà un compte
          <Text style={styles.singUpLink} onPress={() => navigation.navigate('Home')}>Connectez-vous</Text>
        </Text>
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
    justifyContent: "center",
  },
  logo: {
    height: 130,
    width: "80%",
    marginBottom: 50,
  },
  textFieldName: {
    width: "68%",
    fontSize: FontSize.medium,
    color: "white",
    fontFamily: "Roboto",
  },
  textFieldPlaceholder: {
    fontSize: FontSize.xs,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    width: "70%",
    color: Colors.gray,
    marginBottom: 15,
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
    width: "70%",
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: FontSize.medium,
    fontWeight: "500",
  },
  signUpText: {
    fontSize: FontSize.xs,
    color: "white",
  },
  singUpLink: {
    fontSize: FontSize.xs,
    color: Colors.active,
    paddingLeft: 5,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
