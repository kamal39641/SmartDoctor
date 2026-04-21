import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AdminContext } from "../context/AdminContext";

export default function AdminSettingsScreen() {
  const router = useRouter();
  const { adminSettings, updateSettings } = useContext(AdminContext);
  const [settings, setSettings] = useState(adminSettings);

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev: any) => ({ ...prev, [key]: value }));
    updateSettings({ [key]: value });

    let message = "";
    switch (key) {
      case "notificationsEnabled":
        message = value
          ? "বিজ্ঞপ্তি সক্ষম করা হয়েছে"
          : "বিজ্ঞপ্তি অক্ষম করা হয়েছে";
        break;
      case "emailAlertsEnabled":
        message = value
          ? "ইমেইল সতর্কতা সক্ষম করা হয়েছে"
          : "ইমেইল সতর্কতা অক্ষম করা হয়েছে";
        break;
      case "autoApprovalEnabled":
        message = value
          ? "স্বয়ংক্রিয় অনুমোদন সক্ষম করা হয়েছে"
          : "স্বয়ংক্রিয় অনুমোদন অক্ষম করা হয়েছে";
        break;
      case "maintenanceMode":
        message = value
          ? "রক্ষণাবেক্ষণ মোড সক্ষম করা হয়েছে"
          : "রক্ষণাবেক্ষণ মোড অক্ষম করা হয়েছে";
        break;
    }

    Alert.alert("সেটিংস আপডেট", message);
  };

  const SettingItem = ({ icon, title, description, value, onChange }: any) => (
    <View style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={[styles.iconBox, { backgroundColor: "#e6f4fe" }]}>
          <Ionicons name={icon} size={24} color="#0ea5e9" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: "#ccc", true: "#0ea5e9" }}
        thumbColor={value ? "#fff" : "#f3f4f6"}
      />
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
          <Text style={styles.headerTitle}>সিস্টেম সেটিংস</Text>
          <Text style={styles.headerSub}>অ্যাডমিন নিয়ন্ত্রণ</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Notification Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>বিজ্ঞপ্তি</Text>

          <SettingItem
            icon="notifications"
            title="সিস্টেম বিজ্ঞপ্তি"
            description="নতুন অনুরোধ এবং আপডেটের জন্য বিজ্ঞপ্তি পান"
            value={settings.notificationsEnabled}
            onChange={(value: boolean) =>
              handleSettingChange("notificationsEnabled", value)
            }
          />

          <SettingItem
            icon="mail"
            title="ইমেইল সতর্কতা"
            description="গুরুত্বপূর্ণ ঘটনার জন্য ইমেইল সতর্কতা পান"
            value={settings.emailAlertsEnabled}
            onChange={(value: boolean) =>
              handleSettingChange("emailAlertsEnabled", value)
            }
          />
        </View>

        {/* Approval Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>অনুমোদন</Text>

          <SettingItem
            icon="checkmark-circle"
            title="স্বয়ংক্রিয় অনুমোদন"
            description="যাচাইকৃত তথ্য স্বয়ংক্রিয়ভাবে অনুমোদন করুন"
            value={settings.autoApprovalEnabled}
            onChange={(value: boolean) =>
              handleSettingChange("autoApprovalEnabled", value)
            }
          />
        </View>

        {/* System Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>সিস্টেম</Text>

          <SettingItem
            icon="construct"
            title="রক্ষণাবেক্ষণ মোড"
            description="সিস্টেম রক্ষণাবেক্ষণের সময় সক্ষম করুন"
            value={settings.maintenanceMode}
            onChange={(value: boolean) =>
              handleSettingChange("maintenanceMode", value)
            }
          />
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: "#DC2626" }]}>
            বিপজ্জনক অঞ্চল
          </Text>

          <TouchableOpacity
            style={styles.dangerButton}
            onPress={() => {
              Alert.alert(
                "সমস্ত ডেটা রিসেট করুন",
                "এই ক্রিয়াটি সিস্টেমের সমস্ত ডেটা মুছে দেবে। এটি অপরিবর্তনীয়।",
                [
                  {
                    text: "বাতিল",
                    onPress: () => {},
                    style: "cancel",
                  },
                  {
                    text: "রিসেট করুন",
                    onPress: () => {
                      Alert.alert("সফল", "সিস্টেম রিসেট করা হয়েছে");
                    },
                    style: "destructive",
                  },
                ]
              );
            }}
          >
            <Ionicons name="trash" size={20} color="#fff" />
            <Text style={styles.dangerButtonText}>সমস্ত ডেটা রিসেট করুন</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.warningButton}
            onPress={() => {
              Alert.alert(
                "লগ এক্সপোর্ট",
                "সিস্টেম লগ এক্সপোর্ট করা হবে",
                [
                  {
                    text: "বাতিল",
                    onPress: () => {},
                    style: "cancel",
                  },
                  {
                    text: "এক্সপোর্ট",
                    onPress: () => {
                      Alert.alert("সফল", "লগ এক্সপোর্ট করা হয়েছে");
                    },
                  },
                ]
              );
            }}
          >
            <Ionicons name="download" size={20} color="#fff" />
            <Text style={styles.warningButtonText}>সিস্টেম লগ এক্সপোর্ট করুন</Text>
          </TouchableOpacity>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>সম্পর্কে</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>অ্যাপ সংস্করণ</Text>
              <Text style={styles.infoValue}>v1.0.0</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>বিল্ড</Text>
              <Text style={styles.infoValue}>Build 2024.04.22</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>ডাটাবেস</Text>
              <Text style={styles.infoValue}>সংযুক্ত</Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            Alert.alert(
              "লগআউট",
              "সত্যিই লগআউট করতে চান?",
              [
                {
                  text: "বাতিল",
                  onPress: () => {},
                  style: "cancel",
                },
                {
                  text: "লগআউট",
                  onPress: () => {
                    router.replace("/");
                  },
                  style: "destructive",
                },
              ]
            );
          }}
        >
          <Ionicons name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutButtonText}>লগআউট</Text>
        </TouchableOpacity>
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

  content: {
    flex: 1,
    padding: 15,
  },

  section: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  settingItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },

  iconBox: {
    width: 45,
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  settingTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },

  settingDescription: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },

  dangerButton: {
    backgroundColor: "#DC2626",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },

  dangerButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  warningButton: {
    backgroundColor: "#F59E0B",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },

  warningButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },

  infoLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },

  infoValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },

  divider: {
    height: 1,
    backgroundColor: "#e5e7eb",
  },

  logoutButton: {
    backgroundColor: "#ef4444",
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
  },

  logoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
