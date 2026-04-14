import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DoctorContext } from "../context/DoctorContext";

type Patient = {
  id: number;
  name: string;
  age: number;
};

export default function AppointmentScreen() {
  const router = useRouter();

  const {
    pendingPatients,
    confirmedPatients,
    confirmPatient,
    addPatient,
    notificationsEnabled,
  } = useContext(DoctorContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>অ্যাপয়েন্টমেন্ট</Text>

        {/* Add Button */}
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.addBtnPlus}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ padding: 15 }}>
        {/* 🔴 Pending */}
        <View style={styles.card}>
          <Text style={styles.section}>🔴 Pending Patient</Text>

          {pendingPatients.length === 0 ? (
            <Text style={styles.empty}>No pending patients</Text>
          ) : (
            pendingPatients.map((p: Patient, index: number) => (
              <View key={p.id} style={styles.item}>
                <Text style={styles.name}>
                  {index + 1}. {p.name} ({p.age} বছর)
                </Text>

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={() => {
                    confirmPatient(p);

                    if (notificationsEnabled) {
                      Alert.alert(
                        "✅ Confirmed",
                        `${p.name} confirmed`
                      );
                    }
                  }}
                >
                  <Text style={{ color: "#fff" }}>Confirm</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        {/* 🟢 Confirmed */}
        <View style={styles.card}>
          <Text style={styles.section}>🟢 Confirmed Patient</Text>

          {confirmedPatients.length === 0 ? (
            <Text style={styles.empty}>No confirmed patients</Text>
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

      {/* 🔥 Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>নতুন রোগী</Text>

            <TextInput
              placeholder="নাম"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <TextInput
              placeholder="বয়স"
              value={age}
              onChangeText={setAge}
              keyboardType="numeric"
              style={styles.input}
            />

            <View style={styles.modalBtnRow}>
              {/* Cancel */}
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setModalVisible(false);
                  setName("");
                  setAge("");
                }}
              >
                <Text style={{ color: "#fff" }}>Cancel</Text>
              </TouchableOpacity>

              {/* Add */}
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => {
                  if (!name || !age) {
                    Alert.alert("⚠️ Error", "সব তথ্য দিন");
                    return;
                  }

                  const newPatient: Patient = {
                    id: Date.now(),
                    name,
                    age: Number(age),
                  };

                  addPatient(newPatient);

                  if (notificationsEnabled) {
                    Alert.alert(
                      "🔔 New Patient",
                      "নতুন রোগী যুক্ত হয়েছে"
                    );
                  }

                  setName("");
                  setAge("");
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Add Patient
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingTop: 50,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },

  addBtnPlus: {
    marginLeft: "auto",
    backgroundColor: "#f17d2a",
    padding: 10,
    borderRadius: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#f17d2a",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#efdecd",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  name: {
    fontWeight: "bold",
  },

  confirmBtn: {
    backgroundColor: "#10B981",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },

  empty: {
    textAlign: "center",
    color: "#ff033e",
    marginTop: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalBox: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 15,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },

  modalBtnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  cancelBtn: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 10,
  },

  addBtn: {
    backgroundColor: "#10B981",
    padding: 10,
    borderRadius: 10,
  },
});