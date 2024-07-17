import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';


const SettingsScreen = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-down" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.grayBox}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <Text style={styles.optionText}>Change Password</Text>
            <Icon name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("BlockedUsers")}
          >
            <Text style={styles.optionText}>Blocked Users</Text>
            <Icon name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("DeleteAccount")}
          >
            <Text style={styles.optionText}>Delete Account</Text>
            <Icon name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.grayBox}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("InviteFriends")}
          >
            <Text style={styles.optionText}>Invite Your Friends</Text>
            <Icon name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("About")}
          >
            <Text style={styles.optionText}>About & Privacy Policy</Text>
            <Icon name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => navigation.navigate("PerformanceDashboard")}
          >
            <Text style={styles.optionText}>Access Performance Dashboard</Text>
            <Icon name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={styles.copyright}>© connections 2024</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: "15%",
    padding: 10
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    width: "80%",
    bottom: "5%",
  },
  signOutButton: {
    marginTop: 40,
    padding: 20,
    alignSelf: "center",
    backgroundColor: "black",
    borderRadius: 20,
    width: "40%",
  },
  signOutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  grayBox: {
    backgroundColor: "transparent",
    borderRadius: 20,
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomColor: 'gray',
    borderBottomWidth: .2,
  },
  optionText: {
    fontSize: 17,
    color: "black",
  },
  footer: {
    position: "absolute",
    bottom: "10%",
    alignItems: "center",
    width: "100%",
  },
  copyright: {
    fontSize: 12,
    color: "gray",
    fontWeight: "bold"
  },
});
