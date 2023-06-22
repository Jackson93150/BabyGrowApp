import { Text, Image, StyleSheet, ScrollView, View } from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import Navigation from "../component/navigation";
import FontSize from "../constant/FontSize";
import { getRandomColor } from "../utils/colors";
import Return from "../component/return";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Colors from "../constant/Colors";

const randColor = getRandomColor();

export type StackParamList = {
  Welcome: undefined;
  Activity: undefined;
  Login: undefined;
  NewUser: undefined;
  ActivityInfo: { userId: any };
};

type ActivityInfoRouteProp = RouteProp<StackParamList, "ActivityInfo">;
type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "ActivityInfo"
>;

export default function ActivityInfoScreen() {
  const route = useRoute<ActivityInfoRouteProp>();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const userId = route.params?.userId;
  console.log(userId);
  return (
    <View style={styles.container}>
      <Return onPress={() => navigation.navigate("Activity")} />
      <Text style={styles.name}>{userId.titre}</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.subContent}>
          <Image
            source={{ uri: userId.cover.data.attributes.url }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.titleCard}>{userId.titre}</Text>
          <Text style={styles.info}>{userId.description}</Text>
          <Text style={styles.title}>Equipement</Text>
          <Text style={styles.text}>{userId.equipment}</Text>
        </View>
      </ScrollView>
      <Navigation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: randColor,
  },
  content: {
    width: "100%",
    marginTop: "20%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  subContent: {
    width: "80%",
  },
  logo: {
    height: "250px",
    borderRadius: 25,
    aspectRatio: 1,
    marginTop: "20px",
    marginBottom: "20px",
  },
  info: {
    fontSize: FontSize.small,
    fontWeight: "600",
    width: "100%",
    marginBottom: 15,
  },
  name: {
    fontSize: FontSize.large,
    width: "100%",
    fontWeight: "500",
    position: "absolute",
    top: 20,
    textAlign: "center",
  },
  title: {
    fontSize: FontSize.medium,
    fontWeight: "800",
    width: "100%",
  },
  titleCard: {
    fontSize: FontSize.medium,
    fontWeight: "700",
    backgroundColor: randColor,
    width: "fit-content",
    padding: "15px",
    paddingLeft: "30px",
    paddingRight: "30px",
    borderRadius: 20,
    marginBottom: "20px",
  },
  text: {
    fontSize: FontSize.small,
    fontWeight: "600",
    width: "100%",
    marginBottom: 100,
  },
  textEnd: {
    fontSize: FontSize.small,
    fontWeight: "600",
    width: "100%",
    marginBottom: 100,
  },
});
