import { Dimensions } from "react-native";
import Boundary from "../components/Boundary";
import Matter from "matter-js";
import Constants from "../systems/Constants";
import Basket from "../components/Basket";
import Circle from "../components/Circle";
import Box from "../components/Box";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default (gameWorld) => {
  let engine = Matter.Engine.create({ enableSleeping: false });
  let world = engine.world;
  engine.gravity.y = 0;

  return {
    physics: { engine, world },
    //Falling Square
    TheSquare: Box(
      world,
      "green",
      { x: 180, y: 120 },
      { width: 40, height: 40 },
      20
      // { isStatic: false, label: "Box" }
    ),

    //Falling Circle
    TheCircle: Circle(world, "yellow", { x: 110, y: 140 }, 15),

    //Player
    TheBasket: Basket(
      world,
      "blue",
      { x: Constants.WINDOW_WIDTH / 2, y: 500 },
      { width: 100, height: 50 },
      { isStatic: false, label: "Player" }
    ),

    //Boundary
    BoundaryTop: Boundary(
      world,
      "blue",
      { x: Constants.WINDOW_WIDTH / 2, y: 0 },
      { height: 30, width: Constants.WINDOW_WIDTH }
    ),

    BoundaryLeft: Boundary(
      world,
      "blue",
      { x: 0, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 30 }
    ),

    BoundaryRight: Boundary(
      world,
      "blue",
      { x: Constants.WINDOW_WIDTH, y: Constants.WINDOW_HEIGHT / 2 },
      { height: Constants.WINDOW_HEIGHT, width: 30 }
    ),

    BoundaryCenter: Boundary(
      world,
      "blue",
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT * 0.7 },
      { height: 20, width: Constants.WINDOW_WIDTH },
      { label: "BoundaryCenter" }
    ),

    BoundaryBottom: Boundary(
      world,
      "blue",
      { x: Constants.WINDOW_WIDTH / 2, y: Constants.WINDOW_HEIGHT },
      { height: 30, width: Constants.WINDOW_WIDTH }
    ),
    // Initialize score property
    score: { value: 0 },
  };
};
