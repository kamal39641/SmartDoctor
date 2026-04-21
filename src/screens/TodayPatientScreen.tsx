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
import { DoctorContext } from "../context/DoctorContext";

export default function TodayPatientScreen() {
  const router = useRouter();

  type Patient = {
    id: number;
    name: string;
    age: number;
  };
  
  const { confirmedPatients } = useContext(DoctorContext);

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
            আজকের রোগী: {confirmedPatients.length} জন
          </Text>

          {confirmedPatients.length === 0 ? (
            <Text style={styles.empty}>আজ কোনো রোগী নেই</Text>
          ) : (
            confirmedPatients.map((p: Patient, index: number) => (
              <View key={p.id} style={styles.item}>
                <Text style={styles.name}>
                  {index + 1}. {p.name} ({p.age} বছর)
                </Text>
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
    textAlign: "center",
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