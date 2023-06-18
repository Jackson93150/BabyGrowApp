import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screen/HomeScreen";
import SignUpScreen from "../screen/SignUpScreen";
import NewUserScreen from "../screen/NewUserScreen";
import AddBabyScreen from "../screen/AddBabyScreen";
import WelcomeScreen from "../screen/WelcomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import EditProfileScreen from "../screen/EditProfileScreen";
import NewBabyScreen from "../screen/NewBabyScreen";
import RecipeScreen from "../screen/RecipeScreen";
import RecipeInfoScreen from "../screen/RecipeInfoScreen";
import BlogScreen from "../screen/BlogScreen";
import BlogInfoScreen from "../screen/BlogInfoScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="RecipeInfo" component={RecipeInfoScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="NewUser" component={NewUserScreen} />
        <Stack.Screen name="AddBaby" component={AddBabyScreen} />
        <Stack.Screen name="NewBaby" component={NewBabyScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Blog" component={BlogScreen} />
        <Stack.Screen name="BlogInfo" component={BlogInfoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
