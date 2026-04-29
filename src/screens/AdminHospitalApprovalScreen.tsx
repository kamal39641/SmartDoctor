import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Modal,
  Switch,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AdminContext } from "../context/AdminContext";

export default function AdminHospitalApprovalScreen() {
  const router = useRouter();
  const {
    pendingHospitals,
    approveHospital,
    rejectHospital,
    adminSettings,
    updateSettings,
  } = useContext(AdminContext);

  const [settingsVisible, setSettingsVisible] = useState(false);
  const [savingMessage, setSavingMessage] = useState(false);

  const [localSettings, setLocalSettings] = useState({
    hospitalAutoApprove:
      adminSettings?.hospitalAutoApprove ?? false,
    hospitalNotificationsEnabled:
      adminSettings?.hospitalNotificationsEnabled ?? true,
    defaultHospitalApprovalMessage:
      adminSettings?.defaultHospitalApprovalMessage ??
      "আপনার হাসপাতাল অনুমোদিত হয়েছে।",
  });

  // ── toggle switch ──
  const toggleLocal = (key: string, value: boolean) => {
    setLocalSettings((prev) => ({ ...prev, [key]: value }));
    updateSettings({ [key]: value });
  };

  // ── save default message ──
  const handleSaveMessage = () => {
    if (!localSettings.defaultHospitalApprovalMessage.trim()) {
      Alert.alert("ত্রুটি", "বার্তাটি খালি রাখা যাবে না।");
      return;
    }
    setSavingMessage(true);
    setTimeout(() => {
      updateSettings({
        defaultHospitalApprovalMessage:
          localSettings.defaultHospitalApprovalMessage,
      });
      setSavingMessage(false);
      Alert.alert("সফল ✓", "ডিফল্ট অনুমোদন বার্তা সংরক্ষণ করা হয়েছে।");
    }, 600);
  };

  // ── approve ──
  const handleApprove = (hospitalId: number, hospitalName: string) => {
    const message = localSettings.hospitalAutoApprove
      ? `"${hospitalName}" স্বয়ংক্রিয় অনুমোদন চালু আছে — সরাসরি অনুমোদন করা হবে।`
      : `"${hospitalName}" কে অনুমোদন করতে চান?\n\nঅনুমোদন বার্তা: "${localSettings.defaultHospitalApprovalMessage}"`;

    Alert.alert("হাসপাতাল অনুমোদন", message, [
      { text: "বাতিল", style: "cancel" },
      {
        text: "অনুমোদন করুন",
        onPress: () => {
          approveHospital(hospitalId);
          if (localSettings.hospitalNotificationsEnabled) {
            Alert.alert(
              "✓ অনুমোদিত",
              `"${hospitalName}" সফলভাবে অনুমোদিত হয়েছে।\nবার্তা পাঠানো হয়েছে।`
            );
          } else {
            Alert.alert("✓ অনুমোদিত", `"${hospitalName}" সফলভাবে অনুমোদিত হয়েছে।`);
          }
        },
      },
    ]);
  };

  // ── reject ──
  const handleReject = (hospitalId: number, hospitalName: string) => {
    Alert.alert(
      "হাসপাতাল প্রত্যাখ্যান",
      `"${hospitalName}" কে প্রত্যাখ্যান করতে চান?`,
      [
        { text: "বাতিল", style: "cancel" },
        {
          text: "প্রত্যাখ্যান করুন",
          style: "destructive",
          onPress: () => {
            rejectHospital(hospitalId);
            Alert.alert("প্রত্যাখ্যাত", `"${hospitalName}" প্রত্যাখ্যাত হয়েছে।`);
          },
        },
      ]
    );
  };

  // ── hospital card ──
  const renderHospitalCard = ({ item }: any) => (
    <View style={styles.hospitalCard}>
      {/* Auto-approve badge */}
      {localSettings.hospitalAutoApprove && (
        <View style={styles.autoBadge}>
          <Ionicons name="flash" size={12} color="#fff" />
          <Text style={styles.autoBadgeText}>স্বয়ংক্রিয় মোড চালু</Text>
        </View>
      )}

      {/* Card header */}
      <View style={styles.cardHeader}>
        <View style={styles.hospitalInfo}>
          <View style={styles.avatar}>
            <Ionicons name="business" size={28} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.hospitalName}>{item.name}</Text>
            <Text style={styles.regNumber}>REG: {item.registrationNumber}</Text>
          </View>
        </View>
        <View style={styles.dateBadge}>
          <Ionicons name="calendar-outline" size={13} color="#666" />
          <Text style={styles.dateText}>{item.requestDate}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Details */}
      <View style={styles.details}>
        {[
          { icon: "mail-outline", text: item.email },
          { icon: "call-outline", text: item.phone },
          { icon: "location-outline", text: item.address },
        ].map((row) => (
          <View key={row.icon} style={styles.detailRow}>
            <Ionicons name={row.icon as any} size={15} color="#F59E0B" />
            <Text style={styles.detailText}>{row.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.approveBtn}
          onPress={() => handleApprove(item.id, item.name)}
        >
          <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
          <Text style={styles.approveBtnText}>অনুমোদন</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rejectBtn}
          onPress={() => handleReject(item.id, item.name)}
        >
          <Ionicons name="close-circle-outline" size={18} color="#fff" />
          <Text style={styles.rejectBtnText}>প্রত্যাখ্যান</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>হাসপাতাল অনুমোদন</Text>
          <Text style={styles.headerSub}>
            অপেক্ষমাণ: {pendingHospitals.length}
            {localSettings.hospitalAutoApprove ? "  •  স্বয়ংক্রিয় মোড চালু" : ""}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => setSettingsVisible(true)}
        >
          <Ionicons name="settings-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ── Notification bar (when enabled) ── */}
      {localSettings.hospitalNotificationsEnabled && pendingHospitals.length > 0 && (
        <View style={styles.notifBar}>
          <Ionicons name="notifications" size={15} color="#0ea5e9" />
          <Text style={styles.notifBarText}>
            নোটিফিকেশন চালু — {pendingHospitals.length}টি নতুন অনুরোধ রয়েছে
          </Text>
        </View>
      )}

      {/* ── List ── */}
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
          <Ionicons name="checkmark-circle" size={64} color="#10b981" />
          <Text style={styles.emptyText}>সব হাসপাতাল অনুমোদিত!</Text>
          <Text style={styles.emptySubText}>নতুন অনুরোধের জন্য অপেক্ষা করছি</Text>
        </View>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          SETTINGS MODAL
      ══════════════════════════════════════════════════════════════════════ */}
      <Modal visible={settingsVisible} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>

            {/* Modal header */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderLeft}>
                <View style={styles.modalHeaderIcon}>
                  <Ionicons name="business" size={20} color="#F59E0B" />
                </View>
                <Text style={styles.modalTitle}>হাসপাতাল সেটিংস</Text>
              </View>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setSettingsVisible(false)}
              >
                <Ionicons name="close" size={22} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>

              {/* ── 1. স্বয়ংক্রিয় অনুমোদন ── */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionLabel}>অনুমোদন</Text>

                <View style={styles.modalSettingItem}>
                  <View style={styles.modalSettingLeft}>
                    <View style={[styles.modalIconBox, { backgroundColor: "#d1fae5" }]}>
                      <Ionicons name="flash" size={20} color="#10b981" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.modalSettingTitle}>স্বয়ংক্রিয় হাসপাতাল অনুমোদন</Text>
                      <Text style={styles.modalSettingDesc}>
                        চালু থাকলে হাসপাতালের request আসলে manually review না করেই
                        automatically approve হয়ে যাবে
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={localSettings.hospitalAutoApprove}
                    onValueChange={(v) => toggleLocal("hospitalAutoApprove", v)}
                    trackColor={{ false: "#d1d5db", true: "#10b981" }}
                    thumbColor={localSettings.hospitalAutoApprove ? "#fff" : "#f3f4f6"}
                  />
                </View>

                {localSettings.hospitalAutoApprove && (
                  <View style={styles.infoNote}>
                    <Ionicons name="information-circle" size={15} color="#10b981" />
                    <Text style={styles.infoNoteText}>
                      নতুন হাসপাতাল request গুলো এখন স্বয়ংক্রিয়ভাবে অনুমোদিত হবে
                    </Text>
                  </View>
                )}
              </View>

              {/* ── 2. নোটিফিকেশন ── */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionLabel}>নোটিফিকেশন</Text>

                <View style={styles.modalSettingItem}>
                  <View style={styles.modalSettingLeft}>
                    <View style={[styles.modalIconBox, { backgroundColor: "#e6f4fe" }]}>
                      <Ionicons name="notifications" size={20} color="#0ea5e9" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.modalSettingTitle}>হাসপাতাল নোটিফিকেশন</Text>
                      <Text style={styles.modalSettingDesc}>
                        নতুন হাসপাতাল request আসলে এবং approval/rejection হলে
                        notification পাবেন
                      </Text>
                    </View>
                  </View>
                  <Switch
                    value={localSettings.hospitalNotificationsEnabled}
                    onValueChange={(v) => toggleLocal("hospitalNotificationsEnabled", v)}
                    trackColor={{ false: "#d1d5db", true: "#0ea5e9" }}
                    thumbColor={localSettings.hospitalNotificationsEnabled ? "#fff" : "#f3f4f6"}
                  />
                </View>

                {!localSettings.hospitalNotificationsEnabled && (
                  <View style={[styles.infoNote, { backgroundColor: "#fef9c3", borderColor: "#fde047" }]}>
                    <Ionicons name="warning" size={15} color="#ca8a04" />
                    <Text style={[styles.infoNoteText, { color: "#854d0e" }]}>
                      নোটিফিকেশন বন্ধ — নতুন request এলে জানতে পারবেন না
                    </Text>
                  </View>
                )}
              </View>

              {/* ── 3. ডিফল্ট অনুমোদন বার্তা ── */}
              <View style={styles.modalSection}>
                <Text style={styles.modalSectionLabel}>অনুমোদন বার্তা</Text>

                <View style={[styles.modalSettingItem, { flexDirection: "column", gap: 12 }]}>
                  <View style={styles.modalSettingLeft}>
                    <View style={[styles.modalIconBox, { backgroundColor: "#fef3c7" }]}>
                      <Ionicons name="chatbubble-ellipses" size={20} color="#f59e0b" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.modalSettingTitle}>ডিফল্ট অনুমোদন বার্তা</Text>
                      <Text style={styles.modalSettingDesc}>
                        হাসপাতাল approve হলে তাদের কাছে এই বার্তাটি পাঠানো হবে
                      </Text>
                    </View>
                  </View>

                  <TextInput
                    style={styles.textArea}
                    value={localSettings.defaultHospitalApprovalMessage}
                    onChangeText={(t) =>
                      setLocalSettings((prev) => ({
                        ...prev,
                        defaultHospitalApprovalMessage: t,
                      }))
                    }
                    placeholder="অনুমোদন বার্তা লিখুন..."
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />

                  {/* Preview */}
                  {localSettings.defaultHospitalApprovalMessage.trim() !== "" && (
                    <View style={styles.previewBox}>
                      <Text style={styles.previewLabel}>প্রিভিউ:</Text>
                      <Text style={styles.previewText}>
                        {localSettings.defaultHospitalApprovalMessage}
                      </Text>
                    </View>
                  )}

                  <TouchableOpacity
                    style={[styles.saveBtn, savingMessage && { opacity: 0.7 }]}
                    onPress={handleSaveMessage}
                    disabled={savingMessage}
                  >
                    {savingMessage ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <>
                        <Ionicons name="save-outline" size={16} color="#fff" />
                        <Text style={styles.saveBtnText}>বার্তা সংরক্ষণ করুন</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Done button */}
              <TouchableOpacity
                style={styles.doneBtn}
                onPress={() => setSettingsVisible(false)}
              >
                <Text style={styles.doneBtnText}>সম্পন্ন</Text>
              </TouchableOpacity>

              <View style={{ height: 20 }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f3f4f6" },

  // Header
  header: {
    backgroundColor: "#F59E0B",
    paddingTop: 50,
    paddingBottom: 18,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  backButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  headerSub: { color: "rgba(255,255,255,0.9)", fontSize: 12, marginTop: 2 },
  settingsButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 9,
    borderRadius: 20,
  },

  // Notification bar
  notifBar: {
    backgroundColor: "#eff6ff",
    borderBottomWidth: 1,
    borderBottomColor: "#bfdbfe",
    paddingHorizontal: 15,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notifBarText: { color: "#1d4ed8", fontSize: 13, fontWeight: "500" },

  // List
  listContent: { padding: 15, paddingBottom: 30 },

  // Hospital card
  hospitalCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  autoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#10b981",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 10,
  },
  autoBadgeText: { color: "#fff", fontSize: 11, fontWeight: "700" },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  hospitalInfo: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#F59E0B",
    justifyContent: "center",
    alignItems: "center",
  },
  hospitalName: { fontSize: 15, fontWeight: "bold", color: "#1f2937" },
  regNumber: { fontSize: 12, color: "#9ca3af", marginTop: 2 },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
  },
  dateText: { fontSize: 11, color: "#6b7280", fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#f3f4f6", marginVertical: 12 },
  details: { gap: 8 },
  detailRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  detailText: { fontSize: 13, color: "#4b5563", flex: 1 },
  actions: { flexDirection: "row", gap: 10 },
  approveBtn: {
    flex: 1,
    backgroundColor: "#10b981",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  approveBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },
  rejectBtn: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  rejectBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },

  // Empty state
  emptyState: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, fontWeight: "bold", color: "#1f2937", marginTop: 15 },
  emptySubText: { fontSize: 13, color: "#9ca3af", marginTop: 5 },

  // Modal
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: "85%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalHeaderLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  modalHeaderIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#fef3c7",
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", color: "#1f2937" },
  modalCloseBtn: {
    backgroundColor: "#f3f4f6",
    padding: 6,
    borderRadius: 20,
  },

  // Modal sections
  modalSection: { marginBottom: 20 },
  modalSectionLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  modalSettingItem: {
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#f3f4f6",
  },
  modalSettingLeft: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    flex: 1,
  },
  modalIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalSettingTitle: { fontSize: 14, fontWeight: "700", color: "#1f2937" },
  modalSettingDesc: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 3,
    lineHeight: 17,
  },

  // Info note
  infoNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 8,
    padding: 10,
    marginTop: 8,
  },
  infoNoteText: { fontSize: 12, color: "#166534", flex: 1 },

  // Text area
  textArea: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#374151",
    width: "100%",
    minHeight: 80,
  },

  // Preview box
  previewBox: {
    backgroundColor: "#fffbeb",
    borderWidth: 1,
    borderColor: "#fde68a",
    borderRadius: 8,
    padding: 10,
  },
  previewLabel: { fontSize: 11, fontWeight: "700", color: "#92400e", marginBottom: 4 },
  previewText: { fontSize: 13, color: "#78350f", fontStyle: "italic" },

  // Save button
  saveBtn: {
    backgroundColor: "#F59E0B",
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    alignSelf: "flex-end",
  },
  saveBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },

  // Done button
  doneBtn: {
    backgroundColor: "#1f2937",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },
  doneBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
});