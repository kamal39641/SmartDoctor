import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import { DoctorContext } from "../context/DoctorContext";

export default function DoctorDetailsScreen() {
  const router = useRouter(); 
  const { doctorName } = useLocalSearchParams();
  const { addPatient } = useContext(DoctorContext);

  // 🔥 NEW STATE
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Doctor Details</Text>
      </View>

      <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false}>

        <View style={styles.row}>

          {/* Doctor Card */}
          <View style={styles.card}>
            <View style={styles.avatar}>
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 24 }}>R</Text>
            </View>

            <View style={{ flex: 1, paddingLeft: 10, justifyContent: "center" }}>
              <Text style={styles.name}>{doctorName}</Text>
              <Text>Cardiology</Text>
              <Text>Rajshahi Medical</Text>
              <Text style={styles.active}>● Active</Text>
            </View>
          </View>
        </View>

        {/* Schedule */}
        <View style={styles.card}>
          <Text style={styles.section}>Weekly Schedule</Text>
          <Text>Mon-Fri: 9:00 AM - 5:00 PM</Text>
          <Text>Saturday: OFF</Text>
          <Text>Sunday: 10:00 AM - 2:00 PM</Text>
        </View>

        {/* 🔥 Book Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Book Appointment
          </Text>
        </TouchableOpacity>

        {/* Reviews */}
        <View style={styles.card}>
          <Text style={styles.section}>Ratings & Reviews</Text>
          <Text>⭐ 4.0 (55 reviews)</Text>
          <Text>Very good doctor</Text>
        </View>

      </ScrollView>

      {/* 🔥 MODAL FORM */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>Patient Information</Text>

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

            <TextInput
              placeholder="ঠিকানা"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

              {/* Cancel */}
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => {
                  setModalVisible(false);
                  setName("");
                  setAge("");
                  setAddress("");
                }}
              >
                <Text style={{ color: "#fff" }}>Cancel</Text>
              </TouchableOpacity>

              {/* Confirm */}
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  if (!name || !age || !address) return;

                  addPatient({
                    id: Date.now(),
                    name,
                    age: Number(age),
                    address,
                  });

                  setModalVisible(false);
                  setName("");
                  setAge("");
                  setAddress("");

                  router.push("/Appointment");
                }}
              >
                <Text style={{ color: "#fff" }}>Confirm</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#9cfbed" },

  header: {
    width: "100%",        
    backgroundColor: "#10B981",
    paddingTop: 60,      
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  backButton: {
    position: "absolute",
    left: 15,
    top: 60,   
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 20,
  },

  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },

  avatar: {
    width: 60,
    height: 60,
    backgroundColor: "#0ea5e9",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  name: { fontSize: 18, fontWeight: "bold" },

  active: { color: "#10B981", marginTop: 5 },

  section: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  button: {
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  // 🔥 NEW STYLES (existing untouched)
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

  cancelBtn: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },

  confirmBtn: {
    backgroundColor: "#10B981",
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
});