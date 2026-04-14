import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// props type define (TypeScript)
type Props = {
  title: string;
  icon: any;
  color: string;
  onPress?: () => void;
};

export default function RoleCard({ title, icon, color, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, { borderColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <Ionicons name={icon} size={20} color="#fff" />
      </View>

      {/* Text */}
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "85%",
    padding: 18,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",

    // shadow (Android + iOS)
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});