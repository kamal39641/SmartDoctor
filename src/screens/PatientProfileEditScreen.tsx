import React, { useState } from "react";
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

export default function PatientProfileEditScreen() {
  const router = useRouter();

  // Mock patient data
  const [name, setName] = useState("রহিম আহমেদ");
  const [age, setAge] = useState("35");
  const [phone, setPhone] = useState("01712345678");
  const [email, setEmail] = useState("rahim@email.com");
  const [address, setAddress] = useState("ঢাকা, বাংলাদেশ");
  const [bloodGroup, setBloodGroup] = useState("O+");
  const [image, setImage] = useState<string | null>(null);

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

  const handleSaveProfile = () => {
    // TODO: Save patient data to context/database
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>প্রোফাইল সম্পাদনা</Text>
      </View>

      <ScrollView style={{ padding: 15, marginBottom: 15 }} showsVerticalScrollIndicator={false}>
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

          <Text style={{ marginBottom: 10, textAlign: "center" }}>
            ছবি পরিবর্তন করতে ট্যাপ করুন
          </Text>

          {/* Name */}
          <Text style={styles.label}>নাম:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="আপনার নাম"
          />

          {/* Age */}
          <Text style={styles.label}>বয়স:</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="বয়স"
            keyboardType="numeric"
          />

          {/* Phone */}
          <Text style={styles.label}>ফোন নম্বর:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            placeholder="ফোন নম্বর"
            keyboardType="phone-pad"
          />

          {/* Email */}
          <Text style={styles.label}>ইমেইল:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="ইমেইল"
            keyboardType="email-address"
          />

          {/* Address */}
          <Text style={styles.label}>ঠিকানা:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="ঠিকানা"
          />

          {/* Blood Group */}
          <Text style={styles.label}>রক্তের গ্রুপ:</Text>
          <TextInput
            style={styles.input}
            value={bloodGroup}
            onChangeText={setBloodGroup}
            placeholder="রক্তের গ্রুপ"
          />

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
              পরিবর্তন সংরক্ষণ করুন
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
    backgroundColor: "#10B981",
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
    marginBottom: 20,
    elevation: 3,
  },

  imageBox: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
    elevation: 5,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 5,
    textAlign: "left",
    alignSelf: "flex-start",
    paddingLeft: 4,
  },

  input: {
    borderWidth: 2,
    borderColor: "#10B981",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 14,
    width: "100%",
    backgroundColor: "#b5dfa3",
    elevation: 3,
  },

  saveBtn: {
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
});
