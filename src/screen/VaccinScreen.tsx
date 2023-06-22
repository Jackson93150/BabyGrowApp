import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../constant/Colors";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Navigation from "../component/navigation";
import {
  getBabies,
  getVaccins,
  edditVaccin,
  saveVaccin,
  deleteVaccin,
  getWeight,
  getHeight,
  saveWeight,
  edditWeight,
  edditHeight,
  saveHeight,
} from "../services/api";
import FontSize from "../constant/FontSize";
import Chart from "../component/chart";
import { Dropdown } from "react-native-element-dropdown";

export type StackParamList = {
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  Vaccin: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  StackParamList,
  "Home"
>;

const month = [
  { label: "0", value: "0" },
  { label: "3", value: "3" },
  { label: "6", value: "6" },
  { label: "9", value: "9" },
  { label: "12", value: "12" },
  { label: "15", value: "15" },
  { label: "18", value: "18" },
  { label: "21", value: "21" },
  { label: "24", value: "24" },
];

export default function VaccinScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [babies, setBabies] = useState<any>();
  const [vaccins, setVaccins] = useState<any>();
  const [babyWeight, setBabyWeight] = useState<any>();
  const [babyHeight, setBabyHeight] = useState<any>();
  const [addStatus, setAddStatus] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputDose, setInputDose] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [error2, setError2] = useState<boolean>(false);
  const [chartParentWidth, setChartParentWidth] = useState(0);
  const [addWeight, setAddWeight] = useState<boolean>(false);
  const [addHeight, setAddHeight] = useState<boolean>(false);
  const [weightInput, setWeightInput] = useState<string>();
  const [weightMonthInput, setWeightMonthInput] = useState<string>();
  const [heightInput, setHeightInput] = useState<string>();
  const [heightMonthInput, setHeightMonthInput] = useState<string>();

  const weightMax = [4.7, 7.5, 9.6, 10.8, 12, 13, 13.7, 15.3];
  const weightMin = [2.5, 5, 6.4, 7.4, 8, 8.7, 9.2, 10.1];
  const weightMid = [3.4, 6.2, 7.9, 9, 9.9, 10.5, 11.2, 12.4];

  const heightMax = [54, 65, 72, 77, 81, 84, 88, 94];
  const heightMin = [47, 57, 63.5, 67.5, 71, 73.5, 76.5, 82];
  const heightMid = [50, 61, 67.5, 72, 75.5, 78.5, 82.5, 88];

  const changeAdd = () => {
    setAddStatus(!addStatus);
  };

  const addBabyWeight = async () => {
    const lastBabyWeight = babyWeight[babyWeight.length - 1];
    const lastMonth = lastBabyWeight ? parseInt(lastBabyWeight.month) : 0;
    let intWeightMonth: any;
    let newBabyWeight: any;
    if (weightMonthInput) {
      intWeightMonth = parseInt(weightMonthInput);
    }

    const isMonthInBetween = month.some((m) => {
      const monthValue = parseInt(m.value);
      return (
        monthValue > lastMonth &&
        monthValue <= parseInt(intWeightMonth) &&
        monthValue - lastMonth > 3
      );
    });

    if (weightInput) {
      newBabyWeight = {
        baby_id: babies[0].id,
        weight: parseInt(weightInput),
        month: intWeightMonth,
      };
    }

    if (isMonthInBetween) {
      setError2(true);
    } else if (intWeightMonth <= lastMonth) {
      if (weightInput) {
        const existingBabyWeight = babyWeight.find(
          (bw: any) => bw.month === intWeightMonth
        );
        if (existingBabyWeight) {
          newBabyWeight = {
            id: existingBabyWeight.id,
            baby_id: babies[0].id,
            weight: parseInt(weightInput),
            month: intWeightMonth,
          };
        }
      }
      await edditWeight(newBabyWeight);
      window.location.reload();
      console.log(intWeightMonth);
    } else {
      try {
        await saveWeight(newBabyWeight);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addBabyHeight = async () => {
    const lastBabyHeight = babyHeight[babyHeight.length - 1];
    const lastMonth = lastBabyHeight ? parseInt(lastBabyHeight.month) : 0;
    let intHeightMonth: any;
    let newBabyHeight: any;
    if (heightMonthInput) {
      intHeightMonth = parseInt(heightMonthInput);
    }

    const isMonthInBetween = month.some((m) => {
      const monthValue = parseInt(m.value);
      return (
        monthValue > lastMonth &&
        monthValue <= parseInt(intHeightMonth) &&
        monthValue - lastMonth > 3
      );
    });

    if (heightInput) {
      newBabyHeight = {
        baby_id: babies[0].id,
        height: parseInt(heightInput),
        month: intHeightMonth,
      };
    }

    if (isMonthInBetween) {
      setError2(true);
    } else if (intHeightMonth <= lastMonth) {
      if (heightInput) {
        const existingBabyHeight = babyHeight.find(
          (bw: any) => bw.month === intHeightMonth
        );
        if (existingBabyHeight) {
          newBabyHeight = {
            id: existingBabyHeight.id,
            baby_id: babies[0].id,
            height: parseInt(heightInput),
            month: intHeightMonth,
          };
        }
      }
      await edditHeight(newBabyHeight);
      window.location.reload();
      console.log(intHeightMonth);
    } else {
      try {
        await saveHeight(newBabyHeight);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const editVaccin = async (vaccin: any) => {
    const doses = inputValue.split("/");
    if (doses.length === 2) {
      const newVaccin = {
        baby_id: vaccin.baby_id,
        current_dose: doses[0],
        dose: doses[1],
        id: vaccin.id,
        vaccine_name: vaccin.vaccine_name,
      };
      try {
        await edditVaccin(newVaccin);
        window.location.reload();
        setError(false);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    } else {
      setError(true);
    }
  };

  const addVaccin = async () => {
    const doses = inputDose.split("/");
    console.log(babies);
    if (doses.length === 2) {
      const newVaccin = {
        baby_id: babies[0].id,
        current_dose: doses[0],
        dose: doses[1],
        vaccine_name: inputName,
      };
      try {
        await saveVaccin(newVaccin);
        window.location.reload();
        setError(false);
      } catch (error) {
        setError(true);
        console.log(error);
      }
    } else {
      setError(true);
    }
  };

  const vaccinDelete = async (id: number) => {
    await deleteVaccin(id);
    window.location.reload();
  };

  useEffect(() => {
    const fetchBabies = async () => {
      try {
        const response = await getBabies();
        setBabies(response);
        const responseVaccin = await getVaccins(response[0].id);
        const responseWeight = await getWeight(response[0].id);
        const responseHeight = await getHeight(response[0].id);
        setVaccins(responseVaccin);
        setBabyWeight(responseWeight);
        setBabyHeight(responseHeight);
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
      {babies && (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <View style={styles.topFlex}>
              <View style={styles.picture} />
              <View style={styles.flexName}>
                <Text style={styles.name}>{babies[0].first_name}</Text>
              </View>
            </View>

            <View style={styles.card}>
              <View style={styles.flex}>
                <Text style={styles.category}>Vaccins</Text>
                <Text style={styles.category}>Doses</Text>
                <Text style={styles.category}>Status</Text>
                <Pressable onPress={changeAdd}>
                  <Text style={styles.category}>+</Text>
                </Pressable>
              </View>
              {error && (
                <Text style={styles.error}>
                  Vérifier que vous avez modifier la dose comme ceci :
                  "dose/doseMax"
                </Text>
              )}
              {addStatus && (
                <View style={styles.vaccinContainer}>
                  <TextInput
                    style={styles.vaccinInfo}
                    placeholder="Nom"
                    placeholderTextColor={Colors.gray}
                    onChangeText={(text) => setInputName(text)}
                  />
                  <TextInput
                    style={styles.vaccinInfo2}
                    placeholder="0/1"
                    placeholderTextColor={Colors.gray}
                    onChangeText={(text) => setInputDose(text)}
                  />
                  <Pressable
                    style={styles.pressable}
                    onPress={() => addVaccin()}
                  >
                    <Image
                      source={require("/assets/status.png")}
                      resizeMode="contain"
                      style={styles.logo}
                    />
                  </Pressable>
                </View>
              )}
              {vaccins && (
                <View>
                  {vaccins.map((vaccin: any, index: number) => (
                    <View key={index} style={styles.vaccinContainer}>
                      <Text style={styles.vaccinInfo}>
                        {vaccin.vaccine_name}
                      </Text>
                      <TextInput
                        style={styles.vaccinInfo2}
                        placeholder={vaccin.current_dose + "/" + vaccin.dose}
                        onChangeText={(text) => setInputValue(text)}
                      />
                      <Pressable
                        style={styles.pressable}
                        onPress={() => editVaccin(vaccin)}
                      >
                        <Image
                          source={require("/assets/status.png")}
                          resizeMode="contain"
                          style={styles.logo}
                        />
                      </Pressable>
                      <Pressable onPress={() => vaccinDelete(vaccin.id)}>
                        <Image
                          source={require("/assets/delete.png")}
                          resizeMode="contain"
                          style={styles.logo2}
                        />
                      </Pressable>
                    </View>
                  ))}
                </View>
              )}
            </View>
            <View style={styles.card}>
              <View
                onLayout={({ nativeEvent }) =>
                  setChartParentWidth(nativeEvent.layout.width)
                }
              >
                {babyWeight && (
                  <Chart
                    screenWidth={chartParentWidth}
                    maxValue={18}
                    minData={weightMin}
                    maxData={weightMax}
                    data={babyWeight.map((weight: any) => weight.weight)}
                    title={"Poids"}
                    midData={weightMid}
                  />
                )}
                <Pressable
                  style={styles.button}
                  onPress={() => setAddWeight(!addWeight)}
                >
                  <Text style={styles.buttonText}>Ajoutez une mesure</Text>
                </Pressable>
                {addWeight && (
                  <View style={styles.addContainer}>
                    <TextInput
                      style={styles.addData}
                      placeholder="poid kg"
                      onChangeText={(text) => setWeightInput(text)}
                    />
                    <View style={styles.addData}>
                      <Dropdown
                        style={[styles.dropdown]}
                        data={month}
                        maxHeight={100}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedStyle}
                        labelField="label"
                        valueField="value"
                        placeholder="mois"
                        value={weightMonthInput}
                        onChange={(item) => {
                          setWeightMonthInput(item.value);
                        }}
                      />
                    </View>
                    <Pressable style={styles.pressable} onPress={addBabyWeight}>
                      <Image
                        source={require("/assets/status.png")}
                        resizeMode="contain"
                        style={styles.logo}
                      />
                    </Pressable>
                  </View>
                )}
                {error2 && (
                  <Text style={styles.error}>
                    Veuillez ajouter les mesures des mois précedents d'abord
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.card}>
              <View
                onLayout={({ nativeEvent }) =>
                  setChartParentWidth(nativeEvent.layout.width)
                }
              >
                {babyHeight && (
                  <Chart
                    screenWidth={chartParentWidth}
                    maxValue={100}
                    minData={heightMin}
                    maxData={heightMax}
                    data={babyHeight.map((height: any) => height.height)}
                    title={"Taille"}
                    midData={heightMid}
                  />
                )}
                <Pressable
                  style={styles.button}
                  onPress={() => setAddHeight(!addHeight)}
                >
                  <Text style={styles.buttonText}>Ajoutez une mesure</Text>
                </Pressable>
                {addHeight && (
                  <View style={styles.addContainer}>
                    <TextInput
                      style={styles.addData}
                      placeholder="taille cm"
                      onChangeText={(text) => setHeightInput(text)}
                    />
                    <View style={styles.addData}>
                      <Dropdown
                        style={[styles.dropdown]}
                        data={month}
                        maxHeight={100}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedStyle}
                        labelField="label"
                        valueField="value"
                        placeholder="mois"
                        value={heightMonthInput}
                        onChange={(item) => {
                          setHeightMonthInput(item.value);
                        }}
                      />
                    </View>
                    <Pressable style={styles.pressable} onPress={addBabyHeight}>
                      <Image
                        source={require("/assets/status.png")}
                        resizeMode="contain"
                        style={styles.logo}
                      />
                    </Pressable>
                  </View>
                )}
                {error2 && (
                  <Text style={styles.error}>
                    Veuillez ajouter les mesures des mois précedents d'abord
                  </Text>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
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
    height: "100%",
  },
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: Colors.darkBlue,
    width: "100%",
    marginTop: 15,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: FontSize.medium,
    fontWeight: "500",
    color: "white",
  },
  dropdown: {
    width: "100%",
  },
  placeholderStyle: {
    fontSize: FontSize.xs,
    color: Colors.gray,
    padding: 10,
  },
  selectedStyle: {
    fontSize: FontSize.xs,
    padding: 10,
  },
  pressable: {
    width: "30%",
  },
  addContainer: {
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 20,
    padding: 15,
  },
  addData: {
    width: "40%",
    borderColor: Colors.darkText,
    borderRightWidth: 1,
  },
  addData2: {
    marginTop: 5,
    width: "20%",
    height: "70%",
  },
  vaccinContainer: {
    width: "80%",
    height: "fit-content",
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 10,
  },
  vaccinInfo: {
    width: "40%",
    textAlign: "center",
    fontSize: FontSize.xs,
    borderColor: Colors.gray,
    borderRightWidth: 1,
  },
  vaccinInfo2: {
    width: "30%",
    textAlign: "center",
    fontSize: FontSize.xs,
    borderColor: Colors.gray,
    borderRightWidth: 1,
  },
  error: {
    textAlign: "center",
    fontSize: FontSize.xs,
    color: Colors.error,
  },
  scrollContent: {
    width: "80%",
    marginLeft: "10%",
    marginBottom: 100,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 15,
    marginRight: 30,
  },
  category: {
    fontSize: FontSize.small,
    fontWeight: "500",
    color: Colors.darkText,
  },
  card: {
    width: "100%",
    height: "fit-content",
    backgroundColor: "white",
    marginTop: 30,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  picture: {
    width: 100,
    height: 100,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  topFlex: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    height: "fit-content",
    marginTop: 50,
    marginLeft: "10%",
  },
  flexName: {
    marginTop: 40,
    marginLeft: 10,
  },
  name: {
    fontSize: FontSize.large,
    color: Colors.darkBlue,
    fontWeight: "700",
  },
  textBold: {
    fontSize: FontSize.small,
    color: Colors.darkText,
    fontWeight: "700",
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
    height: "100%",
    width: "100%",
  },
  logo2: {
    position: "absolute",
    height: 18,
    width: 18,
    right: "-10vw",
  },
});
