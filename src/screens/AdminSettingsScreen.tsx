import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AdminContext } from "../context/AdminContext";

// ─── Types ────────────────────────────────────────────────────────────────────
type SettingItemProps = {
  icon: string;
  iconColor?: string;
  iconBg?: string;
  title: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
};

// ─── Sub-component ────────────────────────────────────────────────────────────
const SettingItem = ({
  icon,
  iconColor = "#0ea5e9",
  iconBg = "#e6f4fe",
  title,
  description,
  value,
  onChange,
  disabled = false,
}: SettingItemProps) => (
  <View style={[styles.settingItem, disabled && { opacity: 0.5 }]}>
    <View style={styles.settingLeft}>
      <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
        <Ionicons name={icon as any} size={22} color={iconColor} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.settingTitle}>{title}</Text>
        <Text style={styles.settingDescription}>{description}</Text>
      </View>
    </View>
    <Switch
      value={value}
      onValueChange={onChange}
      disabled={disabled}
      trackColor={{ false: "#d1d5db", true: "#0ea5e9" }}
      thumbColor={value ? "#fff" : "#f3f4f6"}
    />
  </View>
);

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function AdminSettingsScreen() {
  const router = useRouter();
  const { adminSettings, updateSettings, logoutAdmin } =
    useContext(AdminContext);

  // Local copy of settings for optimistic UI
  const [settings, setSettings] = useState({ ...adminSettings });
  const [savingMessage, setSavingMessage] = useState(false);
  const [resetting, setResetting] = useState(false);

  // ── helpers ──
  const toggle = (key: string, value: boolean) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
    updateSettings({ [key]: value });

    const labels: Record<string, [string, string]> = {
      notificationsEnabled: ["সিস্টেম বিজ্ঞপ্তি সক্ষম করা হয়েছে", "সিস্টেম বিজ্ঞপ্তি অক্ষম করা হয়েছে"],
      emailAlertsEnabled: ["ইমেইল সতর্কতা সক্ষম করা হয়েছে", "ইমেইল সতর্কতা অক্ষম করা হয়েছে"],
      autoApprovalEnabled: ["স্বয়ংক্রিয় অনুমোদন চালু হয়েছে", "স্বয়ংক্রিয় অনুমোদন বন্ধ হয়েছে"],
      maintenanceMode: ["রক্ষণাবেক্ষণ মোড চালু হয়েছে — ব্যবহারকারীরা অ্যাপ ব্যবহার করতে পারবেন না", "রক্ষণাবেক্ষণ মোড বন্ধ হয়েছে"],
      hospitalAutoApprove: ["হাসপাতাল স্বয়ংক্রিয় অনুমোদন চালু", "হাসপাতাল স্বয়ংক্রিয় অনুমোদন বন্ধ"],
      hospitalNotificationsEnabled: ["হাসপাতাল নোটিফিকেশন চালু", "হাসপাতাল নোটিফিকেশন বন্ধ"],
    };

    const pair = labels[key];
    if (pair) {
      Alert.alert("সেটিংস আপডেট", value ? pair[0] : pair[1]);
    }
  };

  const handleSaveMessage = () => {
    if (!settings.defaultHospitalApprovalMessage.trim()) {
      Alert.alert("ত্রুটি", "বার্তাটি খালি রাখা যাবে না।");
      return;
    }
    setSavingMessage(true);
    setTimeout(() => {
      updateSettings({
        defaultHospitalApprovalMessage: settings.defaultHospitalApprovalMessage,
      });
      setSavingMessage(false);
      Alert.alert("সফল ✓", "ডিফল্ট হাসপাতাল অনুমোদন বার্তা সংরক্ষণ করা হয়েছে।");
    }, 600);
  };

  const handleResetData = () => {
    Alert.alert(
      "⚠️ সমস্ত ডেটা রিসেট করুন",
      "এই ক্রিয়াটি সিস্টেমের সমস্ত ডেটা স্থায়ীভাবে মুছে দেবে। এটি অপরিবর্তনীয়।\n\nআপনি কি সত্যিই নিশ্চিত?",
      [
        { text: "বাতিল", style: "cancel" },
        {
          text: "হ্যাঁ, রিসেট করুন",
          style: "destructive",
          onPress: () => {
            setResetting(true);
            setTimeout(() => {
              setResetting(false);
              Alert.alert("সম্পন্ন", "সিস্টেম সফলভাবে রিসেট করা হয়েছে।");
            }, 1500);
          },
        },
      ]
    );
  };

  const handleExportLogs = () => {
    Alert.alert(
      "সিস্টেম লগ এক্সপোর্ট",
      "সিস্টেম লগ ফাইল তৈরি করে এক্সপোর্ট করা হবে।",
      [
        { text: "বাতিল", style: "cancel" },
        {
          text: "এক্সপোর্ট করুন",
          onPress: () => Alert.alert("সফল ✓", "লগ ফাইল সফলভাবে এক্সপোর্ট করা হয়েছে।"),
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      "লগআউট",
      "আপনি কি সত্যিই লগআউট করতে চান?",
      [
        { text: "বাতিল", style: "cancel" },
        {
          text: "লগআউট",
          style: "destructive",
          onPress: () => {
            logoutAdmin?.();
            router.replace("/");
          },
        },
      ]
    );
  };

  // ── render ──
  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>সিস্টেম সেটিংস</Text>
          <Text style={styles.headerSub}>অ্যাডমিন নিয়ন্ত্রণ প্যানেল</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── Maintenance mode banner ── */}
        {settings.maintenanceMode && (
          <View style={styles.maintenanceBanner}>
            <Ionicons name="warning" size={18} color="#92400e" />
            <Text style={styles.maintenanceBannerText}>
              রক্ষণাবেক্ষণ মোড চলছে — ব্যবহারকারীরা অ্যাপ ব্যবহার করতে পারবেন না
            </Text>
          </View>
        )}

        {/* ══════════════════════════════════════
            SECTION 1 — বিজ্ঞপ্তি
        ══════════════════════════════════════ */}
        <SectionHeader title="বিজ্ঞপ্তি" />

        <SettingItem
          icon="notifications"
          title="সিস্টেম বিজ্ঞপ্তি"
          description="নতুন অনুরোধ এবং আপডেটের জন্য পুশ বিজ্ঞপ্তি পান"
          value={settings.notificationsEnabled}
          onChange={(v) => toggle("notificationsEnabled", v)}
        />

        <SettingItem
          icon="mail"
          title="ইমেইল সতর্কতা"
          description="গুরুত্বপূর্ণ ঘটনার জন্য ইমেইল সতর্কতা পান"
          value={settings.emailAlertsEnabled}
          onChange={(v) => toggle("emailAlertsEnabled", v)}
        />

        {/* ══════════════════════════════════════
            SECTION 2 — অনুমোদন
        ══════════════════════════════════════ */}
        <SectionHeader title="অনুমোদন" />

        <SettingItem
          icon="checkmark-circle"
          iconColor="#10b981"
          iconBg="#d1fae5"
          title="স্বয়ংক্রিয় ডাক্তার অনুমোদন"
          description="যাচাইকৃত BMDC নম্বর দিয়ে ডাক্তারদের স্বয়ংক্রিয়ভাবে অনুমোদন করুন"
          value={settings.autoApprovalEnabled}
          onChange={(v) => toggle("autoApprovalEnabled", v)}
        />

        {/* ══════════════════════════════════════
            SECTION 3 — সিস্টেম
        ══════════════════════════════════════ */}
        <SectionHeader title="সিস্টেম" />

        <SettingItem
          icon="construct"
          iconColor="#f59e0b"
          iconBg="#fef3c7"
          title="রক্ষণাবেক্ষণ মোড"
          description="চালু থাকলে সাধারণ ব্যবহারকারীরা অ্যাপ ব্যবহার করতে পারবেন না"
          value={settings.maintenanceMode}
          onChange={(v) => toggle("maintenanceMode", v)}
        />

        {/* ══════════════════════════════════════
            SECTION 4 — হাসপাতাল সেটিংস
        ══════════════════════════════════════ */}
        {/* <SectionHeader title="হাসপাতাল সেটিংস" /> */}

        {/* <SettingItem
          icon="business"
          iconColor="#8b5cf6"
          iconBg="#ede9fe"
          title="স্বয়ংক্রিয় হাসপাতাল অনুমোদন"
          description="হাসপাতাল অনুরোধ স্বয়ংক্রিয়ভাবে অনুমোদন করুন"
          value={settings.hospitalAutoApprove}
          onChange={(v) => toggle("hospitalAutoApprove", v)}
        /> */}

        {/* <SettingItem
          icon="notifications-circle"
          iconColor="#0ea5e9"
          iconBg="#e6f4fe"
          title="হাসপাতাল নোটিফিকেশন"
          description="হাসপাতাল সংক্রান্ত ঘটনার জন্য নোটিফিকেশন পান"
          value={settings.hospitalNotificationsEnabled}
          onChange={(v) => toggle("hospitalNotificationsEnabled", v)}
        /> */}

        {/* Default approval message */}
        {/* <View style={[styles.settingItem, { flexDirection: "column", alignItems: "flex-start", gap: 10 }]}>
          <View style={styles.settingLeft}>
            <View style={[styles.iconBox, { backgroundColor: "#fef3c7" }]}>
              <Ionicons name="chatbubble-ellipses" size={22} color="#f59e0b" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingTitle}>ডিফল্ট অনুমোদন বার্তা</Text>
              <Text style={styles.settingDescription}>
                হাসপাতাল অনুমোদনের পরে প্রেরণ করা ডিফল্ট বার্তা
              </Text>
            </View>
          </View>

          <TextInput
            style={styles.textArea}
            value={settings.defaultHospitalApprovalMessage}
            onChangeText={(text) =>
              setSettings((prev: any) => ({ ...prev, defaultHospitalApprovalMessage: text }))
            }
            placeholder="অনুমোদন বার্তা লিখুন..."
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={[styles.saveBtn, savingMessage && { opacity: 0.7 }]}
            onPress={handleSaveMessage}
            disabled={savingMessage}
          >
            {savingMessage ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Ionicons name="save" size={16} color="#fff" />
                <Text style={styles.saveBtnText}>সংরক্ষণ করুন</Text>
              </>
            )}
          </TouchableOpacity>
        </View> */}

        {/* ══════════════════════════════════════
            SECTION 5 — বিপজ্জনক অঞ্চল
        ══════════════════════════════════════ */}
        <SectionHeader title="বিপজ্জনক অঞ্চল" danger />

        <View style={styles.dangerCard}>
          <TouchableOpacity
            style={[styles.actionButton, styles.dangerButton, resetting && { opacity: 0.6 }]}
            onPress={handleResetData}
            disabled={resetting}
          >
            {resetting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="trash-outline" size={20} color="#fff" />
            )}
            <Text style={styles.actionButtonText}>
              {resetting ? "রিসেট হচ্ছে..." : "সমস্ত ডেটা রিসেট করুন"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.warningButton]}
            onPress={handleExportLogs}
          >
            <Ionicons name="download-outline" size={20} color="#fff" />
            <Text style={styles.actionButtonText}>সিস্টেম লগ এক্সপোর্ট</Text>
          </TouchableOpacity>
        </View>

        {/* ══════════════════════════════════════
            SECTION 6 — সম্পর্কে
        ══════════════════════════════════════ */}
        <SectionHeader title="সম্পর্কে" />

        <View style={styles.infoCard}>
          {[
            { label: "অ্যাপ সংস্করণ", value: "v1.0.0" },
            { label: "বিল্ড", value: "2024.04.22" },
            { label: "ডাটাবেস", value: "সংযুক্ত ✓" },
          ].map((row, i, arr) => (
            <React.Fragment key={row.label}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>{row.label}</Text>
                <Text
                  style={[
                    styles.infoValue,
                    row.value.includes("✓") && { color: "#10b981" },
                  ]}
                >
                  {row.value}
                </Text>
              </View>
              {i < arr.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>

        {/* ══════════════════════════════════════
            LOGOUT
        ══════════════════════════════════════ */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>লগআউট</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

// ─── Small helper component ───────────────────────────────────────────────────
function SectionHeader({ title, danger }: { title: string; danger?: boolean }) {
  return (
    <Text style={[styles.sectionTitle, danger && { color: "#dc2626" }]}>
      {danger ? "⚠️  " : ""}{title}
    </Text>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  // Header
  header: {
    backgroundColor: "#0ea5e9",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    shadowColor: "#0ea5e9",
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
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  headerSub: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    marginTop: 2,
  },

  // Content
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
  },

  // Maintenance banner
  maintenanceBanner: {
    backgroundColor: "#fef3c7",
    borderWidth: 1,
    borderColor: "#f59e0b",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 15,
  },
  maintenanceBannerText: {
    flex: 1,
    color: "#92400e",
    fontSize: 13,
    fontWeight: "600",
  },

  // Section
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b7280",
    marginTop: 5,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // Setting item
  settingItem: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1f2937",
  },
  settingDescription: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 3,
    lineHeight: 17,
  },

  // Text area
  textArea: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: "#374151",
    width: "100%",
    minHeight: 80,
  },

  // Save button
  saveBtn: {
    backgroundColor: "#0ea5e9",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-end",
  },
  saveBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  // Danger card
  dangerCard: {
    gap: 10,
    marginBottom: 10,
  },
  actionButton: {
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  dangerButton: {
    backgroundColor: "#dc2626",
  },
  warningButton: {
    backgroundColor: "#f59e0b",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },

  // Info card
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b7280",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1f2937",
  },
  divider: {
    height: 1,
    backgroundColor: "#f3f4f6",
  },

  // Logout
  logoutButton: {
    backgroundColor: "#ef4444",
    padding: 16,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 5,
    marginBottom: 5,
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  logoutButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});