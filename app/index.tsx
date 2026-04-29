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
import AdminLoginScreen from "../src/screens/AdminLoginScreen";
import AdminChoiceScreen from "../src/screens/AdminChoiceScreen";
import AdminHospitalAuthScreen from "../src/screens/AdminHospitalAuthScreen";
import AdminSystemAuthScreen from "../src/screens/AdminSystemAuthScreen";
import AdminControllerHome from "../src/screens/AdminControllerHome";
import AdminHospitalApprovalScreen from "../src/screens/AdminHospitalApprovalScreen";
import AdminDoctorApprovalScreen from "../src/screens/AdminDoctorApprovalScreen";
import AdminBlockedUsersScreen from "../src/screens/AdminBlockedUsersScreen";
import AdminSettingsScreen from "../src/screens/AdminSettingsScreen";

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
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="AdminChoice" component={AdminChoiceScreen} />
        <Stack.Screen name="AdminHospitalAuth" component={AdminHospitalAuthScreen} />
        <Stack.Screen name="AdminSystemAuth" component={AdminSystemAuthScreen} />
        <Stack.Screen name="AdminControllerHome" component={AdminControllerHome} />
        <Stack.Screen name="AdminHospitalApproval" component={AdminHospitalApprovalScreen} />
        <Stack.Screen name="AdminDoctorApproval" component={AdminDoctorApprovalScreen} />
        <Stack.Screen name="AdminBlockedUsers" component={AdminBlockedUsersScreen} />
        <Stack.Screen name="AdminSettings" component={AdminSettingsScreen} />
      </Stack.Navigator>
  );
}