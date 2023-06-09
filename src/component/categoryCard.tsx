import {useNavigation} from '@react-navigation/core';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  View,
  Image,
  StyleSheet,
  Text,
  ImageSourcePropType,
  Pressable,
} from "react-native";

interface CategoryCardProps {
  imageSource: ImageSourcePropType;
  text: string;
  color: string;
  data: any;
  redirect: keyof StackParamList;
}

export type StackParamList = {
  Welcome: undefined;
  Recipe: undefined;
  Blog: undefined;
  RecipeInfo: { userId: any };
  BlogInfo: { userId: any };
};

type WelcomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Welcome"
>;

const CategoryCard = ({ imageSource, text, color, redirect, data }: CategoryCardProps) => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  return (
    <Pressable
      style={styles.pressable}
      onPress={() => navigation.navigate(redirect, {userId: data} as any)}
      >
      <View style={styles.container}>
        <View style={styles.card}>
          <Image
            source={imageSource}
            style={styles.picture}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.bottomCard, { backgroundColor: color }]}>
          <Text style={styles.title}>{text}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    width: "47%",
  },
  container: {
    width: "100%",
  },
  card: {
    width: "100%",
    height: 120,
    marginTop: 20,
  },
  bottomCard: {
    width: "100%",
    height: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  picture: {
    width: "100%",
    height: "100%",
    marginBottom: 50,
  },
  title: {
    fontWeight: "500",
    textAlign: "center",
  },
});

export default CategoryCard;
