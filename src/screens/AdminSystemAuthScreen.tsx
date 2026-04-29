import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { AdminContext } from "../context/AdminContext";

export default function AdminSystemAuthScreen({ navigation }: any) {
  const router = useRouter();
  const { registerAdmin, loginAdmin, demoLogin } = useContext(AdminContext);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const onRegister = () => {
    if (!name || !email || !password || !secretKey) return Alert.alert("ত্রুটি", "সকল ফিল্ড পূরণ করুন");
    const res: any = registerAdmin("system", name, email, password, secretKey);
    if (!res.success) return Alert.alert("রেজিস্ট্রেশন ব্যর্থ", res.message);
    Alert.alert("সফল", "সিস্টেম অ্যাডমিন রেজিস্ট্রেশন সফল");
    navigation.replace("AdminControllerHome");
  };

  const onLogin = () => {
    // demo behavior: if no credentials entered, allow demo login
    if (!email || !password) {
      const demoRes: any = demoLogin ? demoLogin("system") : null;
      if (demoRes && demoRes.success) {
        Alert.alert("সফল", "ডেমো লগইন হয়েছে");
        navigation.replace("AdminControllerHome");
        return;
      }

      Alert.alert("সফল", "ডেমো লগইন হয়েছে");
      navigation.replace("AdminControllerHome");
      return;
    }

    const res: any = loginAdmin(email, password);
    if (!res.success) return Alert.alert("লগইন ব্যর্থ", res.message);
    Alert.alert("সফল", "লগইন হয়েছে");
    navigation.replace("AdminControllerHome");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>সিস্টেম অ্যাডমিন</Text>
        <Text style={styles.subTitle}>{mode === "login" ? "লগইন করুন" : "রেজিস্টার করুন"}</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.toggleRow}>
          <TouchableOpacity onPress={() => setMode("login")} style={[styles.toggleBtn, mode === "login" && styles.toggleActive]}>
            <Text style={mode === "login" ? styles.toggleTextActive : styles.toggleText}>লগইন</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setMode("register")} style={[styles.toggleBtn, mode === "register" && styles.toggleActive]}>
            <Text style={mode === "register" ? styles.toggleTextActive : styles.toggleText}>রেজিস্টার</Text>
          </TouchableOpacity>
        </View>

        {mode === "register" && (
          <>
            <Text style={styles.label}>পুরা নাম</Text>
            <View style={styles.inputBox}>
              <Ionicons name="person" size={20} color="#888" />
              <TextInput value={name} onChangeText={setName} placeholder="নাম" style={styles.input} />
            </View>
          </>
        )}

        <Text style={styles.label}>ইমেইল</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#888" />
          <TextInput value={email} onChangeText={setEmail} placeholder="admin@system.com" style={styles.input} />
        </View>

        <Text style={styles.label}>পাসওয়ার্ড</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#888" />
          <TextInput value={password} onChangeText={setPassword} placeholder="********" secureTextEntry style={styles.input} />
        </View>

        {mode === "register" && (
          <>
            <Text style={styles.label}>System Admin Secret</Text>
            <View style={styles.inputBox}>
              <Ionicons name="key" size={20} color="#888" />
              <TextInput value={secretKey} onChangeText={setSecretKey} placeholder="System secret" style={styles.input} secureTextEntry />
            </View>
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={mode === "login" ? onLogin : onRegister}>
          <Text style={styles.buttonText}>{mode === "login" ? "লগইন" : "রেজিস্টার"}</Text>
        </TouchableOpacity>

        <View style={styles.hintBox}>
          <Text style={styles.hintText}>এই ফর্ম শুধুমাত্র সিস্টেম-অ্যাডমিনদের জন্য। রেজিস্ট্রেশনের জন্য প্রয়োজন সঠিক Secret key।</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#9cfbed" },
  header: { width: "100%", backgroundColor: "#0ea5e9", paddingTop: 60, paddingBottom: 20, alignItems: "center", justifyContent: "center" },
  backButton: { position: "absolute", left: 15, top: 60 },
  title: { color: "#fff", fontSize: 25, fontWeight: "bold" },
  subTitle: { color: "#fff", fontSize: 14, marginTop: 5 },
  card: { width: "90%", backgroundColor: "#fff", borderRadius: 16, padding: 18, marginTop: 20, alignSelf: "center" },
  toggleRow: { flexDirection: "row", marginBottom: 12 },
  toggleBtn: { flex: 1, padding: 10, alignItems: "center", borderRadius: 8, backgroundColor: "#f3f4f6", marginHorizontal: 4 },
  toggleActive: { backgroundColor: "#0ea5e9" },
  toggleText: { color: "#333", fontWeight: "600" },
  toggleTextActive: { color: "#fff", fontWeight: "700" },
  label: { marginTop: 8, marginBottom: 6, color: "#333", fontWeight: "500" },
  inputBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#f1f5f9", borderRadius: 10, padding: 10, borderWidth: 1, borderColor: "#f1d5f9" },
  input: { marginLeft: 10, flex: 1 },
  button: { marginTop: 18, backgroundColor: "#0ea5e9", padding: 14, borderRadius: 12 },
  buttonText: { color: "#fff", fontSize: 16, textAlign: "center", fontWeight: "700" },
  hintBox: { marginTop: 12, backgroundColor: "#FEF3C7", padding: 10, borderRadius: 8 },
  hintText: { color: "#92400E", fontSize: 13, textAlign: "center" },
});
