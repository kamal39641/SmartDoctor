import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DoctorContext, Patient } from "../context/DoctorContext";

export default function TodayPatientScreen() {
  const router = useRouter();
  const { doctor, todayPatients, markPatientDone } = useContext(DoctorContext);
  const myTodayPatients = todayPatients.filter(
    (p: any) => p.doctorName === doctor.name
  );

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

          <Text style={styles.titlecard}>
            আজকের রোগী: {todayPatients.length} জন
          </Text>

          {todayPatients.length === 0 ? (
            <Text style={styles.empty}>আজ কোনো রোগী নেই</Text>
          ) : (
            todayPatients.map((p: Patient, index: number) => (
              <View key={p.id} style={styles.item}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>
                    {index + 1}. {p.name} ({p.age} বছর)
                  </Text>
                  {p.phone && <Text style={styles.phone}>📞 {p.phone}</Text>}
                </View>
                <TouchableOpacity
                  style={styles.doneBtn}
                  onPress={() => markPatientDone(p.id)}
                >
                  <Ionicons name="checkmark-circle" size={24} color="#05a46f" />
                </TouchableOpacity>
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

  titlecard: {
    fontSize: 18,
    marginBottom: 5,
    backgroundColor: "#f17d2a",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
    elevation: 3,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
  },

  name: {
    fontWeight: "bold",
    textAlign: "center",
  },

  item: {
    backgroundColor: "#efdecd",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  phone: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },

  doneBtn: {
    padding: 8,
    marginLeft: 10,
  },

  empty: {
    textAlign: "center",
    marginTop: 10,
    color: "red",
    backgroundColor: "#efdecd",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
});