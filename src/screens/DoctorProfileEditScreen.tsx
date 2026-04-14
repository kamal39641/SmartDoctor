import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { DoctorContext } from "../context/DoctorContext";


export default function DoctorProfileEditScreen() {
  const router = useRouter();
  
  const { doctor, setDoctor } = useContext(DoctorContext);

  const [name, setName] = useState(doctor.name);
  const [spec, setSpec] = useState(doctor.spec);
  const [medical, setMedical] = useState(doctor.medical);
  const [bmdc, setBmdc] = useState(doctor.bmdc);
  const [image, setImage] = useState(doctor.image);

  // image picker
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Profile Edit</Text>
      </View>

      <ScrollView style={{ padding: 15 }} showsVerticalScrollIndicator={false}>

      {/* Body */}
      <View style={styles.body}>

        {/* Profile Image */}
        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Ionicons name="person" size={50} color="#fff" />
          )}
        </TouchableOpacity>

        <Text style={{ marginBottom: 10 }}>Tap to change photo</Text>

        {/* Name */}
        <Text style={styles.label}>Doctor Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Doctor Name"
        />

        {/* Specialization */}
        <Text style={styles.label}>Specialization:</Text>
        <TextInput
          style={styles.input}
          value={spec}
          onChangeText={setSpec}
          placeholder="Specialization"
        />

          {/* Medical College */}
        <Text style={styles.label}>Medical College:</Text>
        <TextInput
          style={styles.input}
          value={medical}
          onChangeText={setMedical}
          placeholder="Medical College"
        />

        {/* BMDC */}
        <Text style={styles.label}>BMDC Number:</Text>
        <TextInput
          style={styles.input}
          value={bmdc}
          onChangeText={setBmdc}
          placeholder="BMDC Number"
        />

        {/* Save Button */}
        <TouchableOpacity
          style={styles.saveBtn}
          onPress={() => {setDoctor({name, spec, medical, bmdc, image,});
          router.back();
      }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
            Save Changes
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
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#0ea5e9",
    padding: 20,
    paddingTop: 60,
  },

  title: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },

  body: {
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  imageBox: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 5,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    color: "#1D4ED8",
    marginTop: 15,
    fontSize: 15,
  },

  input: {
    width: "100%",
    backgroundColor: "#efdecd",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    elevation: 3,
    fontSize: 16,
    borderColor: "#f1d5f9",
    borderWidth: 1,
  },

  saveBtn: {
    marginTop: 20,
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    elevation: 3,
  },
});