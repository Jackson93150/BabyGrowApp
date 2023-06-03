import {
  View,
  Image,
  StyleSheet,
  Text,
  ImageSourcePropType,
} from "react-native";

interface CategoryCardProps {
  imageSource: ImageSourcePropType;
  text: string;
  color: string;
}

const CategoryCard = ({ imageSource, text, color }: CategoryCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={imageSource} style={styles.picture} resizeMode="cover" />
      </View>
      <View style={[styles.bottomCard, { backgroundColor: color }]}>
        <Text style={styles.title}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "47%",
  },
  card: {
    width: "100%",
    height: 120,
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
