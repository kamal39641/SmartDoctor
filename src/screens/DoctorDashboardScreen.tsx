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
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DoctorContext } from "../context/DoctorContext";

export default function DoctorDashboardScreen() {
  const router = useRouter();

  const {
    doctor,
    pendingPatients,
    doctorQueue,
    todayPatients,
    markPatientDone,
  } = useContext(DoctorContext);

  const myTodayPatients = todayPatients.filter(
    (p: any) => p.doctorName === doctor.name,
  );

  const myDoctorQueue = doctorQueue.filter(
    (p: any) => p.doctorName === doctor.name,
  );

  const myPendingAppointments = pendingPatients.filter(
    (p: any) => p.doctorName === doctor.name,
  );

  const todayPatientsCount = myTodayPatients.length;

  const [modalVisible, setModalVisible] = useState(false);

  const [schedule, setSchedule] = useState({
    evening: "বিকাল ৩:০০ - সন্ধ্যা ৬:০০",
  });

  const [tempEvening, setTempEvening] = useState(schedule.evening);

  const [isActive, setIsActive] = useState(true);

  const handleSeen = (id: number, name: string) => {
    markPatientDone(id);

    Alert.alert("Completed", `${name} দেখা হয়েছে`);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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
        {/* Doctor Profile */}
        <View style={styles.doctorcard}>
          <View style={styles.row}>
            {doctor.image ? (
              <Image
                source={{
                  uri: doctor.image,
                }}
                style={styles.profileImg}
              />
            ) : (
              <View style={styles.defaultImg}>
                <Ionicons name="person" size={30} color="#fff" />
              </View>
            )}

            <View
              style={{
                flex: 1,
                marginLeft: 10,
              }}
            >
              <Text style={styles.name}>{doctor.name}</Text>

              <Text style={styles.spec}>{doctor.spec}</Text>

              <Text style={styles.bmdc}>{doctor.bmdc}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.statusBtn,
                {
                  backgroundColor: isActive ? "#10B981" : "#EF4444",
                },
              ]}
              onPress={() => setIsActive(!isActive)}
            >
              <Text
                style={{
                  color: "#fff",
                }}
              >
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

            <Text style={styles.statNumber}>{todayPatientsCount} জন</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statBox}
            onPress={() => router.push("/Appointment")}
          >
            <Text style={styles.statLabel}>অ্যাপয়েন্টমেন্ট</Text>

            <Text style={styles.statNumber}>
              {myPendingAppointments.length}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Queue Status */}
        {/* <View style={styles.queueSummary}>
          <Text style={styles.queueTitle}>বর্তমান Queue Status</Text>

          <Text style={styles.queueBig}>
            {myDoctorQueue.length > 0 ? myDoctorQueue[0].name : "None"}
          </Text>

          <Text style={styles.queueSub}>
            বর্তমানে সামনে অপেক্ষমাণ:
            {myDoctorQueue.length} জন
          </Text>
        </View> */}

        {/* Pending Queue */}
        <View style={styles.pendingcard}>
          <View style={styles.row}>
            <Text style={styles.sectionTitlePending}>⏳ পেন্ডিং পেশেন্ট</Text>
          </View>

          {myDoctorQueue.length === 0 ? (
            <Text
              style={{
                textAlign: "center",
                marginTop: 20,
              }}
            >
              আজ কোনো পেশেন্ট নেই
            </Text>
          ) : (
            myDoctorQueue.map((p: any, index: number) => (
              <View key={p.id} style={styles.patientCard}>
                <View>
                  <Text style={styles.serial}>
                    {index + 1}.{p.name}({p.age})
                  </Text>

                  {/* <Text style={styles.positionTag}>
                    Serial:
                    {index + 1}
                  </Text> */}
                </View>

                <TouchableOpacity
                  style={styles.doneBtn}
                  onPress={() => handleSeen(p.id, p.name)}
                >
                  <Text
                    style={{
                      color: "#fff",
                    }}
                  >
                    দেখা হয়েছে
                  </Text>
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
                  setSchedule({
                    evening: tempEvening,
                  });
                  setModalVisible(false);
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                  }}
                >
                  Save
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
    backgroundColor: "#0ea5e9",
    padding: 20,
    paddingTop: 60,
  },

  backBtn: {
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
    textAlign: "center",
  },

  sub: {
    color: "#fff",
    marginTop: 5,
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
    backgroundColor: "#f1d5f9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  bmdc: {
    marginTop: 5,
  },

  statusBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
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
    color: "#007fff",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  statBox: {
    width: "48%",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 4,
  },

  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10B981",
  },

  statLabel: {
    fontWeight: "bold",
  },

  queueSummary: {
    backgroundColor: "#eefcf6",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
    elevation: 4,
  },

  queueTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  queueBig: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#10B981",
  },

  queueSub: {
    fontWeight: "600",
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#5d8aa8",
  },

  positionTag: {
    marginTop: 4,
    fontWeight: "600",
  },

  doneBtn: {
    backgroundColor: "#10B981",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,.5)",
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
    textAlign: "center",
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
  },
});
