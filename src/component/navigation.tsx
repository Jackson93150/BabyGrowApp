import { View, Image, StyleSheet, Pressable, Text } from "react-native";
import Colors from "../constant/Colors";
import FontSize from "../constant/FontSize";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export type StackParamList = {
  Welcome: undefined;
  Profile: undefined;
  Vaccin: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Welcome"
>;

const Navigation = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  return (
    <>
      <View style={styles.menu}></View>
      <View style={styles.menuItem}>
        <View style={styles.container}>
          <Pressable
            style={styles.circle}
            onPress={() => navigation.navigate("Welcome")}
          >
            <Image
              source={require("/assets/home.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.textItem}>Acceuil</Text>
        </View>
        <View style={styles.container}>
          <Pressable style={styles.circle} onPress={() => navigation.navigate("Vaccin")}>
            <Image
              source={require("/assets/injection.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.textItem}>Vaccin</Text>
        </View>
        <View style={styles.container}>
          <Pressable
            style={styles.circle}
            onPress={() => navigation.navigate("Profile")}
          >
            <Image
              source={require("/assets/user.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </Pressable>
          <Text style={styles.textItem}>Profile</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  menu: {
    width: "100%",
    height: "6%",
    backgroundColor: Colors.primary,
    position: "absolute",
    bottom: 0,
  },
  menuItem: {
    width: "100%",
    height: "6%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "absolute",
    bottom: 20,
  },
  container: {
    width: "20%",
    alignItems: "center",
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
  textItem: {
    color: "white",
    fontSize: FontSize.xs,
  },
});

export default Navigation;
