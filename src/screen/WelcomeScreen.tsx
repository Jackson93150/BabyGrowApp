import {
  View,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";
import Colors from "../constant/Colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BabySlide from "../component/babySlider";
import CategoryCard from "../component/categoryCard";
import Navigation from "../component/navigation";

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

export default function WelcomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <ImageBackground
      source={require("/assets/WelcomeBackground.png")}
      style={styles.container}
    >
      <View style={styles.content}>
        <BabySlide />
        <View style={styles.grid}>
          <CategoryCard
            imageSource={require("/assets/food.png")}
            text={"Recette"}
            color={Colors.yellow}
          />
          <CategoryCard
            imageSource={require("/assets/blog.png")}
            text={"Blog"}
            color={Colors.pastelBlue}
          />
        </View>
        <View style={styles.grid}>
          <CategoryCard
            imageSource={require("/assets/doctor.png")}
            text={"Docteur"}
            color={Colors.pastelGreen}
          />
          <CategoryCard
            imageSource={require("/assets/activity.png")}
            text={"Activité"}
            color={Colors.pink}
          />
        </View>
      </View>
      <Navigation/>
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
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    height: "fit-content",
    marginTop: 20,
  },
  menu: {
    width: "100%",
    height: "6%",
    backgroundColor: Colors.primary,
    position: "absolute",
    bottom: 0,
  },
  menuItem: {
    width: "80%",
    height: "6%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    marginLeft: "10%",
    bottom: 15,
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "60%",
    height: "60%",
  }
});
