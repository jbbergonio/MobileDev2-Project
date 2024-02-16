import { View } from "react-native";
import Matter from "matter-js";
import React, { useState } from "react";
import {
  CATEGORY_OF_THE_CIRCLE,
  MASK_OF_THE_CIRCLE,
  CATEGORY_OF_BOUNDARY,
} from "../systems/Constants";

const Circle = (props) => {
  //const [isVisible, setElementVisible] = useState(true);

  //   const width = props.body.bounds.max.x - props.body.bounds.min.x;
  //   const height = props.body.bounds.max.y - props.body.bounds.min.y;
  const radius = props.body.circleRadius;

  const xPos = props.body.position.x - radius;
  const yPos = props.body.position.y - radius;

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        left: xPos,
        top: yPos,
        backgroundColor: props.color,
        position: "absolute",
        borderRadius: radius,
        //display: isVisible,
      }}
    ></View>
  );
};

export default (world, color, pos, radius) => {
  const theCircle = Matter.Bodies.circle(pos.x, pos.y, radius, {
    label: "Circle",

    frictionAir: 0,
    friction: 0,
  });
  Matter.World.add(world, theCircle);
  return { body: theCircle, color, pos, renderer: <Circle /> };
};
