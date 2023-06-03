import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "../constant/Colors";
import FontSize from "../constant/FontSize";

interface PickerSelectProps {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}

const PickerSelect = ({ options, value, onChange }: PickerSelectProps) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown]}
        data={options}
        maxHeight={100}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedStyle}
        labelField="label"
        valueField="value"
        placeholder="..."
        value={value}
        onChange={(item) => {
          onChange(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdown: {
    borderRadius: 10,
    backgroundColor: "white",
    width: "70%",
    marginBottom: 15,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: FontSize.xs,
    color: Colors.gray,
    padding: 10,
  },
  selectedStyle: {
    fontSize: FontSize.xs,
    padding: 10,
  }
});

export default PickerSelect;
