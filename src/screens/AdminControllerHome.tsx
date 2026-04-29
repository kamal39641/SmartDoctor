import React from "react";
import { View, Text, StyleSheet } from "react-native";
import RoleCard from "../components/RoleCard";

export default function AdminControllerHome({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>সিস্টেম অ্যাডমিন</Text>
      <Text style={styles.subtitle}>ডাক্তার অনুমোদন ও ব্যবহারকারী নিয়ন্ত্রণ</Text>

      <RoleCard
        title="ডাক্তার অনুমোদন"
        icon="person-add"
        color="#EF4444"
        onPress={() => navigation.navigate("AdminDoctorApproval")}
      />

      <RoleCard
        title="ব্লক করা ব্যবহারকারী"
        icon="ban"
        color="#DC2626"
        onPress={() => navigation.navigate("AdminBlockedUsers")}
      />

      <RoleCard
        title="সিস্টেম সেটিংস"
        icon="settings"
        color="#0ea5e9"
        onPress={() => navigation.navigate("AdminSettings")}
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
