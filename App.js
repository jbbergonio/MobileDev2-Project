import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, StyleSheet, Text, View, Alert } from "react-native";
import { GameEngine } from "react-native-game-engine";
import entities from "./entities";
import React, { useState } from "react";
import Physics from "./systems/Physics.js";
import WelcomeScreen from "./components/WelcomeScreen.js";

export default function App() {
  const [gameEngine, setGameEngine] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  const startGame = () => {
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameEngine(null);
  };

  return (
    <View style={styles.container}>
      {!gameStarted ? (
        <WelcomeScreen onStartGame={startGame} />
      ) : (
        <>
          <GameEngine
            ref={(ref) => {
              setGameEngine(ref);
            }}
            systems={[Physics]}
            entities={entities()}
            style={styles.gameContainer}
          />
          <StatusBar style="auto" hidden={true} />
          {/* The rest of your UI components */}
          <View style={styles.controls}>
            {/* Reset button */}
            <TouchableOpacity onPress={resetGame} style={styles.resetButton}>
              <Text style={styles.centerText}>Reset</Text>
            </TouchableOpacity>

            {/* Existing controls */}
            <View style={styles.controlRow}>
              <TouchableOpacity
                style={styles.buttonLeft}
                onPress={() => {
                  gameEngine.dispatch({ type: "move-left" });
                }}
              >
                <View style={styles.control}>
                  <Text style={styles.centerText}>Left</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonRight}
                onPress={() => {
                  gameEngine.dispatch({ type: "move-right" });
                }}
              >
                <View style={styles.control}>
                  <Text style={styles.centerText}>Right</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  gameContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  controls: {
    flexDirection: "column", // Stack buttons vertically
    justifyContent: "center", // Align buttons to the bottom
    alignItems: "center", // Center buttons horizontally
  },
  controlRow: {
    flexDirection: "row", // Arrange buttons in a row
    marginBottom: 10, // Add some spacing between rows
  },
  buttonContainer: {
    width: 200,
    height: 200,
    borderColor: "blue",
    alignItems: "center",
  },
  buttonUp: {
    backgroundColor: "green",
    width: 100,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120, // Adjust this value as needed or remove it
  },
  buttonLeft: {
    backgroundColor: "green",
    width: 100,
    height: 80,
    marginRight: 10, // Add some spacing between buttons
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDown: {
    backgroundColor: "green",
    width: 100,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRight: {
    backgroundColor: "green",
    width: 100,
    height: 80,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  centerText: {
    color: "white",
    fontSize: 18,
  },
  resetButton: {
    backgroundColor: "red",
    width: 100,
    height: 40,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
