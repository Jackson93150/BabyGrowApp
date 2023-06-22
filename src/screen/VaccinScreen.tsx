import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constant/Colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Navigation from "../component/navigation";
import { getBabies, getVaccins } from "../services/api";
import FontSize from "../constant/FontSize";

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

export default function VaccinScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [babies, setBabies] = useState<any>();
  const [vaccins, setVaccins] = useState<any>();
  useEffect(() => {
    const fetchBabies = async () => {
      try {
        const response = await getBabies();
        setBabies(response);
        const responseVaccin = await getVaccins(response.map((baby: any) => baby.id));
        setVaccins(responseVaccin);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBabies();
  }, []);
  console.log(vaccins);
  return (
    <ImageBackground
      source={require("/assets/WelcomeBackground.png")}
      style={styles.container}
    >
      {babies && (
        <View style={styles.content}>
          <View style={styles.topFlex}>
            <View style={styles.picture} />
            <View style={styles.flexName}>
              <Text style={styles.name}>{babies[0].first_name}</Text>
              <Text style={styles.textBold}>
                {babies[0].height}cm / {babies[0].weight}kg
              </Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
              <Text style={styles.name}>{babies[0].first_name}</Text>
              <Text style={styles.textBold}>
                {babies[0].height}cm / {babies[0].weight}kg
              </Text>
            </View>
          </ScrollView>
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
  },
  scrollContent: {
    width: "80%",
    marginLeft: "10%",
  },
  card: {
    width: "100%",
    height: "fit-content",
    backgroundColor: "white",
    borderRadius: 20,
  },
  picture: {
    width: 100,
    height: 100,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  topFlex: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    height: "fit-content",
    marginTop: 50,
  },
  flexName: {
    marginTop: 15,
    marginLeft: 10,
  },
  name: {
    fontSize: FontSize.large,
    color: Colors.darkBlue,
    fontWeight: "700",
  },
  textBold: {
    fontSize: FontSize.small,
    color: Colors.darkText,
    fontWeight: "700",
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
  },
});
