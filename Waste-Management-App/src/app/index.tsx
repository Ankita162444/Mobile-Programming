import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from "react-native";
import styles from "./css";

const FEATURES = [
  ["🚛", "Request Pickup", "#E8F1FF"],
  ["🗑️", "Report Bin Issue", "#FFE8E8"],
  ["📅", "Schedule Pickup", "#E9FFE8"],
  ["♻️", "Recycling Guide", "#FFF6E5"],
  ["📍", "Track Truck", "#F0E8FF"],
  ["📊", "Waste Reports", "#E8FFFA"],
];

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.appName}>Waste Management App</Text>
          <Text style={styles.greeting}>Good Morning 👋</Text>
          <Text style={styles.subtitle}>
            Smart, clean & efficient city service for better living
          </Text>
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search services..."
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        {/* SERVICES */}
        <Text style={styles.sectionTitle}>Services</Text>

        <View style={styles.grid}>
          {FEATURES.map(([icon, title, color], i) => (
            <TouchableOpacity
              key={i}
              activeOpacity={0.85}
              style={[styles.card, { backgroundColor: color }]}
            >
              <Text style={styles.icon}>{icon}</Text>
              <Text style={styles.cardText}>{title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* INFO */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>About System</Text>
          <Text style={styles.infoText}>
            This smart waste management system helps citizens request pickups,
            report issues, track garbage trucks, and access recycling guidance
            for a cleaner environment.
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}