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

export default function AdminDoctorApprovalScreen() {
  const router = useRouter();
  const { pendingDoctors, approveDoctor, rejectDoctor, verifyBMDC } = useContext(AdminContext);

  const pendingList = pendingDoctors.filter((d: any) => d.status === "pending");

  const handleApprove = (doctorId: number) => {
    Alert.alert(
      "ডাক্তার অনুমোদন",
      "এই ডাক্তারকে অনুমোদন করতে চান?",
      [
        {
          text: "বাতিল",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "অনুমোদন",
          onPress: () => {
            approveDoctor(doctorId);
            Alert.alert("সফল", "ডাক্তার অনুমোদিত হয়েছে");
          },
        },
      ]
    );
  };

  const handleReject = (doctorId: number) => {
    Alert.alert(
      "ডাক্তার প্রত্যাখ্যান",
      "এই ডাক্তারকে প্রত্যাখ্যান করতে চান?",
      [
        {
          text: "বাতিল",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "প্রত্যাখ্যান",
          onPress: () => {
            rejectDoctor(doctorId);
            Alert.alert("সফল", "ডাক্তার প্রত্যাখ্যাত হয়েছে");
          },
        },
      ]
    );
  };

  const handleVerifyBMDC = (doctorId: number) => {
    Alert.alert(
      "BMDC যাচাইকরণ",
      "এই BMDC সংখ্যা যাচাই করতে চান?",
      [
        {
          text: "বাতিল",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "যাচাই করুন",
          onPress: () => {
            verifyBMDC(doctorId);
            Alert.alert("সফল", "BMDC যাচাই করা হয়েছে");
          },
        },
      ]
    );
  };

  const renderDoctorCard = ({ item }: any) => (
    <View style={styles.doctorCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.doctorInfo}>
          <View style={styles.avatar}>
            <Ionicons name="person-circle" size={40} color="#0ea5e9" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.doctorName}>{item.name}</Text>
            <Text style={styles.specialty}>{item.specialization}</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: item.bmdcVerified ? "#10b981" : "#ef4444" },
          ]}
        >
          <Text style={styles.statusText}>
            {item.bmdcVerified ? "✓ যাচাইকৃত" : "অপেক্ষমাণ"}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons name="mail" size={16} color="#0ea5e9" />
          <Text style={styles.detailText}>{item.email}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="call" size={16} color="#0ea5e9" />
          <Text style={styles.detailText}>{item.phone}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="document" size={16} color="#0ea5e9" />
          <Text style={styles.detailText}>BMDC: {item.bmdcNumber}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="school" size={16} color="#0ea5e9" />
          <Text style={styles.detailText}>{item.medicalCollege}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="#0ea5e9" />
          <Text style={styles.detailText}>নিবন্ধিত: {item.registeredDate}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Actions */}
      <View style={styles.actions}>
        {!item.bmdcVerified && (
          <TouchableOpacity
            style={styles.verifyBtn}
            onPress={() => handleVerifyBMDC(item.id)}
          >
            <Ionicons name="checkmark" size={18} color="#fff" />
            <Text style={styles.verifyBtnText}>BMDC যাচাই করুন</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.approveBtn}
          onPress={() => handleApprove(item.id)}
        >
          <Ionicons name="thumbs-up" size={18} color="#fff" />
          <Text style={styles.approveBtnText}>অনুমোদন</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rejectBtn}
          onPress={() => handleReject(item.id)}
        >
          <Ionicons name="thumbs-down" size={18} color="#fff" />
          <Text style={styles.rejectBtnText}>প্রত্যাখ্যান</Text>
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
          <Text style={styles.headerTitle}>ডাক্তার অনুমোদন</Text>
          <Text style={styles.headerSub}>অপেক্ষমাণ: {pendingList.length}</Text>
        </View>
      </View>

      {pendingList.length > 0 ? (
        <FlatList
          data={pendingList}
          renderItem={renderDoctorCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle" size={60} color="#10b981" />
          <Text style={styles.emptyText}>সব ডাক্তার অনুমোদিত!</Text>
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
    backgroundColor: "#0ea5e9",
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

  doctorCard: {
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

  doctorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f9ff",
    justifyContent: "center",
    alignItems: "center",
  },

  doctorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  specialty: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
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
    gap: 8,
    justifyContent: "space-between",
  },

  verifyBtn: {
    flex: 1,
    backgroundColor: "#8B5CF6",
    padding: 10,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  verifyBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  approveBtn: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 10,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  approveBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  rejectBtn: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },

  rejectBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
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
