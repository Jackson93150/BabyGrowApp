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
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { saveUser } from "../services/api";

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

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [errorVisible, setErrorVisible] = useState(false);
  const [errorEmailVisible, setErrorEmailVisible] = useState(false);

  const handleInscription = async () => {
    if (!nom || !prenom || !email || !motDePasse) {
      setErrorVisible(true);
      return;
    } else {
      const user = {
        first_name: nom,
        last_name: prenom,
        email: email,
        password: motDePasse,
      };
      try {
        await saveUser(user);
        navigation.navigate("Home");
      } catch (error: any) {
        setErrorEmailVisible(true)
      }
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
        <Text style={styles.textFieldName}>Nom</Text>
        <TextInput
          placeholder="Entrez votre nom"
          style={styles.textFieldPlaceholder}
          value={nom}
          onChangeText={(text) => setNom(text)}
        />
        <Text style={styles.textFieldName}>Prénom</Text>
        <TextInput
          placeholder="Entrez votre prénom"
          style={styles.textFieldPlaceholder}
          value={prenom}
          onChangeText={(text) => setPrenom(text)}
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
          style={styles.textFieldPlaceholder}
          value={motDePasse}
          onChangeText={(text) => setMotDePasse(text)}
        />
        {errorVisible && (
          <Text style={styles.textError}>
            Veuillez remplir tous les champs requis.
          </Text>
        )}
        {errorEmailVisible && (
          <Text style={styles.textError}>
            L'Email que vous avez utilisé est déjà utilisé ou invalide.
          </Text>
        )}
        <Pressable style={styles.button} onPress={handleInscription}>
          <Text style={styles.buttonText}>Inscrivez-vous</Text>
        </Pressable>
        <Text style={styles.signUpText}>
          Si vous avez déjà un compte
          <Text
            style={styles.singUpLink}
            onPress={() => navigation.navigate("Home")}
          >
            Connectez-vous
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
