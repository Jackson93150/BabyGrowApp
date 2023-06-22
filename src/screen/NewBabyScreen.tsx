import {
  View,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constant/Colors";
import FontSize from "../constant/FontSize";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Navigation from "../component/navigation";
import { getMe, saveProfile } from "../services/api";
import PickerSelect from "../component/picker";
import Return from "../component/return";

const gender = [
  { label: "M", value: "Male" },
  { label: "F", value: "Fem" },
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

const relations = [
  { label: "Parents", value: "Parents" },
  { label: "Membre de la Famille", value: "Famille" },
  { label: "Ami", value: "Ami" },
  { label: "Autre", value: "Autre" },
];

export type StackParamList = {
  Welcome: undefined;
  NewBaby: undefined;
  Profile: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "NewBaby"
>;

export default function NewBabyScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [sexe, setSexe] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [relation, setRelation] = useState("");
  const [poids, setPoids] = useState("");
  const [taille, setTaille] = useState("");
  const [groupeSanguin, setGroupeSanguin] = useState("");
  const [prenom, setPrenom] = useState("");
  const [user, setUser] = useState<any>();
  const [errorVisible, setErrorVisible] = useState(false);
  const [completedVisible, setCompletedVisible] = useState(false);

  const handleInscription = async () => {
    if (!prenom || !sexe || !dateNaissance || !relation || !poids || !taille || !groupeSanguin) {
      setErrorVisible(true);
      return;
    } else {
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
        setErrorVisible(false);
        setCompletedVisible(true);
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <ImageBackground
      source={require("/assets/WelcomeBackground.png")}
      style={styles.container}
    >
      <Return onPress={() => navigation.navigate("Profile")}/>
      {user && (
        <View style={styles.content}>
          <Text style={styles.title}>Bébé</Text>
          <View style={styles.circle}>
          <Image
              source={require("/assets/baby.jpg")}
              style={styles.circle}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.textFieldName}>Prénom du bébé</Text>
          <TextInput
            placeholder="Prénom"
            style={styles.pressable}
            value={prenom}
            onChangeText={setPrenom}
          />
          <View style={styles.flexContainer}>
            <View style={styles.flexContainerBox}>
              <Text style={styles.flexContainerText}>Sexe</Text>
              <View style={styles.flexContainerPressableItem}>
                <PickerSelect
                  options={gender}
                  value={sexe}
                  onChange={setSexe}
                />
              </View>
            </View>
            <View style={styles.flexContainerBox}>
              <Text style={styles.flexContainerText}>Relation</Text>
              <View style={styles.flexContainerPressableItem}>
                <PickerSelect
                  options={relations}
                  value={relation}
                  onChange={setRelation}
                />
              </View>
            </View>
          </View>
          <View style={styles.flexContainer}>
            <View style={styles.flexContainerBox}>
              <Text style={styles.flexContainerText}>Poids</Text>
              <TextInput
                placeholder="0.00kg"
                style={styles.flexContainerItem}
                value={poids}
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9.]/g, ""); // Filtrer les caractères non numériques
                  setPoids(numericValue);
                }}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.flexContainerBox}>
              <Text style={styles.flexContainerText}>Taille</Text>
              <TextInput
                placeholder="0.00cm"
                style={styles.flexContainerItem}
                value={taille}
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9.]/g, ""); // Filtrer les caractères non numériques
                  setTaille(numericValue);
                }}
              />
            </View>
          </View>
          <View style={styles.flexContainer}>
            <View style={styles.flexContainerBox}>
              <Text style={styles.flexContainerText}>Née le</Text>
              <TextInput
                placeholder="Date de naissance (dd/mm/yyyy)"
                style={styles.flexContainerItem}
                value={dateNaissance}
                onChangeText={(text) => {
                  const numericValue = text.replace(/[^0-9]/g, "");
                  if (numericValue.length <= 8) {
                    let formattedValue = numericValue;
                    if (formattedValue.length >= 2) {
                      formattedValue =
                        formattedValue.slice(0, 2) +
                        "/" +
                        formattedValue.slice(2);
                    }
                    if (formattedValue.length >= 5) {
                      formattedValue =
                        formattedValue.slice(0, 5) +
                        "/" +
                        formattedValue.slice(5);
                    }
                    setDateNaissance(formattedValue);
                  }
                }}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.flexContainerBox}>
              <Text style={styles.flexContainerText}>Groupe</Text>
              <View style={styles.flexContainerPressableItem}>
                <PickerSelect
                  options={blood}
                  value={groupeSanguin}
                  onChange={setGroupeSanguin}
                />
              </View>
            </View>
          </View>
          {errorVisible && (
            <Text style={styles.textError}>
              Veuillez remplir tous les champs requis.
            </Text>
          )}
          {completedVisible && (
            <Text style={styles.textValide}>
              Les modifications ont été pris en compte .
            </Text>
          )}
          <Pressable style={styles.button} onPress={handleInscription}>
            <Text style={styles.buttonText}>Ajouter</Text>
          </Pressable>
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
    width: "100%",
    height: "95%",
    alignItems: "center",
    justifyContent: "center",
  },
  flexContainer: {
    width: "70%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flexContainerBox: {
    width: "45%",
  },
  flexContainerItem: {
    width: "100%",
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
    padding: 10,
    color: Colors.gray,
  },
  flexContainerPressableItem: {
    width: "100%",
    height: 38,
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    color: Colors.gray,
  },
  flexContainerText: {
    fontSize: FontSize.medium,
  },
  textFieldName: {
    width: "68%",
    fontSize: FontSize.medium,
  },
  textError: {
    width: "70%",
    fontSize: FontSize.small,
    color: Colors.error,
    fontFamily: "Roboto",
  },
  textValide: {
    width: "70%",
    fontSize: FontSize.small,
    color: "green",
    fontFamily: "Roboto",
  },
  title: {
    color: Colors.darkBlue,
    fontSize: FontSize.XXL,
    fontWeight: "700",
  },
  circle: {
    width: 150,
    height: 150,
    backgroundColor: Colors.primary,
    borderRadius: 100,
  },
  pressable: {
    width: "70%",
    height: "5%",
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginBottom: 10,
    padding: 10,
    color: Colors.gray,
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    width: "80%",
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: FontSize.large,
    fontWeight: "500",
  },
});
