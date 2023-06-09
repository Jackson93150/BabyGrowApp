import {
  View,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import Colors from "../constant/Colors";
import FontSize from "../constant/FontSize";
import PickerSelect from "../component/picker";
import { saveProfile } from "../services/api";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

export type StackParamList = {
  AddBaby: undefined;
  Welcome: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "AddBaby"
>;

const gender = [
  { label: "M", value: "Male" },
  { label: "F", value: "Fem" },
];

const relations = [
  { label: "Parents", value: "Parents" },
  { label: "Membre de la Famille", value: "Famille" },
  { label: "Ami", value: "Ami" },
  { label: "Autre", value: "Autre" },
];

const blood = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
];

export default function AddBabyScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const [errorVisible, setErrorVisible] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [prenom, setPrenom] = useState("");
  const [sexe, setSexe] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [relation, setRelation] = useState("");
  const [poids, setPoids] = useState("");
  const [taille, setTaille] = useState("");
  const [groupeSanguin, setGroupeSanguin] = useState("");

  const handleNext = () => {
    if (!prenom || !sexe || !dateNaissance || !relation) {
      setErrorVisible(true);
      return;
    } else {
      console.log("Prénom du bébé:", prenom);
      console.log("Sexe:", sexe);
      console.log("Date de naissance:", dateNaissance);
      console.log("Relation:", relation);
      setErrorVisible(false);
      setIsChanged(true);
    }
  };
  const redirect = async () => {
    if (!poids || !taille || !groupeSanguin) {
      setErrorVisible(true);
      return;
    } else {
      setErrorVisible(false);
      const profile = {
        first_name: prenom,
        height: taille,
        weight: poids,
        gender: sexe,
        date_of_birth: dateNaissance,
        relationship: relation,
        bloodtype: groupeSanguin,
      };
      try {
        await saveProfile(profile);
        navigation.navigate("Welcome");
      } catch (error: any) {
        setErrorVisible(true);
      }
    }
  };
  return (
    <ImageBackground
      source={require("/assets/Background.png")}
      style={styles.container}
    >
      {!isChanged && (
        <View style={styles.content}>
          <Image
            source={require("/assets/baby1.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.textFieldName}>Prénom du bébé</Text>
          <TextInput
            placeholder="Prénom"
            style={styles.textFieldPlaceholder}
            value={prenom}
            onChangeText={setPrenom}
          />
          <Text style={styles.textFieldName}>Sexe</Text>
          <PickerSelect options={gender} value={sexe} onChange={setSexe} />
          <Text style={styles.textFieldName}>Date de naissance</Text>
          <TextInput
            placeholder="Date de naissance (dd/mm/yyyy)"
            style={styles.textFieldPlaceholder}
            value={dateNaissance}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9]/g, "");
              let formattedValue = numericValue;
              if (numericValue.length <= 8) {
                if (formattedValue.length >= 2) {
                  formattedValue =
                    formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
                }
                if (formattedValue.length >= 5) {
                  formattedValue =
                    formattedValue.slice(0, 5) + "/" + formattedValue.slice(5);
                }
                setDateNaissance(formattedValue);
              }
              if (formattedValue.length >= 10) {
                const year = formattedValue.slice(6, 10);
                const month = formattedValue.slice(3, 5);
                const day = formattedValue.slice(0, 2);
                const formattedDate = `${year}-${month}-${day}`;
                setDateNaissance(formattedDate);
              }
            }}
            keyboardType="numeric"
          />
          <Text style={styles.textFieldName}>Relation</Text>
          <PickerSelect
            options={relations}
            value={relation}
            onChange={setRelation}
          />
          {errorVisible && (
            <Text style={styles.textError}>
              Veuillez remplir tous les champs requis.
            </Text>
          )}
          <Pressable style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Suivant</Text>
          </Pressable>
        </View>
      )}
      {isChanged && (
        <View style={styles.content}>
          <Image
            source={require("/assets/baby2.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.textFieldName}>Poids à la naissance</Text>
          <TextInput
            placeholder="0.00kg"
            style={styles.textFieldPlaceholder}
            value={poids}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, ""); // Filtrer les caractères non numériques
              setPoids(numericValue);
            }}
            keyboardType="numeric"
          />
          <Text style={styles.textFieldName}>Taille à la naissance</Text>
          <TextInput
            placeholder="0.00cm"
            style={styles.textFieldPlaceholder}
            value={taille}
            onChangeText={(text) => {
              const numericValue = text.replace(/[^0-9.]/g, ""); // Filtrer les caractères non numériques
              setTaille(numericValue);
            }}
          />
          <Text style={styles.textFieldName}>Groupe sanguin</Text>
          <PickerSelect
            options={blood}
            value={groupeSanguin}
            onChange={setGroupeSanguin}
          />
          {errorVisible && (
            <Text style={styles.textError}>
              Veuillez remplir tous les champs requis.
            </Text>
          )}
          <Pressable style={styles.button} onPress={redirect}>
            <Text style={styles.buttonText}>Suivant</Text>
          </Pressable>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    height: "30%",
    marginBottom: 50,
  },
  textError: {
    width: "70%",
    fontSize: FontSize.small,
    color: Colors.error,
    fontFamily: "Roboto",
  },
  textFieldName: {
    width: "68%",
    fontSize: FontSize.medium,
    color: "white",
  },
  textFieldPlaceholder: {
    fontSize: FontSize.xs,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    width: "70%",
    color: Colors.gray,
    marginBottom: 15,
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
    width: "70%",
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: FontSize.medium,
    fontWeight: "500",
  },
  signUpText: {
    fontSize: FontSize.xs,
    color: "white",
  },
  singUpLink: {
    fontSize: FontSize.xs,
    color: Colors.active,
    paddingLeft: 5,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});
