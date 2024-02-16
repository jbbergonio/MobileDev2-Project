import Matter, { Sleeping } from "matter-js";
import Boundary from "../components/Boundary";
import Constants from "../systems/Constants";

const Physics = (entities, { touches, dispatch, events, time }) => {
  const generateRandomColor = () => {
    let color = "#";
    for (let i = 0; i < 6; i++) {
      const random = Math.random();
      const bit = (random * 16) | 0;
      color += bit.toString(16);
    }
    return color;
  };

  let engine = entities.physics.engine;

  /*************TOUCH CONTROLS WITH ARROW KEY ****************/
  if (events.length) {
    for (let i = 0; i < events.length; i++) {
      if (events[i].type === "move-left") {
        Matter.Body.setVelocity(entities.TheBasket.body, { x: -3, y: 0 });
      }
      if (events[i].type === "move-right") {
        Matter.Body.setVelocity(entities.TheBasket.body, { x: 3, y: 0 });
      }
    }
  }

  //Falling Circle
  const fallingCircle = entities.TheCircle;
  if (fallingCircle.body.position.y > Constants.WINDOW_HEIGHT) {
    // Reset the position of the falling circle when it goes out of the screen
    Matter.Body.setPosition(fallingCircle.body, {
      x: Math.random() * Constants.WINDOW_WIDTH,
      y: -20,
    });
    fallingCircle.body.velocity.y = 0; // Reset velocity
  } else {
    // Apply downward velocity to simulate falling
    Matter.Body.setVelocity(fallingCircle.body, { x: 0, y: 3 });
  }

  //Falling Square
  const fallingSquare = entities.TheSquare;
  if (fallingSquare.body.position.y > Constants.WINDOW_HEIGHT) {
    // Reset the position of the falling circle when it goes out of the screen
    Matter.Body.setPosition(fallingSquare.body, {
      x: Math.random() * Constants.WINDOW_WIDTH,
      y: -20,
    });
    fallingSquare.body.velocity.y = 0; // Reset velocity
  } else {
    // Apply downward velocity to simulate falling
    Matter.Body.setVelocity(fallingSquare.body, { x: 0, y: 3 });
  }

  Matter.Events.on(engine, "collisionStart", (event) => {
    var pairs = event.pairs;
    var objALabel = pairs[0].bodyA.label;
    var objBLabel = pairs[0].bodyB.label;

    // Stop Player after hit Boundary
    Sleeping.set(entities.TheBasket.body);

    // Falling Circle hits Player (Basket)
    if (
      (objALabel === "Circle" && objBLabel === "Player") ||
      (objALabel === "Player" && objBLabel === "Circle")
    ) {
      // Reset the position of the falling circle
      Matter.Body.setPosition(fallingCircle.body, {
        x: Math.random() * Constants.WINDOW_WIDTH,
        y: -20,
      });
      fallingCircle.body.velocity.y = 0; // Reset velocity

      // Increase the score
      entities.score.value += 1;
    }

    // Falling Box hits Player (Basket)
    if (
      (objALabel === "Box" && objBLabel === "Player") ||
      (objALabel === "Player" && objBLabel === "Box")
    ) {
      // Reset the position of the falling box
      Matter.Body.setPosition(fallingSquare.body, {
        x: Math.random() * Constants.WINDOW_WIDTH,
        y: -20,
      });
      fallingSquare.body.velocity.y = 0; // Reset velocity

      // Increase the score
      entities.score.value += 1;
    }

    // Falling Circle hits BoundaryCenter
    if (
      (objALabel === "Circle" && objBLabel === "Boundary") ||
      (objALabel === "Boundary" && objBLabel === "Circle")
    ) {
      // Reset the position of the falling circle
      Matter.Body.setPosition(fallingCircle.body, {
        x: Math.random() * Constants.WINDOW_WIDTH,
        y: -20,
      });
      fallingCircle.body.velocity.y = 0; // Reset velocity

      // No score for hitting the BoundaryCenter
    }

    // Falling Box hits BoundaryCenter
    if (
      (objALabel === "Box" && objBLabel === "Boundary") ||
      (objALabel === "Boundary" && objBLabel === "Box")
    ) {
      // Reset the position of the falling circle
      Matter.Body.setPosition(fallingSquare.body, {
        x: Math.random() * Constants.WINDOW_WIDTH,
        y: -20,
      });
      fallingSquare.body.velocity.y = 0; // Reset velocity

      // No score for hitting the BoundaryCenter
    }

    // Continue playing after Player stopped
    Sleeping.set(entities.TheBasket.body, false);
  });

  Matter.Engine.update(engine, time.delta);

  return entities;
};

export default Physics;
