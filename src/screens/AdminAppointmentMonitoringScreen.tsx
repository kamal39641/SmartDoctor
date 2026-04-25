import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AdminContext, Appointment } from "../context/AdminContext";

export default function AdminAppointmentMonitoringScreen() {
  const router = useRouter();
  const { appointments } = useContext(AdminContext);
  const [filterStatus, setFilterStatus] = useState<"all" | "scheduled" | "completed">("all");

  const filteredAppointments = 
    filterStatus === "all" 
      ? appointments 
      : appointments.filter((a: Appointment) => a.status === filterStatus);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "#3b82f6";
      case "completed":
        return "#10b981";
      case "cancelled":
        return "#ef4444";
      default:
        return "#999";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "scheduled":
        return "নির্ধারিত";
      case "completed":
        return "সম্পন্ন";
      case "cancelled":
        return "বাতিল";
      default:
        return status;
    }
  };

  const renderAppointmentCard = ({ item }: any) => (
    <View style={styles.appointmentCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.appointmentInfo}>
          <View style={styles.dateBox}>
            <Ionicons name="calendar" size={20} color="#0ea5e9" />
            <View>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
          <View style={styles.statusBadge}>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(item.status) },
              ]}
            />
            <Text style={[styles.statusLabel, { color: getStatusColor(item.status) }]}>
              {getStatusLabel(item.status)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>রোগী</Text>
          <View style={styles.detailRow}>
            <Ionicons name="person" size={18} color="#0ea5e9" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.patientName}>{item.patientName}</Text>
              <Text style={styles.patientPhone}>{item.patientPhone}</Text>
            </View>
          </View>
        </View>

        <View style={styles.detailSection}>
          <Text style={styles.sectionTitle}>ডাক্তার</Text>
          <View style={styles.detailRow}>
            <Ionicons name="medical" size={18} color="#ef4444" />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.doctorName}>{item.doctorName}</Text>
              <Text style={styles.hospitalName}>{item.hospital}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Action */}
      <TouchableOpacity style={styles.detailsBtn}>
        <Ionicons name="information-circle" size={18} color="#fff" />
        <Text style={styles.detailsBtnText}>বিস্তারিত দেখুন</Text>
      </TouchableOpacity>
    </View>
  );

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
          <Text style={styles.headerTitle}>অ্যাপয়েন্টমেন্ট পর্যবেক্ষণ</Text>
          <Text style={styles.headerSub}>মোট: {appointments.length}</Text>
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <Pressable
          style={[styles.filterTab, filterStatus === "all" && styles.filterTabActive]}
          onPress={() => setFilterStatus("all")}
        >
          <Text
            style={[
              styles.filterTabText,
              filterStatus === "all" && styles.filterTabTextActive,
            ]}
          >
            সব ({appointments.length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.filterTab, filterStatus === "scheduled" && styles.filterTabActive]}
          onPress={() => setFilterStatus("scheduled")}
        >
          <Text
            style={[
              styles.filterTabText,
              filterStatus === "scheduled" && styles.filterTabTextActive,
            ]}
          >
            নির্ধারিত ({appointments.filter((a: Appointment) => a.status === "scheduled").length})
          </Text>
        </Pressable>

        <Pressable
          style={[styles.filterTab, filterStatus === "completed" && styles.filterTabActive]}
          onPress={() => setFilterStatus("completed")}
        >
          <Text
            style={[
              styles.filterTabText,
              filterStatus === "completed" && styles.filterTabTextActive,
            ]}
          >
            সম্পন্ন ({appointments.filter((a: Appointment) => a.status === "completed").length})
          </Text>
        </Pressable>
      </View>

      {/* Appointments List */}
      {filteredAppointments.length > 0 ? (
        <FlatList
          data={filteredAppointments}
          renderItem={renderAppointmentCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={60} color="#ccc" />
          <Text style={styles.emptyText}>কোন অ্যাপয়েন্টমেন্ট নেই</Text>
          <Text style={styles.emptySubText}>এই বিভাগে কোন তথ্য পাওয়া যায়নি</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  header: {
    backgroundColor: "#06B6D4",
    padding: 20,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  backButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 20,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  headerSub: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    marginTop: 2,
  },

  filterContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },

  filterTab: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: "center",
  },

  filterTabActive: {
    backgroundColor: "#06B6D4",
  },

  filterTabText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
  },

  filterTabTextActive: {
    color: "#fff",
  },

  listContent: {
    padding: 15,
    paddingBottom: 30,
  },

  appointmentCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  cardHeader: {
    marginBottom: 12,
  },

  appointmentInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  date: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },

  time: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  statusLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
  },

  details: {
    gap: 12,
  },

  detailSection: {
    gap: 8,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#999",
    textTransform: "uppercase",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  patientName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },

  patientPhone: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  doctorName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },

  hospitalName: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  detailsBtn: {
    backgroundColor: "#06B6D4",
    padding: 12,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  detailsBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
  },

  emptySubText: {
    fontSize: 13,
    color: "#999",
    marginTop: 5,
  },
});
