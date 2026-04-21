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
import { useRouter } from "expo-router";

export default function DoctorRegisterScreen({ navigation }: any) {
    const router = useRouter();
  return (
    <View style={styles.container}>

      <View style={styles.header}>

      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>ডাক্তার রেজিস্ট্রেশন</Text>

    </View>

      <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false}>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>🛡️ ভেরিফিকেশন প্রয়োজন</Text>
          <Text style={styles.infoText}>
            আপনার BMDC রেজিস্ট্রেশন নম্বর অ্যাডমিন যাচাই করার পরই
            আপনি লগইন করতে পারবেন।
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>

          <Text style={styles.label}>পূর্ণ নাম *</Text>
          <TextInput style={styles.input} placeholder="ডা. আপনার পূর্ণ নাম" />

          <Text style={styles.label}>BMDC রেজিস্ট্রেশন নম্বর *</Text>
          <TextInput
            style={styles.inputHighlight}
            placeholder="A-12345 (BMDC Reg. No.)"
          />

          <Text style={styles.label}>বিশেষজ্ঞতা</Text>
          <TextInput
            style={styles.input}
            placeholder="যেমন: কার্ডিওলজিস্ট"
          />

          <Text style={styles.label}>প্রফেশনাল ইমেইল অথবা ফোন *</Text>
          
          <TextInput
            style={styles.input}
            placeholder="doctor@hospital.com বা +880..."
          />

          <Text style={styles.label}>পাসওয়ার্ড</Text>
          <TextInput style={styles.input} placeholder="********" secureTextEntry />

          <Text style={styles.label}>পাসওয়ার্ড নিশ্চিত করুন</Text>
          <TextInput style={styles.input} placeholder="********" secureTextEntry />

          {/* Button */}
          <TouchableOpacity style={styles.button} onPress={() => router.push("/DoctorDashboard")}>
            <Text style={styles.buttonText}>
              রেজিস্টার করুন 
            </Text>
            <Text style={styles.buttonText}>
              (ভেরিফিকেশন সাপেক্ষে)
            </Text>
          </TouchableOpacity>

          {/* Login link */}
          <TouchableOpacity onPress={() => navigation.navigate("DoctorLogin")}>
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
    // paddingTop: 60,
    // paddingHorizontal: 15,
  },

  header: {
    width: "100%",        
    backgroundColor: "#0ea5e9",
    paddingTop: 60,      
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    // marginBottom: 20,
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

  infoBox: {
    backgroundColor: "#E0ECFF",
    borderColor: "#F59E0B",
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  infoTitle: {
    fontWeight: "bold",
    color: "#1D4ED8",
    fontSize: 16,
  },

  infoText: {
    color: "#1D4ED8",
    marginTop: 5,
    fontSize: 14,
    paddingLeft: 25,
    textAlign: "justify",
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

  inputHighlight: {
    backgroundColor: "#E0ECFF",
    borderRadius: 10,
    padding: 15,
    marginTop: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#3B82F6",
    elevation: 3,
  },

  button: {
    marginTop: 20,
    backgroundColor: "#3B82F6",
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
    color: "#1D4ED8",
    textDecorationLine: "underline",
    textDecorationColor: "#1D4ED8",
  },
});