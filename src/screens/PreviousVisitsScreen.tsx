import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function PreviousVisitsScreen() {
  const router = useRouter();

  // Mock previous visits data
  const [visits] = useState([
    {
      id: 1,
      date: "2023-10-01",
      doctor: "ডা. আহমেদ রহমান",
      hospital: "Square Hospital",
      spec: "কার্ডিওলজিস্ট",
      diagnosis: "জ্বর",
      prescription: "প্যারাসিটামল ৫০০ মিগ্রা - দিনে ৩ বার",
      notes: "হার্টের রুটিন চেকআপ করা হয়েছে",
      patientName: "রহিম আহমেদ",
      age: 35,
      bloodGroup: "O+",
    },
    {
      id: 2,
      date: "2023-09-15",
      doctor: "ডা. ফাতেমা খান",
      hospital: "United Hospital",
      spec: "নিউরোলজিস্ট",
      diagnosis: "সর্দি",
      prescription: "অ্যান্টিবায়োটিক - দিনে ২ বার",
      notes: "নিউরোলজিক্যাল পরীক্ষা সাধারণ ছিল",
      patientName: "রহিম আহমেদ",
      age: 35,
      bloodGroup: "O+",
    },
    {
      id: 3,
      date: "2023-08-20",
      doctor: "ডা. করিম উদ্দিন",
      hospital: "Apollo Hospital",
      spec: "জেনারেল ফিজিশিয়ান",
      diagnosis: "ডায়াবেটিস চেকআপ",
      prescription: "মেটফরমিন ৫০০ মিগ্রা - দিনে ২ বার",
      notes: "ব্লাড সুগার নরমাল পরিসীমায়",
      patientName: "রহিম আহমেদ",
      age: 35,
      bloodGroup: "O+",
    },
  ]);

  const renderVisitCard = ({ item }: any) => (
    <View style={styles.visitCard}>
      {/* Header */}
      <View style={styles.visitHeader}>
        <View style={styles.dateBox}>
          <Ionicons name="calendar" size={16} color="#0ea5e9" />
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={styles.specBadge}>
          <Text style={styles.specText}>{item.spec}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Patient Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>রোগীর তথ্য</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>নাম:</Text>
          <Text style={styles.value}>{item.patientName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>বয়স:</Text>
          <Text style={styles.value}>{item.age}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>রক্তের গ্রুপ:</Text>
          <Text style={styles.value}>{item.bloodGroup}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Doctor Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ডাক্তারের তথ্য</Text>
        <View style={styles.infoRow}>
          <Ionicons name="person-circle" size={20} color="#0ea5e9" />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.doctorName}>{item.doctor}</Text>
            <Text style={styles.specialty}>{item.spec}</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="business" size={20} color="#0ea5e9" />
          <Text style={styles.value}>{item.hospital}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Diagnosis */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>রোগের নাম (ডায়াগনোসিস)</Text>
        <View style={styles.diagnosisBox}>
          <Text style={styles.diagnosisText}>{item.diagnosis}</Text>
        </View>
      </View>

      {/* Prescription */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ঔষধের বর্ণনা</Text>
        <View style={styles.prescriptionBox}>
          <Text style={styles.prescriptionText}>{item.prescription}</Text>
        </View>
      </View>

      {/* Notes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ডাক্তারের মন্তব্য</Text>
        <View style={styles.notesBox}>
          <Text style={styles.notesText}>{item.notes}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Download Button */}
      <TouchableOpacity style={styles.downloadBtn}>
        <Ionicons name="download-outline" size={20} color="#fff" />
        <Text style={styles.downloadBtnText}>রিপোর্ট ডাউনলোড করুন</Text>
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
          <Text style={styles.headerTitle}>আগের ভিজিট</Text>
          <Text style={styles.headerSub}>মোট ভিজিট: {visits.length}</Text>
        </View>
      </View>

      <FlatList
        data={visits}
        renderItem={renderVisitCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
    gap: 15,
  },

  backButton: {
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
    marginTop: 2,
  },

  listContainer: {
    padding: 15,
    paddingBottom: 30,
  },

  visitCard: {
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

  visitHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#f0f9ff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  dateText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0ea5e9",
  },

  specBadge: {
    backgroundColor: "#10B981",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },

  specText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
  },

  divider: {
    height: 1,
    backgroundColor: "#10B981",
    marginVertical: 12,
  },

  section: {
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
    flex: 1,
  },

  value: {
    fontSize: 13,
    color: "#333",
    flex: 1,
  },

  doctorName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },

  specialty: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  diagnosisBox: {
    backgroundColor: "#fee2e2",
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626",
  },

  diagnosisText: {
    fontSize: 13,
    color: "#991b1b",
    fontWeight: "500",
  },

  prescriptionBox: {
    backgroundColor: "#f0fdf4",
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: "#16a34a",
  },

  prescriptionText: {
    fontSize: 13,
    color: "#166534",
    lineHeight: 18,
  },

  notesBox: {
    backgroundColor: "#fef3c7",
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },

  notesText: {
    fontSize: 13,
    color: "#92400e",
    lineHeight: 18,
  },

  downloadBtn: {
    flexDirection: "row",
    backgroundColor: "#10B981",
    padding: 12,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },

  downloadBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
