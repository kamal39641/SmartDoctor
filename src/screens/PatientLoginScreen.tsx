import React, { useContext } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";
import { DoctorContext } from "../context/DoctorContext"; 
import { useLocalSearchParams, useRouter } from "expo-router";  

export default function PatientLoginScreen({ navigation }: any) {
  const router = useRouter();
  const { from } = useLocalSearchParams();
  const { setIsPatientLoggedIn } = useContext(DoctorContext);
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
        >
        <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>রোগী লগইন</Text>
        <Text style={styles.subTitle}>আপনার অ্যাকাউন্টে প্রবেশ করুন</Text>
      </View> 
         
      <View style={styles.card}>

        <Text style={styles.label}>ইমেইল অথবা ফোন</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#888" />
          <TextInput placeholder="your@email.com বা +880... " style={styles.input} />
        </View>

        <Text style={styles.label}>পাসওয়ার্ড</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" />
          <TextInput placeholder="********" secureTextEntry style={styles.input} />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
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
          <Text style={styles.buttonText}>লগইন করুন</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() =>
          router.push({
            pathname: "/PatientRegister",
            params: { from }, 
          })
        }>
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
    backgroundColor: "#10B981",
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
    height: "50%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    alignSelf: "center",
    elevation: 5,
  },

  label: {
    marginTop: 10,
    marginBottom: 5,
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
    backgroundColor: "#10B981",
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
  
  link: {
    marginTop: 40,
    textAlign: "center",
    color: "green",
    textDecorationLine: "underline",
    textDecorationColor: "green",
  },
});