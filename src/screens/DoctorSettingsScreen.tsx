import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DoctorContext } from "../context/DoctorContext";

export default function DoctorSettingsScreen() {
  const router = useRouter();
  const { notificationsEnabled, setNotificationsEnabled } = useContext(DoctorContext);

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Doctor Settings</Text>
      </View>

      <ScrollView style={{ padding: 15 }}>

        {/* Profile */}
        <View style={styles.card}>
          <Text style={styles.section}>👤 Profile</Text>

          <TouchableOpacity style={styles.item} onPress={() => router.push("/DoctorProfileEdit")}>
            <Text style={styles.itemText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={18} />
          </TouchableOpacity>
        </View>

        {/* Notification */}
        <View style={styles.card}>
          <Text style={styles.section}>🔔 Notifications</Text>

          <View style={styles.item}>
            <Text style={styles.itemText}>Appointment Alerts</Text>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
            />
          </View>
        </View>

        {/* Account */}
        <View style={styles.card}>
          <Text style={styles.section}>🔐 Account</Text>

          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={18} />
          </TouchableOpacity>
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logout}
          onPress={() => router.replace("/DoctorLogin")}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Logout
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9cfbed",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#0ea5e9",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  section: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    backgroundColor: "#f0f0f9",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 1,

  },

    itemText: {
    fontSize: 14,
    elevation: 1,
  },

  logout: {
    backgroundColor: "#EF4444",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
});