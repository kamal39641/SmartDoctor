import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

export default function SplashScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      
      {/* Logo */}
      <Image
        source={require("../../assets/smartDoctor-logo.png")}
        style={styles.logo}
      />
      

      {/* Title */}
      {/* <Text style={styles.title}>
        <Text style={{ color: "#1E3A8A" , fontWeight: "bold" }}>Smart</Text>
        <Text style={{ color: "#0e8e63" , fontWeight: "bold" }}>Doctor</Text>
      </Text> */}

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Save Time, Appointment & Visit Tracking System
      </Text>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Role")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9cfbed",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 10,
  },
  subtitle: {
    marginTop: -50,
    textAlign: "center",
    color: "#1E3A8A",
    paddingHorizontal: 20,
    // fontWeight: "bold",
    // fontSize: 16,
  },
  button: {
    marginTop: 100,
    backgroundColor: "#05a46f",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,

  },
  buttonText: {
    color: "#f9a866",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});