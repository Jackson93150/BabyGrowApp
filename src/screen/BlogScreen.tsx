import { View, ImageBackground, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constant/Colors";
import CategoryCard from "../component/categoryCard";
import Navigation from "../component/navigation";
import { getBlogs } from "../services/api";

export default function BlogScreen() {
  const [blog, setBlogs] = useState<any>();
  useEffect(() => {
    const fetchBabies = async () => {
      try {
        const response = await getBlogs();
        setBlogs(response.data.attributes.blog);
        console.log(response.data.attributes.blog);
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
      {blog && (
        <View style={styles.content}>
          {blog.map((item: any, index: any) => (
            <CategoryCard
              key={index}
              imageSource={{ uri: item.cover.data.attributes.url }}
              text={item.titre}
              color={Colors.gray}
              redirect={"BlogInfo"}
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
});
