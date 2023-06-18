import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constant/Colors";
import FontSize from "../constant/FontSize";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Navigation from "../component/navigation";
import { getMe } from "../services/api";
import Return from "../component/return";

export type StackParamList = {
  Welcome: undefined;
  Profile: undefined;
  EditProfile: undefined;
  NewBaby: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Profile"
>;

export default function ProfileScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [user, setUser] = useState<any>();
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
      <Return onPress={() => navigation.navigate("Welcome")}/>
      {user && (
        <View style={styles.content}>
          <Text style={styles.title}>Mon Profil</Text>
          <View style={styles.circle} />
          <Text style={styles.name}>
            {user.first_name} {user.last_name}
          </Text>
          <Text style={styles.mail}>{user.email}</Text>
          <Pressable style={styles.pressable} onPress={() => navigation.navigate("EditProfile")}>
            <Image
              source={require("/assets/edit.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.text}>Modifier le profil</Text>
            <Image
              source={require("/assets/arrow.png")}
              style={styles.arrow}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable style={styles.pressable} onPress={() => navigation.navigate("NewBaby")}>
          <Image
              source={require("/assets/child.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.text}>Ajouter un bébé</Text>
            <Image
              source={require("/assets/arrow.png")}
              style={styles.arrow}
              resizeMode="contain"
            />
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
  title: {
    color: Colors.darkBlue,
    fontSize: FontSize.XXL,
    fontWeight: "700",
  },
  name: {
    color: Colors.darkBlue,
    fontSize: FontSize.XL,
    fontWeight: "700",
  },
  circle: {
    width: 150,
    height: 150,
    backgroundColor: Colors.primary,
    borderRadius: 100,
  },
  mail: {
    color: Colors.darkText,
  },
  pressable: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "80%",
    height: "10%",
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 20,
  },
  logo: {
    width: "10%",
    height: "80%",
  },
  arrow: {
    width: "5%",
    height: "60%",
  },
  text: {
    fontSize: FontSize.medium,
    color: Colors.darkText,
    fontWeight: "500",
  }
});
