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
import { useRouter, useLocalSearchParams } from "expo-router";

export default function DoctorSearchScreen() {
  const router = useRouter();
  const { hospitalName } = useLocalSearchParams();

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

          <Text style={styles.hospital}>
            {hospitalName || "Hospital"}
          </Text>
          <Text style={styles.sub}>বিভাগ নির্বাচন করুন</Text>
        </View>

      <ScrollView contentContainerStyle={{ padding: 15 }}>

        {/* Search */}
        <View style={styles.searchBoxFull}>
            <Text style={styles.title}>ডাক্তারের নাম দিয়ে খুঁজুন</Text>

            <View style={styles.searchBox}>
             <Ionicons name="search" size={20} color="#999" />
             <TextInput
             placeholder="ডাক্তারের নাম লিখুন..."
             style={styles.input}
             />
            </View>
        </View>

        <Text style={styles.or}>-------------------- অথবা --------------------</Text>

        {/* বিভাগ */}
        <Text style={styles.title}>বিশেষজ্ঞ বিভাগ সিলেক্ট করুন</Text>

        <View style={styles.grid}>
          {renderItem("❤️", "Cardiology", router, hospitalName)}
          {renderItem("💊", "Medicine", router, hospitalName)}
          {renderItem("👩‍⚕️", "Gynecology", router, hospitalName)}
          {renderItem("🦴", "Orthopedics", router, hospitalName)}
          {renderItem("✨", "Dermatology", router, hospitalName)}
          {renderItem("🏥", "Gastroenterology", router, hospitalName)}
          {renderItem("👶", "Pediatrics", router, hospitalName)}
          {renderItem("🧠", "Neurology", router, hospitalName)}
        </View>

      </ScrollView>
    </View>
  );
}

// reusable department card
const renderItem = (icon: string, title: string, router: any, hospitalName: any) => (
  <TouchableOpacity
    style={styles.item}
    onPress={() =>
      router.push({
        pathname: "/DoctorList",
        params: {
          speciality: title,
          hospitalName: hospitalName,
        },
      })
    }
  >
    <Text style={styles.icon}>{icon}</Text>
    <Text style={styles.itemText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9cfbed",
  },

  backButton: {
    position: "absolute",
    left: 15,
    top: 60,   
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 20,
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


  hospital: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },

  sub: {
    color: "#fff",
    marginTop: 3,
    fontSize: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    backgroundColor: "#f17d2a",
    padding: 10,
    borderRadius: 10,
    textAlign: "center",
  },

  searchBoxFull: {
    backgroundColor: "#f1f5f9",
    padding: 15,
    marginBottom: 15,
    borderRadius: 20,
    elevation: 5,
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#efdecd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    borderColor: "#f1d5f9",
    borderWidth: 1,
    elevation: 2,
  },

  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 10,
    elevation: 3, 
  },

  or: {
    textAlign: "center",
    marginVertical: 10,
    color: "#555",
    fontSize: 16,
    marginBottom: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    borderRadius: 20,

  },

  item: {
    width: "47%",
    backgroundColor: "#efdecd",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
    elevation: 3,
  },

  icon: {
    fontSize: 30,
    // elevation: 10,
  },

  itemText: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 12,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
    padding: 10,
    textAlign: "center",
    elevation: 5,
  },
});