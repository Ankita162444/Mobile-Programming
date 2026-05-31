import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  // HEADER
  header: {
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  appName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#111827",
  },

  greeting: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 6,
    color: "#111827",
  },

  subtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 6,
    lineHeight: 18,
  },

  // SEARCH BOX
  searchBox: {
    marginTop: 16,
    marginHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  searchInput: {
    fontSize: 14,
    color: "#111827",
  },

  // SECTION TITLE
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginTop: 22,
    marginLeft: 16,
    color: "#111827",
  },

  // GRID
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 12,
  },

  card: {
    width: "47%",
    paddingVertical: 24,
    marginBottom: 15,
    borderRadius: 18,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  icon: {
    fontSize: 30,
    marginBottom: 8,
  },

  cardText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },

  // INFO BOX
  infoBox: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: "#E8F1FF",
    padding: 16,
    borderRadius: 16,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#1F2937",
  },

  infoText: {
    fontSize: 13,
    color: "#4B5563",
    lineHeight: 18,
  },
});