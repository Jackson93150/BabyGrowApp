import {
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import Navigation from "../component/navigation";
import FontSize from "../constant/FontSize";

export type StackParamList = {
  Welcome: undefined;
  Recipe: undefined;
  Login: undefined;
  NewUser: undefined;
  RecipeInfo: { userId: any };
};

type RecipeInfoRouteProp = RouteProp<StackParamList, "RecipeInfo">;

export default function RecipeInfoScreen() {
  const route = useRoute<RecipeInfoRouteProp>();
  const userId = route.params?.userId;
  console.log(userId);
  return (
    <ImageBackground
      source={require("/assets/WelcomeBackground.png")}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{ uri: userId.cover.data.attributes.url }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.info}>{userId.description}</Text>
        <Text style={styles.title}>EQUIPEMENT :</Text>
        <Text style={styles.text}>{userId.equipement}</Text>
        <Text style={styles.title}>INGREDIENTS :</Text>
        <Text style={styles.text}>{userId.ingredient}</Text>
        <Text style={styles.title}>INSTRUCTIONS :</Text>
        <Text style={styles.textEnd}>{userId.instruction}</Text>
      </ScrollView>
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
    marginLeft: "5%",
  },
  logo: {
    height: "250px",
    aspectRatio: 1,
  },
  info: {
    textAlign: "center",
    fontSize: FontSize.medium,
    fontWeight: "600",
    width: "100%",
    marginBottom: 15,
  },
  title: {
    fontSize: FontSize.large,
    fontWeight: "800",
    width: "100%",
  },
  text: {
    fontSize: FontSize.medium,
    fontWeight: "600",
    width: "100%",
    marginBottom: 15,
  },
  textEnd: {
    fontSize: FontSize.medium,
    fontWeight: "600",
    width: "100%",
    marginBottom: 100,
  }
});
