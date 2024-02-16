// WelcomeScreen.js

import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const WelcomeScreen = ({ onStartGame }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Harvest Havoc</Text>
      <TouchableOpacity onPress={onStartGame} style={styles.startButton}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  startButton: {
    padding: 10,
    backgroundColor: "green",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default WelcomeScreen;
