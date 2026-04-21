import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; 

export default function PatientHomeScreen() {
  const router = useRouter(); 

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>স্বাগতম</Text>
        <Text style={styles.headerSub}>রোগী ব্যবহারকারী</Text>

        <TouchableOpacity
          style={styles.dashboardButton}
          onPress={() => router.push({
            pathname: "/PatientLogin",
            params: { redirectTo: "PatientDashboard" }
          } as any)}
        >
          <Ionicons name="person" size={24} color="#000" />
        </TouchableOpacity>

      </View>

      {/* Body */}
      <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false}>

        <View style={styles.card}>

          <Text style={styles.title}>কোন হাসপাতালে দেখাতে চান?</Text>
          <Text style={styles.subtitle}>
            আপনার পছন্দের হাসপাতাল সিলেক্ট করুন
          </Text>

          {/* Search */}
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              placeholder="হাসপাতাল খুঁজুন..."
              style={styles.input}
            />
          </View>

          {/* Hospital List */}
          {renderHospital("Square Hospital", "Panthapath, Dhaka", "4.8", router)}
          {renderHospital("United Hospital", "Gulshan, Dhaka", "4.7", router)}
          {renderHospital("Evercare Hospital", "Bashundhara, Dhaka", "4.9", router)}
          {renderHospital("Labaid Hospital", "Dhanmondi, Dhaka", "4.6", router)}
          {renderHospital("Popular Hospital", "Shyamoli, Dhaka", "4.5", router)}
          {renderHospital("Ibn Sina Hospital", "Kallyanpur, Dhaka", "4.4", router)}
          {renderHospital("Islami Bank Hospital", "Dhanmondi, Dhaka", "4.7", router)}

        </View>

      </ScrollView>
    </View>
  );
}

// updated reusable hospital card
const renderHospital = (
  name: string,
  location: string,
  rating: string,
  router: any   
) => (
  <TouchableOpacity
    style={styles.hospitalCard}
    onPress={() =>
      router.push({
        pathname: "/DoctorSearch", 
        params: { hospitalName: name },
      })
    }
  >
    <View style={styles.iconBox}>
      <Ionicons name="business" size={24} color="#fff" />
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.hospitalName}>{name}</Text>
      <Text style={styles.location}>📍 {location}</Text>
      <Text style={styles.rating}>⭐ {rating}</Text>
    </View>
  </TouchableOpacity>
);

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

  dashboardButton: {
    position: "absolute",
    right: 15,
    top: 60,   
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
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
  },

  card: {
    height: "auto",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 40,
    elevation: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    backgroundColor: "#f17d2a",
    // color: "#fff",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },

  subtitle: {
    color: "#555",
    marginBottom: 10,
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    borderColor: "#f1d5f9",
    borderWidth: 1,
    elevation: 2,
  },

  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
  },

  hospitalCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dcb893",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#efdecd",
    // elevation: 5,
  },

  iconBox: {
    width: 50,
    height: 50,
    backgroundColor: "#10B981",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
    elevation: 5,
  },

  hospitalName: {
    fontSize: 16,
    fontWeight: "bold",
  },

  location: {
    color: "#555",
    fontSize: 14,
  },

  rating: {
    color: "#ff033e",
    fontSize: 14,
  },
});