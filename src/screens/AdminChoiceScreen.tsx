import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoleCard from "../components/RoleCard";

export default function AdminChoiceScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>অ্যাডমিন টাইপ নির্বাচন করুন</Text>
      <Text style={styles.subtitle}>আপনার প্রমিত অধিকার অনুযায়ী পছন্দ করুন</Text>

      <RoleCard
        title="হাসপাতাল অনুমোদনকারী"
        icon="business"
        color="#F59E0B"
        onPress={() => navigation.navigate("AdminHospitalAuth")}
      />

      <RoleCard
        title="সিস্টেম অ্যাডমিন "
        icon="shield-checkmark"
        color="#0ea5e9"
        onPress={() => navigation.navigate("AdminSystemAuth")}
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#0f172a",
  },

  subtitle: {
    marginBottom: 20,
    color: "#555",
  },
});
