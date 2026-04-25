import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AdminContext, PendingDoctor, Hospital, VerificationItem, Appointment } from "../context/AdminContext";

export default function AdminDashboardScreen() {
  const router = useRouter();
  const {
    pendingDoctors,
    pendingHospitals,
    verifications,
    appointments,
    blockedUsers,
  } = useContext(AdminContext);

  // Count pending items
  const pendingDoctorCount = pendingDoctors.filter((d: PendingDoctor) => d.status === "pending").length;
  const pendingHospitalCount = pendingHospitals.filter((h: Hospital) => h.status === "pending").length;
  const pendingVerificationCount = verifications.filter((v: VerificationItem) => v.status === "pending").length;
  const totalAppointments = appointments.length;
  const blockedUsersCount = blockedUsers.length;

  const StatCard = ({ icon, title, count, color, onPress }: any) => (
    <TouchableOpacity style={[styles.statCard, { borderLeftColor: color }]} onPress={onPress}>
      <View style={[styles.iconBox, { backgroundColor: color + "20" }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statCount}>{count}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0ea5e9" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>অ্যাডমিন প্যানেল</Text>
          <Text style={styles.headerSub}>সিস্টেম ম্যানেজমেন্ট</Text>
        </View>
        <Ionicons name="shield-checkmark" size={40} color="#fff" />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overview Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>অপেক্ষমাণ অনুমোদন</Text>

          <StatCard
            icon="person-add"
            title="ডাক্তার অনুমোদন"
            count={pendingDoctorCount}
            color="#EF4444"
            onPress={() => router.push("/AdminDoctorApproval")}
          />

          <StatCard
            icon="business"
            title="হাসপাতাল অনুমোদন"
            count={pendingHospitalCount}
            color="#F59E0B"
            onPress={() => router.push("/AdminHospitalApproval")}
          />

          <StatCard
            icon="checkmark-circle"
            title="যাচাইকরণ অপেক্ষমাণ"
            count={pendingVerificationCount}
            color="#8B5CF6"
            onPress={() => router.push("/AdminVerification")}
          />
        </View>

        {/* Monitoring Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>পর্যবেক্ষণ ও নিয়ন্ত্রণ</Text>

          <StatCard
            icon="calendar"
            title="অ্যাপয়েন্টমেন্ট"
            count={totalAppointments}
            color="#06B6D4"
            onPress={() => router.push("/AdminAppointmentMonitoring")}
          />

          <StatCard
            icon="ban"
            title="ব্লক করা ব্যবহারকারী"
            count={blockedUsersCount}
            color="#DC2626"
            onPress={() => router.push("/AdminBlockedUsers")}
          />
        </View>

        {/* Control Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>সিস্টেম নিয়ন্ত্রণ</Text>

          <TouchableOpacity
            style={styles.controlCard}
            onPress={() => router.push("/AdminSettings")}
          >
            <Ionicons name="settings" size={28} color="#0ea5e9" />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.controlTitle}>সেটিংস</Text>
              <Text style={styles.controlDesc}>বিজ্ঞপ্তি, রক্ষণাবেক্ষণ মোড</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Quick Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>দ্রুত পরিসংখ্যান</Text>

          <View style={styles.statsRow}>
            <View style={styles.miniStat}>
              <Text style={styles.miniStatNumber}>{pendingDoctors.length}</Text>
              <Text style={styles.miniStatLabel}>মোট অনুরোধ</Text>
            </View>
            <View style={styles.miniStat}>
              <Text style={styles.miniStatNumber}>
                {pendingDoctors.filter((d: PendingDoctor) => d.bmdcVerified).length}
              </Text>
              <Text style={styles.miniStatLabel}>যাচাইকৃত</Text>
            </View>
            <View style={styles.miniStat}>
              <Text style={styles.miniStatNumber}>
                {appointments.filter((a: Appointment) => a.status === "completed").length}
              </Text>
              <Text style={styles.miniStatLabel}>সম্পন্ন</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  header: {
    backgroundColor: "#0ea5e9",
    padding: 20,
    paddingTop: 50,
    paddingBottom: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },

  headerSub: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    marginTop: 5,
  },

  content: {
    flex: 1,
    padding: 15,
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  statContent: {
    flex: 1,
    marginLeft: 12,
  },

  statCount: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },

  statTitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },

  controlCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  controlTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  controlDesc: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  miniStat: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  miniStatNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0ea5e9",
  },

  miniStatLabel: {
    fontSize: 11,
    color: "#666",
    marginTop: 8,
    textAlign: "center",
  },
});
