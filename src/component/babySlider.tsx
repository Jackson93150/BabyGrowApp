import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Colors from "../constant/Colors";
import FontSize from "../constant/FontSize";
import { getBabies } from "../services/api";

const BabySlide = () => {
  const [babies, setBabies] = useState<any>();
  useEffect(() => {
    const fetchBabies = async () => {
      try {
        const response = await getBabies();
        setBabies(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBabies();
  }, []);
  return (
    <View style={styles.container}>
      {babies && (
        <View style={[styles.card]}>
          <Text style={styles.name}>{babies[0].first_name}</Text>
          <Text style={styles.info}>N'a rien de prévu</Text>
        </View>
      )}
      <View style={styles.subCard} />
      <View style={styles.picture}>
        <Image
          source={require("/assets/baby.jpg")}
          resizeMode="cover"
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  picture: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: Colors.primary,
    borderRadius: 50,
    top: -50,
  },
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  card: {
    backgroundColor: "white",
    width: "80%",
    height: 120,
    alignItems: "center",
  },
  name: {
    textAlign: "center",
    fontSize: FontSize.large,
    color: Colors.darkBlue,
    fontWeight: "700",
    width: "80%",
    marginTop: 50,
  },
  info: {
    textAlign: "center",
    fontSize: FontSize.medium,
    fontWeight: "600",
    width: "90%",
  },
  subCard: {
    width: "80%",
    height: 30,
    backgroundColor: Colors.pink,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  logo: {
    height: "100%",
    width: "100%",
    borderRadius: 50,
  }
});

export default BabySlide;
