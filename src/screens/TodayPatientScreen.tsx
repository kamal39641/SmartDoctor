import React, { useContext } from "react";

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { DoctorContext, Patient } from "../context/DoctorContext";

export default function TodayPatientScreen() {
  const router = useRouter();

  const { doctor, todayPatients, clearTodayPatients } =
    useContext(DoctorContext);

  const myTodayPatients = todayPatients.filter(
    (p: any) => p.doctorName === doctor.name,
  );

  const handleClear = () => {
    if (myTodayPatients.length === 0) {
      Alert.alert("Info", "আজ কোনো রোগী নেই");
      return;
    }

    Alert.alert("Clear All", "আজকের সব রোগী remove করবেন?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          clearTodayPatients();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>আজকের রোগী</Text>
      </View>

      <ScrollView style={{ padding: 15 }}>
        <View style={styles.card}>
          <View style={styles.topRow}>
            <Text style={styles.titlecard}>
              আজকের রোগী: {myTodayPatients.length} জন
            </Text>

            <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          </View>

          {myTodayPatients.length === 0 ? (
            <Text style={styles.empty}>আজ কোনো রোগী নেই</Text>
          ) : (
            myTodayPatients.map((p: Patient, index: number) => (
              <View key={p.id} style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>
                    {index + 1}. {p.name} ({p.age} বছর)
                  </Text>

                  {p.phone && <Text style={styles.phone}>📞 {p.phone}</Text>}

                  {/* <Text style={styles.doctorText}>👨‍⚕️ {p.doctorName}</Text> */}
                </View>

                {/* <View style={styles.badge}>
                  <Text style={styles.badgeText}>Seen List</Text>
                </View> */}
              </View>
            ))
          )}
        </View>
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
    backgroundColor: "#0ea5e9",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  titlecard: {
    fontSize: 18,
    backgroundColor: "#f17d2a",
    padding: 10,
    borderRadius: 10,
    fontWeight: "bold",
    elevation: 3,
  },

  clearBtn: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 3,
  },

  clearText: {
    color: "#fff",
    fontWeight: "bold",
  },

  item: {
    backgroundColor: "#efdecd",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
  },

  phone: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },

  doctorText: {
    marginTop: 5,
    color: "#007fff",
    fontWeight: "600",
  },

  badge: {
    backgroundColor: "#10B981",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 12,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    marginTop: 10,
    color: "red",
    backgroundColor: "#efdecd",
    padding: 10,
    borderRadius: 10,
  },
});
