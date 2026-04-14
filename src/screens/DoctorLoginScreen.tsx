import React from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DoctorLoginScreen({ navigation }: any) {
  const router = useRouter();
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
        >
        <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>ডাক্তার লগইন</Text>
        <Text style={styles.subTitle}>আপনার অ্যাকাউন্টে প্রবেশ করুন</Text>
      </View>

      <View style={styles.card}>

        {/* Email */}
        <Text style={styles.label}>ইমেইল অথবা ফোন</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#888" />
          <TextInput placeholder="your@email.com বা +880..." style={styles.input} />
        </View>

        {/* Password */}
        <Text style={styles.label}>পাসওয়ার্ড</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" />
          <TextInput placeholder="********" secureTextEntry style={styles.input} />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}  onPress={() => router.push("/DoctorDashboard")}>
          <Text style={styles.buttonText}>লগইন করুন</Text>
        </TouchableOpacity>

        {/* Warning */}
        <View style={styles.warningBox}>
            <Text style={styles.warningText}>
             ⚠️ শুধুমাত্র অ্যাডমিন অনুমোদিত ডাক্তাররা লগইন করতে পারবেন
            </Text>
        </View>

        {/* Signup */}
        <TouchableOpacity onPress={() => navigation.navigate("DoctorRegister")}>
          <Text style={styles.link}>নতুন অ্যাকাউন্ট তৈরি করুন</Text>
        </TouchableOpacity>

      </View>
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
    backgroundColor: "#0ea5e9",
    paddingTop: 60,      
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  backButton: {
    position: "absolute",
    left: 15,
    top: 60,   
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 20,
},

  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },

  subTitle: {
    color: "#e0fdf4",
    fontSize: 14,
    marginTop: 5,
  },

  card: {
    width: "85%",
    height: "60%",
    backgroundColor: "#fff",
    borderRadius: 20,
    marginTop: 20,
    padding: 20,
    alignSelf: "center",  
    elevation: 5,
  },
  
  label: {
    marginTop: 10,
    marginBottom: 5,
    // fontWeight: "bold",
    color: "#333",
    fontWeight: "500",
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    borderColor: "#f1d5f9",
    borderWidth: 1,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },

  button: {
    marginTop: 30,
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 25,
    elevation: 3,
  },

  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },

  warningBox: {
    marginTop: 15,
    backgroundColor: "#FEF3C7",   
    borderColor: "#F59E0B",       
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    },

    warningText: {
      color: "#92400E",  
      fontSize: 13,
      textAlign: "center",
    },
  link: {
    marginTop: 30,
    textAlign: "center",
    color: "blue",
    textDecorationLine: "underline",
    textDecorationColor: "#1D4ED8",
  },
});