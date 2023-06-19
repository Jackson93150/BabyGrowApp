import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import Navigation from "../component/navigation";
import FontSize from "../constant/FontSize";
import Return from "../component/return";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getRandomColor } from "../utils/colors";

const randColor = getRandomColor();

export type StackParamList = {
  Welcome: undefined;
  Recipe: undefined;
  Login: undefined;
  Blog: undefined;
  BlogInfo: { userId: any };
};

type BlogInfoRouteProp = RouteProp<StackParamList, "BlogInfo">;
type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "BlogInfo"
>;

export default function BlogInfoScreen() {
  const route = useRoute<BlogInfoRouteProp>();
  const userId = route.params?.userId;
  const navigation = useNavigation<HomeScreenNavigationProp>();
  console.log(userId);
  return (
    <View style={styles.container}>
      <Return onPress={() => navigation.navigate("Blog")} />
      <Text style={styles.name}>{userId.titre}</Text>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.subContent}>
          <Image
            source={{ uri: userId.cover.data.attributes.url }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.titleCard}>{userId.titre}</Text>
          <Text style={styles.text}>{userId.description}</Text>
          {userId.categorie.map((item: any, index: any) => (
            <View key={index}>
              <View style={styles.vectorContainer}>
                <Image
                  source={require("/assets/vector.png")}
                  style={styles.vector}
                  resizeMode="contain"
                />
                <Text style={styles.title}>{item.nom}</Text>
              </View>
              <Text style={styles.text}>{item.description}</Text>
            </View>
          ))}
          <View style={styles.end} />
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
  vectorContainer: {
    width: "100%",
    height: "fit-content",
    marginBottom: "20px",
  },
  vector: {
    height: "150px",
    aspectRatio: 1,
  },
  info: {
    textAlign: "center",
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
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: FontSize.medium,
    fontWeight: "700",
    height: "100%",
    width: "40%",
    left: "30%",
  },
  titleCard: {
    fontSize: FontSize.medium,
    fontWeight: "600",
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
  end: {
    marginBottom: 100,
  },
});
