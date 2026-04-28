import { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

import { DoctorContext } from "../context/DoctorContext";

export default function DoctorDetailsScreen() {
  const router = useRouter();

  const { doctorName } = useLocalSearchParams();
  const { openForm } = useLocalSearchParams();

  const {
    addPatient,
    isPatientLoggedIn,
    doctor, // IMPORTANT
  } = useContext(DoctorContext);

  useEffect(() => {
    if (openForm === "true") {
      setModalVisible(true);
    }
  }, [openForm]);

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const handleBookAppointment = () => {
    if (!name || !age || !address) {
      Alert.alert("Error", "সব তথ্য পূরণ করুন");
      return;
    }

    /*
IMPORTANT FIX:
doctor.name use করছি
route doctorName না
*/
    addPatient({
      id: Date.now(),
      name,
      age: Number(age),
      address,
      doctorName: doctor.name, // FIX
      status: "pending",
    });

    Alert.alert(
      "Appointment Confirmed",
      `${doctor.name} এর সাথে অ্যাপয়েন্টমেন্ট রিকোয়েস্ট পাঠানো হয়েছে`,
    );

    setModalVisible(false);

    setName("");
    setAge("");
    setAddress("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Doctor Details</Text>
      </View>

      <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <View style={styles.doctorCard}>
            <View style={styles.avatar}>
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 24,
                }}
              >
                A
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                paddingLeft: 10,
                justifyContent: "center",
              }}
            >
              <Text style={styles.name}>{doctorName}</Text>

              <Text>Cardiology</Text>
              <Text>Rajshahi Medical</Text>

              <Text style={styles.active}>● Active</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.section}>Weekly Schedule</Text>

          <Text>Friday: OFF</Text>

          <Text>Saturday - Thursday: 10:00 AM - 2:00 PM</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (!isPatientLoggedIn) {
              router.push({
                pathname: "/PatientLogin",
                params: {
                  from: "doctorDetails",
                },
              });
            } else {
              setModalVisible(true);
            }
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Book Appointment
          </Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.section}>Ratings & Reviews</Text>

          <Text>⭐ 4.0 (55 reviews)</Text>

          <Text>Very good doctor</Text>
        </View>
      </ScrollView>

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

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
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

              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={handleBookAppointment}
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
    backgroundColor: "#10B981",
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    left: 15,
    top: 60,
    backgroundColor: "rgba(255,255,255,.2)",
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
    marginBottom: 15,
  },
  doctorCard: {
    flexDirection: "row",
    backgroundColor: "#f5f530",
    borderRadius: 15,
    padding: 15,
    flex: 1,
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
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  active: {
    color: "#10B981",
    marginTop: 5,
  },
  section: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,.5)",
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
