import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constant/Colors";
import FontSize from "../constant/FontSize";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Navigation from "../component/navigation";
import { getMe, updateUser } from "../services/api";
import Return from "../component/return";

export type StackParamList = {
  Home: undefined;
  EditProfile: undefined;
  Profile: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "EditProfile"
>;

export default function EditProfileScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<any>();
  const [errorVisible, setErrorVisible] = useState(false);
  const [completedVisible, setCompletedVisible] = useState(false);
  const handleInscription = async () => {
    if (!nom || !prenom || !email) {
      setErrorVisible(true);
      return;
    } else {
      const user = {
        first_name: prenom,
        last_name: nom,
        email: email,
      };
      try {
        await updateUser(user);
        setCompletedVisible(true);
        setErrorVisible(false);
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <ImageBackground
      source={require("/assets/WelcomeBackground.png")}
      style={styles.container}
    >
      <Return onPress={() => navigation.navigate("Profile")} />
      {user && (
        <View style={styles.content}>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.circle}>
            <Image
              source={require("/assets/userpic.png")}
              style={styles.circle}
              resizeMode="cover"
            />
          </View>

          <TextInput
            placeholder={user.first_name}
            style={styles.pressable}
            onChangeText={(text) => setPrenom(text)}
          />
          <TextInput
            placeholder={user.last_name}
            style={styles.pressable}
            onChangeText={(text) => setNom(text)}
          />
          <TextInput
            placeholder={user.email}
            style={styles.pressable}
            onChangeText={(text) => setEmail(text)}
          />
          {errorVisible && (
            <Text style={styles.textError}>
              Veuillez remplir tous les champs requis.
            </Text>
          )}
          {completedVisible && (
            <Text style={styles.textValide}>
              Les modifications ont été pris en compte .
            </Text>
          )}
          <Pressable style={styles.button} onPress={handleInscription}>
            <Text style={styles.buttonText}>Modifier</Text>
          </Pressable>
        </View>
      )}
      <Navigation />
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
  textError: {
    width: "70%",
    fontSize: FontSize.small,
    color: Colors.error,
    fontFamily: "Roboto",
  },
  textValide: {
    width: "70%",
    fontSize: FontSize.small,
    color: "green",
    fontFamily: "Roboto",
  },
  title: {
    color: Colors.darkBlue,
    fontSize: FontSize.XXL,
    fontWeight: "700",
  },
  circle: {
    width: 150,
    height: 150,
    backgroundColor: Colors.primary,
    borderRadius: 100,
  },
  pressable: {
    width: "80%",
    height: "8%",
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 20,
    padding: 10,
    color: Colors.gray,
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    width: "80%",
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: FontSize.large,
    fontWeight: "500",
  },
});
