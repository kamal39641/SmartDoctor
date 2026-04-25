import React, { useState, useContext, useMemo } from "react";
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
import { DoctorContext, Patient } from "../context/DoctorContext";

export default function PatientDashboardScreen() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const { todayPatients = [] } = useContext(DoctorContext);

  // Mock patient data
  const [patient] = useState({
    name: "রহিম আহমেদ",
    age: 35,
    address: "ঢাকা, বাংলাদেশ",
    phone: "01712345678",
    email: "rahim@email.com",
  });

  // Mock current appointment
  const [currentAppointment] = useState({
    doctor: "ডা. আহমেদ রহমান",
    hospital: "Square Hospital",
    time: "10:00 AM",
    date: "22-04-2026",
    spec: "কার্ডিওলজিস্ট",
  });

  // Calculate patient position from todayPatients
  const patientPosition = useMemo(() => {
    if (todayPatients.length === 0) return 0;
    const position = todayPatients.findIndex((p: Patient) => p.name === patient.name);
    return position !== -1 ? position + 1 : 0;
  }, [todayPatients, patient.name]);

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

      <ScrollView style={{ padding: 15, marginBottom: 15 }} showsVerticalScrollIndicator={false}>
        {/* Patient Card */}
        <View style={styles.patientCard}>
          <View style={styles.row}>
            <View style={styles.defaultImg}>
              <Ionicons name="person" size={35} color="#fff" />
            </View>

            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.name}>{patient.name}</Text>
              <Text style={styles.info}>বয়স: {patient.age}</Text>
              <Text style={styles.info}>📞 {patient.phone}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.label}>ঠিকানা:</Text>
            <Text style={styles.value}>{patient.address}</Text>
            <Text style={[styles.label, { marginTop: 10 }]}>ইমেইল:</Text>
            <Text style={styles.value}>{patient.email}</Text>
          </View>
        </View>

        {/* Current Appointment */}
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentHeader}>
            <Text style={styles.sectionTitle}>বর্তমান অ্যাপয়েন্টমেন্ট</Text>
            {patientPosition > 0 && (
              <View style={styles.positionBadge}>
                <Text style={styles.positionText}>#{patientPosition}</Text>
              </View>
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
              <Text style={styles.detailText}>{currentAppointment.hospital}</Text>
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

      {/* Settings Menu Modal */}
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
              <Text style={[styles.menuText, { color: "#EF4444" }]}>
                লগআউট
              </Text>
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
    color: "rgba(255,255,255,0.9)",
    fontSize: 14,
    marginTop: 3,
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
    color: "#333",
  },

  info: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },

  divider: {
    height: 2,
    backgroundColor: "#10B981",
    marginVertical: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },

  value: {
    fontSize: 15,
    color: "#333",
    marginTop: 3,
  },

  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  appointmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#f17d2a",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
    flex: 1,
  },

  appointmentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    // backgroundColor: "#b5dfa3",
    // padding: 15,
    // borderRadius: 10,
  },

  appointmentIcon: {
    marginRight: 15,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  specialty: {
    fontSize: 13,
    color: "#666",
    marginTop: 3,
  },

  appointmentDetails: {
    // backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 12,
    gap: 10,
    marginTop: -10,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  detailText: {
    fontSize: 13,
    color: "#333",
  },

  queueCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  queueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  positionBadge: {
    backgroundColor: "#05a46f",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  positionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  queueList: {
    backgroundColor: "#ffc0cb",
    borderRadius: 10,
    padding: 12,
  },

  emptyQueue: {
    backgroundColor: "#ffc0cb",
    borderRadius: 10,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 120,
  },

  emptyQueueText: {
    color: "#999",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },

  queueItemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  queueNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  currentQueue: {
    backgroundColor: "#05a46f",
  },

  queueNumberText: {
    fontWeight: "bold",
    color: "#666",
  },

  currentQueueText: {
    color: "#fff",
  },

  queueName: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  currentQueueName: {
    fontWeight: "bold",
    color: "#05a46f",
  },

  historyCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
  },

  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  historyItem: {
    flexDirection: "row",
    marginTop: 15,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  historyLeft: {
    flex: 0.35,
  },

  historyRight: {
    flex: 0.65,
  },

  historyDate: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0ea5e9",
  },

  historyDoctor: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    marginTop: 3,
  },

  historySpec: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  patientNameSmall: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },

  diagnosis: {
    fontSize: 12,
    color: "#05a46f",
    marginTop: 3,
    fontWeight: "500",
  },

  hospital: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
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
    color: "#333",
    fontWeight: "500",
  },
});
