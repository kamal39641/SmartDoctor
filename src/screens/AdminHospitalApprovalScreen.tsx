import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AdminContext } from "../context/AdminContext";

export default function AdminHospitalApprovalScreen() {
  const router = useRouter();
  const { pendingHospitals, approveHospital, rejectHospital } = useContext(AdminContext);

  const handleApprove = (hospitalId: number) => {
    Alert.alert(
      "হাসপাতাল অনুমোদন",
      "এই হাসপাতালকে অনুমোদন করতে চান?",
      [
        {
          text: "বাতিল",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "অনুমোদন",
          onPress: () => {
            approveHospital(hospitalId);
            Alert.alert("সফল", "হাসপাতাল অনুমোদিত হয়েছে");
          },
        },
      ]
    );
  };

  const handleReject = (hospitalId: number) => {
    Alert.alert(
      "হাসপাতাল প্রত্যাখ্যান",
      "এই হাসপাতালকে প্রত্যাখ্যান করতে চান?",
      [
        {
          text: "বাতিল",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "প্রত্যাখ্যান",
          onPress: () => {
            rejectHospital(hospitalId);
            Alert.alert("সফল", "হাসপাতাল প্রত্যাখ্যাত হয়েছে");
          },
        },
      ]
    );
  };

  const renderHospitalCard = ({ item }: any) => (
    <View style={styles.hospitalCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.hospitalInfo}>
          <View style={styles.avatar}>
            <Ionicons name="business" size={35} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.hospitalName}>{item.name}</Text>
            <Text style={styles.regNumber}>REG: {item.registrationNumber}</Text>
          </View>
        </View>
        <View style={styles.dateBadge}>
          <Ionicons name="calendar" size={14} color="#666" />
          <Text style={styles.dateText}>{item.requestDate}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons name="mail" size={16} color="#F59E0B" />
          <Text style={styles.detailText}>{item.email}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="call" size={16} color="#F59E0B" />
          <Text style={styles.detailText}>{item.phone}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="location" size={16} color="#F59E0B" />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.approveBtn}
          onPress={() => handleApprove(item.id)}
        >
          <Ionicons name="checkmark" size={18} color="#fff" />
          <Text style={styles.approveBtnText}>অনুমোদন করুন</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rejectBtn}
          onPress={() => handleReject(item.id)}
        >
          <Ionicons name="close" size={18} color="#fff" />
          <Text style={styles.rejectBtnText}>প্রত্যাখ্যান করুন</Text>
        </TouchableOpacity>
      </View>
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
          <Text style={styles.headerTitle}>হাসপাতাল অনুমোদন</Text>
          <Text style={styles.headerSub}>অপেক্ষমাণ: {pendingHospitals.length}</Text>
        </View>
      </View>

      {pendingHospitals.length > 0 ? (
        <FlatList
          data={pendingHospitals}
          renderItem={renderHospitalCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle" size={60} color="#10b981" />
          <Text style={styles.emptyText}>সব হাসপাতাল অনুমোদিত!</Text>
          <Text style={styles.emptySubText}>নতুন অনুরোধের জন্য অপেক্ষা করছি</Text>
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
    backgroundColor: "#F59E0B",
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

  listContent: {
    padding: 15,
    paddingBottom: 30,
  },

  hospitalCard: {
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  hospitalInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#F59E0B",
    justifyContent: "center",
    alignItems: "center",
  },

  hospitalName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  regNumber: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },

  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  dateText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
  },

  details: {
    gap: 8,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  detailText: {
    fontSize: 13,
    color: "#555",
    flex: 1,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },

  approveBtn: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  approveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },

  rejectBtn: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  rejectBtnText: {
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
