import { Image, StyleSheet, Pressable } from "react-native";
const Return = ({ onPress }: { onPress: () => void }) => {
  return (
    <Pressable style={styles.pressable} onPress={onPress}>
      <Image
        source={require("/assets/return.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  logo: {
    zIndex: 3,
    position: "absolute",
    top: 20,
    left: 10,
    width: 30,
    height: 30,
  },
  pressable: {
    zIndex: 3,
  },
});

export default Return;
