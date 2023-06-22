import { View, ImageBackground, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constant/Colors";
import CategoryCard from "../component/categoryCard";
import Navigation from "../component/navigation";
import { getActivity } from "../services/api";
import { getRandomColor } from "../utils/colors";
import Return from "../component/return";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  Welcome: undefined;
  Activity: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Activity"
>;

export default function ActivityScreen() {
  const [activity, setActivity] = useState<any>();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const response = await getActivity();
        setActivity(response.data.attributes.activity);
        console.log(response.data.attributes.activity);
      } catch (error) {
        console.log(error);
      }
    };
    fetchActivity();
  }, []);
  return (
    <ImageBackground
      source={require("/assets/WelcomeBackground.png")}
      style={styles.container}
    >
      <Return onPress={() => navigation.navigate("Welcome")} />
      {activity && (
        <View style={styles.content}>
          {activity.map((item: any, index: any) => (
            <CategoryCard
              key={index}
              imageSource={{ uri: item.cover.data.attributes.url }}
              text={item.titre}
              color={getRandomColor()}
              redirect={"ActivityInfo"}
              data={item}
            />
          ))}
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
    width: "90%",
    height: "100%",
    alignItems: "center",
    marginTop: "10%",
    marginLeft: "5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    alignContent: "flex-start",
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
  },
});
