import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoleCard from "../components/RoleCard";

export default function RoleScreen({ navigation }: any) {
  return (
    <View style={styles.container}>

      {/* Title */}
      <Text style={styles.title}>Who are you?</Text>
      <Text style={styles.subtitle}>Please select your role</Text>

      {/* Doctor */}
      <RoleCard
        title="I am a Doctor"
        icon="medkit"
        color="#3B82F6"
        onPress={() => navigation.navigate("DoctorLogin")}
      />

      {/* Patient */}
      <RoleCard
        title="I am a Patient"
        icon="person"
        color="#10B981"
        onPress={() => navigation.navigate("PatientHome")}
      />

      {/* Admin */}
      <RoleCard
        title="I am an Admin"
        icon="shield-checkmark"
        color="#DC2626"
        onPress={() => navigation.navigate("AdminDashboard")}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9cfbed",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1D4ED8",
  },

  subtitle: {
    marginBottom: 30,
    color: "#555",
  },
});