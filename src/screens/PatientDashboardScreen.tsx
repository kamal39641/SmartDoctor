import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { DoctorContext } from "../context/DoctorContext";

export default function PatientDashboardScreen() {
  const router = useRouter();

  const [menuVisible, setMenuVisible] = useState(false);

  const { getPatientPosition, patientsAhead, currentPatient } =
    useContext(DoctorContext);

  /*
Logged patient info from booking
*/
  const patient = currentPatient || {
    id: 0,
    name: "রহিম আহমেদ",
    age: 35,
    address: "ঢাকা, বাংলাদেশ",
    phone: "01712345678",
    email: "rahim@email.com",
  };

  const currentAppointment = {
    doctor: "ডা. আহমেদ রহমান",
    hospital: "Square Hospital",
    time: "10:00 AM",
    date: "22-04-2026",
    spec: "কার্ডিওলজিস্ট",
  };

  /*
LIVE queue position
*/
  const patientPosition = patient?.id ? getPatientPosition(patient.id) : null;

  const aheadPatients = patient?.id ? patientsAhead(patient.id) : 0;

  const handleLogout = () => {
    setMenuVisible(false);
    router.replace("/PatientHome");
  };

  const handleEditProfile = () => {
    setMenuVisible(false);
    router.push("/PatientProfileEdit");
  };

  const handlePreviousVisits = () => {
    setMenuVisible(false);
    router.push("/PreviousVisits");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>রোগী ড্যাশবোর্ড</Text>

          <Text style={styles.headerSub}>স্বাগতম, {patient.name}</Text>
        </View>

        <TouchableOpacity
          style={styles.settingsBtn}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={{
          padding: 15,
          marginBottom: 15,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile */}
        <View style={styles.patientCard}>
          <View style={styles.row}>
            <View style={styles.defaultImg}>
              <Ionicons name="person" size={35} color="#fff" />
            </View>

            <View
              style={{
                flex: 1,
                marginLeft: 15,
              }}
            >
              <Text style={styles.name}>{patient.name}</Text>

              <Text style={styles.info}>বয়স: {patient.age}</Text>

              <Text style={styles.info}>📞 {patient.phone}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.label}>ঠিকানা:</Text>

          <Text style={styles.value}>{patient.address}</Text>
        </View>

        {/* Appointment */}
        <View style={styles.appointmentCard}>
          <Text style={styles.sectionTitle}>বর্তমান অ্যাপয়েন্টমেন্ট</Text>

          {/* LIVE Queue */}
          <View style={styles.queueCard}>
            <Text style={styles.queueTitle}>আপনার বর্তমান সিরিয়াল</Text>

            <Text style={styles.bigSerial}>
              {patientPosition ? patientPosition : "-"}
            </Text>

            {patientPosition ? (
              <>
                <Text style={styles.queueInfo}>
                  সামনে রোগী বাকি: {aheadPatients} জন
                </Text>

                <Text style={styles.liveBadge}>🟢 Live Queue Updated</Text>
              </>
            ) : (
              <Text style={styles.notJoined}>এখনও queue তে যোগ হয়নি</Text>
            )}
          </View>

          <View style={styles.appointmentRow}>
            <View style={styles.appointmentIcon}>
              <Ionicons name="person-circle" size={30} color="#0ea5e9" />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.doctorName}>{currentAppointment.doctor}</Text>

              <Text style={styles.specialty}>{currentAppointment.spec}</Text>
            </View>
          </View>

          <View style={styles.appointmentDetails}>
            <View style={styles.detailRow}>
              <Ionicons name="business" size={18} color="#666" />

              <Text style={styles.detailText}>
                {currentAppointment.hospital}
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="calendar" size={18} color="#666" />

              <Text style={styles.detailText}>{currentAppointment.date}</Text>
            </View>

            <View style={styles.detailRow}>
              <Ionicons name="time" size={18} color="#666" />

              <Text style={styles.detailText}>{currentAppointment.time}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Menu */}
      <Modal visible={menuVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuBox}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleEditProfile}
            >
              <Ionicons name="create-outline" size={20} color="#0ea5e9" />

              <Text style={styles.menuText}>প্রোফাইল সম্পাদনা</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuItem}
              onPress={handlePreviousVisits}
            >
              <Ionicons name="list-outline" size={20} color="#0ea5e9" />

              <Text style={styles.menuText}>আগের ভিজিট</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, styles.logoutItem]}
              onPress={handleLogout}
            >
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />

              <Text style={[styles.menuText, { color: "#EF4444" }]}>লগআউট</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
    backgroundColor: "#10B981",
    padding: 20,
    paddingTop: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 20,
  },

  settingsBtn: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },

  headerSub: {
    color: "#fff",
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },

  patientCard: {
    backgroundColor: "#ffe4cd",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  defaultImg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#0ea5e9",
    justifyContent: "center",
    alignItems: "center",
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  info: {
    marginTop: 3,
    color: "#666",
  },

  divider: {
    height: 2,
    backgroundColor: "#10B981",
    marginVertical: 15,
  },

  label: {
    fontWeight: "600",
    color: "#666",
  },

  value: {
    marginTop: 3,
  },

  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#f17d2a",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },

  queueCard: {
    backgroundColor: "#eefcf6",
    marginTop: 18,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    elevation: 4,
  },

  queueTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  bigSerial: {
    fontSize: 56,
    fontWeight: "bold",
    marginVertical: 8,
    color: "#10B981",
  },

  queueInfo: {
    fontWeight: "600",
    fontSize: 15,
  },

  liveBadge: {
    marginTop: 10,
    backgroundColor: "#10B981",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 15,
    color: "#fff",
    fontWeight: "bold",
  },

  notJoined: {
    marginTop: 12,
    color: "red",
    fontWeight: "bold",
  },

  appointmentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },

  appointmentIcon: {
    marginRight: 15,
  },

  doctorName: {
    fontWeight: "bold",
    fontSize: 16,
  },

  specialty: {
    marginTop: 4,
    color: "#666",
  },

  appointmentDetails: {
    padding: 12,
    gap: 10,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  detailText: {
    fontSize: 13,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  menuBox: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  logoutItem: {
    borderBottomWidth: 0,
  },

  menuText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "500",
  },
});
