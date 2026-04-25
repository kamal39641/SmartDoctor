import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DoctorContext } from "../context/DoctorContext";

export default function DoctorDashboardScreen() {
  const router = useRouter();

  const {
    doctor,
    pendingPatients,
    todayPatients,
    markPatientDone,
  } = useContext(DoctorContext);

  const myTodayPatients = todayPatients.filter(
    (p: any) => p.doctorName === doctor.name
  );

  const todayCount = myTodayPatients.length;

  const [modalVisible, setModalVisible] = useState(false);

  const [schedule, setSchedule] = useState({
    evening: "বিকাল ৩:০০ - সন্ধ্যা ৬:০০",
  });

  const [tempEvening, setTempEvening] = useState(schedule.evening);

  const [isActive, setIsActive] = useState(true);

  // remove patient from today's list
  const handleDone = (id: number) => {
    markPatientDone(id);
  };

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.replace("/DoctorLogin")}
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>ডাক্তার প্যানেল</Text>
        <Text style={styles.sub}>স্বাগতম, {doctor.name}</Text>

        <TouchableOpacity
          style={styles.settings}
          onPress={() => router.push("/DoctorSettings")}
        >
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ padding: 15 }}>

        {/* Doctor Card */}
        <View style={styles.doctorcard}>
          <View style={styles.row}>

            {doctor.image ? (
              <Image source={{ uri: doctor.image }} style={styles.profileImg} />
            ) : (
              <View style={styles.defaultImg}>
                <Ionicons name="person" size={30} color="#fff" />
              </View>
            )}

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.name}>{doctor.name}</Text>
              <Text style={styles.spec}>{doctor.spec}</Text>
              <Text style={styles.bmdc}>{doctor.bmdc}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.statusBtn,
                { backgroundColor: isActive ? "#10B981" : "#EF4444" },
              ]}
              onPress={() => setIsActive(!isActive)}
            >
              <Text style={{ color: "#fff" }}>
                {isActive ? "Active" : "Inactive"}
              </Text>
            </TouchableOpacity>

          </View>
        </View>

        {/* Schedule */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.sectionTitle}>আজকের সময়সূচী ⏰</Text>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Ionicons name="create-outline" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.scheduleBox}>
            <Text style={styles.scheduleText}>{schedule.evening}</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>

          <TouchableOpacity
            style={styles.statBox}
            onPress={() => router.push("/TodayPatient")}
          >
            <Text style={styles.statLabel}>আজকের রোগী</Text>
            <Text style={styles.statNumber}>{todayCount} জন</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statBox}
            onPress={() => router.push("/Appointment")}
          >
            <Text style={styles.statLabel}>অ্যাপয়েন্টমেন্ট</Text>
            <Text style={styles.statNumber}>{pendingPatients.length} জন</Text>
          </TouchableOpacity>

        </View>

        {/* Pending Patients */}
        <View style={styles.pendingcard}>
          <View style={styles.row}>
            <Text style={styles.sectionTitlePending}>⏳পেন্ডিং পেশেন্ট</Text>
          </View>

          {todayCount === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              আজ কোনো পেশেন্ট নেই
            </Text>
          ) : (
            myTodayPatients.map((p: any, index: number) => (
              <View key={p.id} style={styles.patientCard}>
                <Text style={styles.serial}>
                  {index + 1}. {p.name} ({p.age})
                </Text>

                <TouchableOpacity
                  style={styles.doneBtn}
                  onPress={() => markPatientDone(p.id)}
                >
                  <Text style={{ color: "#fff" }}>দেখা হয়েছে</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

      </ScrollView>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>

            <Text style={styles.modalTitle}>সময়সূচী সম্পাদনা</Text>

            <TextInput
              style={styles.input}
              value={tempEvening}
              onChangeText={setTempEvening}
            />

            <View style={styles.modalBtnRow}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.saveBtn}
                onPress={() => {
                  setSchedule({ evening: tempEvening });
                  setModalVisible(false);
                }}
              >
                <Text style={{ color: "#fff" }}>Save</Text>
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
    backgroundColor: "#0ea5e9",
    padding: 20,
    paddingTop: 60,
  },

  backBtn: {
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
    textAlign: "center",
  },

  sub: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },

  settings: {
    position: "absolute",
    right: 20,
    top: 60,
  },

  doctorcard: {
    backgroundColor: "#ffe4cd",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  pendingcard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 30,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  profileImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  defaultImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
  },

  spec: {
    marginTop: 5,
    color: "#555",
    backgroundColor: "#f1d5f9",
    padding: 3,
    borderRadius: 10,
    fontWeight: "800",
    width: "56%",
    elevation: 2,
  },

  bmdc: {
    color: "#888",
  },

  statusBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },

  sectionTitlePending: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#f17d2a",
    padding: 10,
    borderRadius: 10,
  },

  scheduleBox: {
    backgroundColor: "#f1f5f9",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  scheduleText: {
    textAlign: "center",
    fontSize: 16,
    color: "#007fff",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  statBox: {
    width: "48%",
    backgroundColor: "#f1f5f9",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#10B981",
  },

  statLabel: {
    marginTop: 5,
    color: "#4b2b0c",
    fontWeight: "bold",
  },

  patientCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#efdecd",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  serial: {
    fontWeight: "bold",
    color: "#5d8aa8",
    fontSize: 18,
  },

  doneBtn: {
    backgroundColor: "#10B981",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#f17d2a",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    color: "#fff",
  },

  input: {
    backgroundColor: "#efdecd",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    fontSize: 16,
    color: "#007fff",
    textAlign: "center",
    elevation: 2,
  },

  modalBtnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  cancelBtnText: {
    color: "#fff",
    backgroundColor: "#ff033e",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  saveBtn: {
    backgroundColor: "#10B981",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },
});