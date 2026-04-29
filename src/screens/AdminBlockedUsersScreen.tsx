import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AdminContext } from "../context/AdminContext";

export default function AdminBlockedUsersScreen() {
  const router = useRouter();
  const { blockedUsers, unblockUser, blockUser } = useContext(AdminContext);
  const [blockModalVisible, setBlockModalVisible] = useState(false);
  const [blockName, setBlockName] = useState("");
  const [blockEmail, setBlockEmail] = useState("");
  const [blockReason, setBlockReason] = useState("");

  const handleUnblock = (userId: number) => {
    Alert.alert(
      "ব্লক সরান",
      "এই ব্যবহারকারীকে আনব্লক করতে চান?",
      [
        {
          text: "বাতিল",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "আনব্লক করুন",
          onPress: () => {
            unblockUser(userId);
            Alert.alert("সফল", "ব্যবহারকারী আনব্লক করা হয়েছে");
          },
        },
      ]
    );
  };

  const renderBlockedUserCard = ({ item }: any) => (
    <View style={styles.userCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.userInfo}>
          <View
            style={[
              styles.avatar,
              {
                backgroundColor:
                  item.userType === "doctor"
                    ? "#dbeafe"
                    : "#fef3c7",
              },
            ]}
          >
            <Ionicons
              name={item.userType === "doctor" ? "person" : "person-outline"}
              size={30}
              color={item.userType === "doctor" ? "#0ea5e9" : "#f59e0b"}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{item.userName}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        </View>
        <View
          style={[
            styles.typeBadge,
            {
              backgroundColor: item.userType === "doctor" ? "#dbeafe" : "#fef3c7",
            },
          ]}
        >
          <Text
            style={[
              styles.typeBadgeText,
              {
                color: item.userType === "doctor" ? "#0ea5e9" : "#b45309",
              },
            ]}
          >
            {item.userType === "doctor" ? "ডাক্তার" : "রোগী"}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons name="ban" size={18} color="#DC2626" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.detailLabel}>ব্লক কারণ</Text>
            <Text style={styles.detailValue}>{item.reason}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={18} color="#DC2626" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.detailLabel}>ব্লক করার তারিখ</Text>
            <Text style={styles.detailValue}>{item.blockedDate}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="person-circle" size={18} color="#DC2626" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.detailLabel}>দ্বারা ব্লক করা হয়েছে</Text>
            <Text style={styles.detailValue}>{item.blockedBy}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Action */}
      <TouchableOpacity
        style={styles.unblockBtn}
        onPress={() => handleUnblock(item.id)}
      >
        <Ionicons name="lock-open" size={18} color="#fff" />
        <Text style={styles.unblockBtnText}>আনব্লক করুন</Text>
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
          <Text style={styles.headerTitle}>ব্লক করা ব্যবহারকারী</Text>
          <Text style={styles.headerSub}>মোট: {blockedUsers.length}</Text>
        </View>
        <TouchableOpacity style={styles.blockButton} onPress={() => setBlockModalVisible(true)}>
          <Ionicons name="person-remove" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {blockedUsers.length > 0 ? (
        <FlatList
          data={blockedUsers}
          renderItem={renderBlockedUserCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-circle" size={60} color="#10b981" />
          <Text style={styles.emptyText}>কোন ব্লক করা ব্যবহারকারী নেই</Text>
          <Text style={styles.emptySubText}>সব ব্যবহারকারী সক্রিয়</Text>
        </View>
      )}

      <Modal visible={blockModalVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>ডাক্তার ব্লক করুন</Text>

            <Text style={styles.inputLabel}>ডাক্তারের নাম</Text>
            <TextInput style={styles.input} value={blockName} onChangeText={setBlockName} placeholder="ডাক্তারের নাম" />

            <Text style={styles.inputLabel}>ইমেইল</Text>
            <TextInput style={styles.input} value={blockEmail} onChangeText={setBlockEmail} placeholder="doctor@email.com" keyboardType="email-address" />

            <Text style={styles.inputLabel}>ব্লক করার কারণ</Text>
            <TextInput style={[styles.input, { height: 80 }]} value={blockReason} onChangeText={setBlockReason} placeholder="কারণ লিখুন" multiline />

            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setBlockModalVisible(false)}>
                <Text style={styles.cancelText}>বাতিল</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  if (!blockName || !blockEmail || !blockReason) {
                    Alert.alert("ত্রুটি", "সব ফিল্ড পূরণ করুন");
                    return;
                  }
                  // use email as userId
                  blockUser(blockEmail, blockName, blockEmail, "doctor", blockReason);
                  Alert.alert("সফল", "ডাক্তার ব্লক করা হয়েছে");
                  setBlockModalVisible(false);
                  setBlockName("");
                  setBlockEmail("");
                  setBlockReason("");
                }}
              >
                <Text style={styles.confirmText}>ব্লক করুন</Text>
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
    backgroundColor: "#f3f4f6",
  },

  header: {
    backgroundColor: "#DC2626",
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

  userCard: {
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

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  email: {
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

  unblockBtn: {
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  unblockBtnText: {
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
  blockButton: {
    position: "absolute",
    right: 15,
    top: 50,
    backgroundColor: "rgba(255,255,255,0.12)",
    padding: 8,
    borderRadius: 18,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: "#333",
    marginTop: 8,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#f3f4f6",
    borderRadius: 8,
    padding: 10,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 12,
  },
  cancelBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  cancelText: {
    color: "#666",
  },
  confirmBtn: {
    backgroundColor: "#DC2626",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "700",
  },
});
