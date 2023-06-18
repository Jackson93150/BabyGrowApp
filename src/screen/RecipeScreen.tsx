import { View, ImageBackground, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constant/Colors";
import CategoryCard from "../component/categoryCard";
import Navigation from "../component/navigation";
import { getRecipes } from "../services/api";
import { getRandomColor } from "../utils/colors";

export default function RecipeScreen() {
  const [recipe, setRecipes] = useState<any>();
  useEffect(() => {
    const fetchBabies = async () => {
      try {
        const response = await getRecipes();
        setRecipes(response.data.attributes.recette);
        console.log(response.data.attributes.recette);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBabies();
  }, []);
  return (
    <ImageBackground
      source={require("/assets/WelcomeBackground.png")}
      style={styles.container}
    >
      {recipe && (
        <View style={styles.content}>
          {recipe.map((item: any, index: any) => (
            <CategoryCard
              key={index}
              imageSource={{ uri: item.cover.data.attributes.url }}
              text={item.titre}
              color={getRandomColor()}
              redirect={"RecipeInfo"}
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
