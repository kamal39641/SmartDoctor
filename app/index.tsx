import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../src/screens/SplashScreen";
import RoleScreen from "../src/screens/RoleScreen";
import DoctorLoginScreen from "../src/screens/DoctorLoginScreen";
import PatientLoginScreen from "../src/screens/PatientLoginScreen";
import DoctorRegisterScreen from "../src/screens/DoctorRegisterScreen";
import PatientRegisterScreen from "../src/screens/PatientRegisterScreen";
import PatientHomeScreen from "../src/screens/PatientHomeScreen";
import DoctorSearchScreen from "../src/screens/DoctorSearchScreen";
import AdminDashboardScreen from "../src/screens/AdminDashboardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Role" component={RoleScreen} />
        <Stack.Screen name="DoctorLogin" component={DoctorLoginScreen} />
        <Stack.Screen name="PatientLogin" component={PatientLoginScreen} />
        <Stack.Screen name="DoctorRegister" component={DoctorRegisterScreen} />
        <Stack.Screen name="PatientRegister" component={PatientRegisterScreen} />
        <Stack.Screen name="PatientHome" component={PatientHomeScreen} />
        <Stack.Screen name="DoctorSearch" component={DoctorSearchScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      </Stack.Navigator>
  );
}