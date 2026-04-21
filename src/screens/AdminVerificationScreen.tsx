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

export default function AdminVerificationScreen() {
  const router = useRouter();
  const { verifications, verifyUser, rejectVerification } = useContext(AdminContext);

  const pendingVerifications = verifications.filter((v) => v.status === "pending");

  const handleVerify = (verificationId: number) => {
    Alert.alert(
      "যাচাইকরণ অনুমোদন",
      "এই যাচাইকরণ অনুমোদন করতে চান?",
      [
        {
          text: "বাতিল",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "অনুমোদন",
          onPress: () => {
            verifyUser(verificationId);
            Alert.alert("সফল", "যাচাইকরণ অনুমোদিত হয়েছে");
          },
        },
      ]
    );
  };

  const handleReject = (verificationId: number) => {
    Alert.alert(
      "যাচাইকরণ প্রত্যাখ্যান",
      "এই যাচাইকরণ প্রত্যাখ্যান করতে চান?",
      [
        {
          text: "বাতিল",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "প্রত্যাখ্যান",
          onPress: () => {
            rejectVerification(verificationId);
            Alert.alert("সফল", "যাচাইকরণ প্রত্যাখ্যাত হয়েছে");
          },
        },
      ]
    );
  };

  const getVerificationIcon = (type: string) => {
    switch (type) {
      case "bmdc":
        return "document-text";
      case "phone":
        return "call";
      case "email":
        return "mail";
      default:
        return "checkmark-circle";
    }
  };

  const getVerificationLabel = (type: string) => {
    switch (type) {
      case "bmdc":
        return "BMDC নম্বর";
      case "phone":
        return "ফোন নম্বর";
      case "email":
        return "ইমেইল";
      default:
        return "যাচাইকরণ";
    }
  };

  const renderVerificationCard = ({ item }: any) => (
    <View style={styles.verificationCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <View
            style={[
              styles.typeIcon,
              {
                backgroundColor:
                  item.userType === "doctor"
                    ? "#dbeafe"
                    : "#f0fdf4",
              },
            ]}
          >
            <Ionicons
              name={item.userType === "doctor" ? "person" : "person-outline"}
              size={24}
              color={item.userType === "doctor" ? "#0ea5e9" : "#10b981"}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.userType}>
              {item.userType === "doctor" ? "ডাক্তার" : "রোগী"}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.typeBadge,
            {
              backgroundColor:
                item.verificationType === "bmdc"
                  ? "#ede9fe"
                  : item.verificationType === "phone"
                  ? "#dbeafe"
                  : "#fef3c7",
            },
          ]}
        >
          <Text
            style={[
              styles.typeBadgeText,
              {
                color:
                  item.verificationType === "bmdc"
                    ? "#7c3aed"
                    : item.verificationType === "phone"
                    ? "#0ea5e9"
                    : "#b45309",
              },
            ]}
          >
            {getVerificationLabel(item.verificationType)}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons
            name={getVerificationIcon(item.verificationType)}
            size={18}
            color="#8B5CF6"
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.detailLabel}>মূল্য</Text>
            <Text style={styles.detailValue}>{item.value}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={18} color="#8B5CF6" />
          <View style={{ flex: 1 }}>
            <Text style={styles.detailLabel}>জমা দেওয়ার তারিখ</Text>
            <Text style={styles.detailValue}>{item.submittedDate}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.verifyBtn}
          onPress={() => handleVerify(item.id)}
        >
          <Ionicons name="checkmark" size={18} color="#fff" />
          <Text style={styles.verifyBtnText}>অনুমোদন করুন</Text>
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
          <Text style={styles.headerTitle}>যাচাইকরণ ব্যবস্থাপনা</Text>
          <Text style={styles.headerSub}>অপেক্ষমাণ: {pendingVerifications.length}</Text>
        </View>
      </View>

      {pendingVerifications.length > 0 ? (
        <FlatList
          data={pendingVerifications}
          renderItem={renderVerificationCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle" size={60} color="#10b981" />
          <Text style={styles.emptyText}>সব যাচাইকরণ সম্পন্ন!</Text>
          <Text style={styles.emptySubText}>কোন অপেক্ষমাণ যাচাইকরণ নেই</Text>
        </View>
      )}

      {/* Verified Tab */}
      {verifications.filter((v) => v.status === "verified").length > 0 && (
        <View style={styles.verifiedSection}>
          <Text style={styles.verifiedTitle}>
            যাচাইকৃত: {verifications.filter((v) => v.status === "verified").length}
          </Text>
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
    backgroundColor: "#8B5CF6",
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

  verificationCard: {
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
    alignItems: "center",
    marginBottom: 12,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },

  typeIcon: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  userName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },

  userType: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },

  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  typeBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginVertical: 12,
  },

  details: {
    gap: 10,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  detailLabel: {
    fontSize: 11,
    color: "#999",
    textTransform: "uppercase",
  },

  detailValue: {
    fontSize: 13,
    color: "#333",
    fontWeight: "600",
    marginTop: 2,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },

  verifyBtn: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  verifyBtnText: {
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

  verifiedSection: {
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  verifiedTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#10b981",
    textTransform: "uppercase",
  },
});
