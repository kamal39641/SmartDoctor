import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function PatientRegisterScreen({ navigation }: any) {
  const router = useRouter();
  const { from } = useLocalSearchParams();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        {/* 🔙 Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>রোগী রেজিস্ট্রেশন</Text>
      </View>

      <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false}>

        <View style={styles.card}>

          <Text style={styles.label}>নাম *</Text>
          <TextInput style={styles.input} placeholder="আপনার নাম" />

          <Text style={styles.label}>ঠিকানা</Text>
          <TextInput style={styles.input} placeholder="আপনার ঠিকানা" />

          <Text style={styles.label}>ইমেইল অথবা ফোন *</Text>
          <TextInput
            style={styles.input}
            placeholder="your@email.com বা +880..."
          />

          <Text style={styles.label}>পাসওয়ার্ড</Text>
          <TextInput style={styles.input} placeholder="********" secureTextEntry />

          <Text style={styles.label}>পাসওয়ার্ড নিশ্চিত করুন</Text>
          <TextInput style={styles.input} placeholder="********" secureTextEntry />

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={() => {
            if (from === "doctorDetails") {
              router.replace({
                pathname: "/DoctorDetails",
                params: { openForm: "true" },
              });
            } else {
              router.replace("/PatientHome");
            }
          }}
          >
            <Text style={styles.buttonText}>রেজিস্টার করুন</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity onPress={() => router.push("/")}>
            <Text style={styles.link}>
              ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9cfbed",
  },

  header: {
    width: "100%",        
    backgroundColor: "#10B981",
    paddingTop: 60,      
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  backButton: {
     position: "absolute",
    left: 20,
    top: 50,   
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 20,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -7,
    marginBottom: 25,
    color: "#fff",
  },

  card: {
    height: "auto",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 40,
    elevation: 5,
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
    fontWeight: "500",
  },

  input: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
    marginBottom: 10,
    borderColor: "#f1d5f9",
    borderWidth: 1,
    elevation: 2,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#10B981",
    padding: 12,
    elevation: 3,
    borderRadius: 25,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#10B981",
    textDecorationLine: "underline",
    textDecorationColor: "#10B981",
  },
});