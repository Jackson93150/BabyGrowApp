import {
  View,
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
  BlogInfo: { userId: any };
};

type BlogInfoRouteProp = RouteProp<StackParamList, "BlogInfo">;

export default function BlogInfoScreen() {
  const route = useRoute<BlogInfoRouteProp>();
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
        <Text style={styles.text}>{userId.equipement}</Text>
        {userId.categorie.map((item: any, index: any) => (
          <View key={index}>
            <Text style={styles.title}>{item.nom} :</Text>
            <Text style={styles.text}>{item.description}</Text>
          </View>
        ))}
        <View style={styles.end}/>
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
  end: {
    marginBottom: 100,
  },
});
