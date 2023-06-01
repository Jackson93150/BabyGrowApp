import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constant/Colors";
import FontSize from "../constant/FontSize";
import { login } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  NewUser: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Home"
>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [errorVisible, setErrorVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const redirectConnexion = async () => {
    try {
      const data = {
        email: email,
        password: motDePasse,
      };
      await login(data);
      navigation.navigate("NewUser");
    } catch (error: any) {
      setErrorVisible(true);
    }
  };

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
        <Text style={styles.textFieldName}>Email</Text>
        <TextInput
          placeholder="example@gmail.com"
          style={styles.textFieldPlaceholder}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.textFieldName}>Mot de Passe</Text>
        <TextInput
          placeholder="••••••••"
          secureTextEntry={true}
          style={styles.textFieldPlaceholder}
          value={motDePasse}
          onChangeText={(text) => setMotDePasse(text)}
        />
        {errorVisible && (
          <Text style={styles.textError}>
            Email et/ou mot de passe invalide.
          </Text>
        )}
        <Pressable style={styles.button} onPress={redirectConnexion}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Text style={styles.signUpText}>
          Si vous n'avez pas de compte
          <Text
            style={styles.singUpLink}
            onPress={() => navigation.navigate("SignUp")}
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
  textError: {
    width: "70%",
    fontSize: FontSize.small,
    color: Colors.error,
    fontFamily: "Roboto",
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
