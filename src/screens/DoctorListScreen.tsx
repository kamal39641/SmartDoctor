import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function DoctorListScreen() {
  const router = useRouter();
  const { speciality, hospitalName } = useLocalSearchParams();

  const doctors = [
    { id: 1, name: "Dr. Rahman", degree: "MBBS, MD", rating: 4.8, active: true },
    { id: 2, name: "Dr. Sultana", degree: "MBBS, FCPS", rating: 4.6, active: true },
    { id: 3, name: "Dr. Karim", degree: "MBBS, MD", rating: 4.7, active: false },
    { id: 4, name: "Dr. Rahman", degree: "MBBS, MD", rating: 4.8, active: true },
    { id: 5, name: "Dr. Sultana", degree: "MBBS, FCPS", rating: 4.6, active: true },
    { id: 6, name: "Dr. Karim", degree: "MBBS, MD", rating: 4.7, active: false },
    { id: 7, name: "Dr. Sultana", degree: "MBBS, FCPS", rating: 4.6, active: true },
    { id: 8, name: "Dr. Karim", degree: "MBBS, MD", rating: 4.7, active: false },
  ];

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View>
          <Text style={styles.title}>{speciality} Doctors</Text>
          <Text style={styles.sub}>{hospitalName}</Text>
        </View>
      </View>

      <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false}>
        <View style={styles.infoBox}>
        {doctors.map((doc) => (
          <TouchableOpacity
            key={doc.id}
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/DoctorDetails",
                params: { doctorName: doc.name },
              })
            }
          >
            <View style={styles.avatar}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {doc.name[3]}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{doc.name}</Text>
              <Text>{doc.degree}</Text>
              <Text style={{ color: "#666" }}>{speciality}</Text>
              <Text>⭐ {doc.rating} (55 reviews)</Text>
            </View>

            <Text
              style={[
                styles.status,
                { backgroundColor: doc.active ? "#10B981" : "#EF4444" },
              ]}
            >
              {doc.active ? "Active" : "Inactive"}
            </Text>
          </TouchableOpacity>
        ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#9cfbed" 
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

  sub: {
    color: "#e0fdf4",
    fontSize: 14,
    marginTop: 5,
  },

    infoBox: {
    backgroundColor: "#efdecd",
    padding: 15,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 30,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },

  avatar: {
    width: 50,
    height: 50,
    backgroundColor: "#0ea5e9",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    elevation: 3,
  },

  name: { 
    fontWeight: "bold",
    fontSize: 16, 
},

  status: {
    color: "#fff",
    padding: 5,
    borderRadius: 10,
    elevation: 5,
  },
});