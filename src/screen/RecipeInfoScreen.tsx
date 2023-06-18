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
  Recipe: undefined;
  Login: undefined;
  NewUser: undefined;
  RecipeInfo: { userId: any };
};

type RecipeInfoRouteProp = RouteProp<StackParamList, "RecipeInfo">;
type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "RecipeInfo"
>;

export default function RecipeInfoScreen() {
  const route = useRoute<RecipeInfoRouteProp>();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const userId = route.params?.userId;
  console.log(userId);
  return (
    <View style={styles.container}>
      <Return onPress={() => navigation.navigate("Recipe")} />
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
          <View style={styles.timeFlex}>
            <View style={styles.timeContainer}>
              <Text style={styles.textTimeUp}>Préparation</Text>
              <Text style={styles.textTimeDown}>
                {userId.tempsDePreparation} minutes
              </Text>
            </View>
            <View style={styles.timeContainer}>
              <Text style={styles.textTimeUp}>Cuisson</Text>
              <Text style={styles.textTimeDown}>
                {userId.tempsDeCuisson} minutes
              </Text>
            </View>
          </View>
          <View style={styles.totalTimeContainer}>
            <Text style={styles.textTimeUp}>Total</Text>
            <Text style={styles.textTimeDown}>
              {userId.tempsTotal} minutes
            </Text>
          </View>
          <Text style={styles.title}>Equipement</Text>
          <Text style={styles.text}>{userId.equipement}</Text>
          <Text style={styles.title}>Ingredients</Text>
          <Text style={styles.text}>{userId.ingredient}</Text>
          <Text style={styles.title}>Instructions</Text>
          <Text style={styles.textEnd}>{userId.instruction}</Text>
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
    aspectRatio: 1,
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
    marginBottom: 15,
  },
  timeContainer: {
    width: "45%",
    height: "100%",
    textAlign: "center",
  },
  totalTimeContainer: {
    width: "100%",
    height: "5%",
    textAlign: "center",
    marginBottom: "20px",
  },
  timeFlex: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: "5%",
    marginBottom: "20px",
  },
  textTimeUp: {
    fontSize: FontSize.small,
    fontWeight: "600",
    width: "100%",
    height: "50%",
    backgroundColor: Colors.gray,
  },
  textTimeDown: {
    fontSize: FontSize.small,
    fontWeight: "600",
    width: "100%",
    height: "50%",
    backgroundColor: randColor,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textEnd: {
    fontSize: FontSize.small,
    fontWeight: "600",
    width: "100%",
    marginBottom: 100,
  },
});
