import { Dimensions, View, Image } from "react-native";
import Matter from "matter-js";

const Basket = (props) => {
  const width = props.size.width;
  const height = props.size.height;

  const xPos = props.body.position.x - width / 2;
  const yPos = props.body.position.y - height / 2;

  let angle = props.body.angle + "deg";
  return (
    <Image
      source={require("../assets/images/basket.png")} // Replace with the actual path to your basket image
      style={{
        width: props.size.width,
        height: props.size.height,
        left: xPos,
        top: yPos,
        // Remove backgroundColor property
        transform: [{ rotate: angle }],
        position: "absolute",
      }}
    />
  );
};

export default (world, color, pos, size, extraOptions) => {
  const theBasket = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    {
      //use options that you need
      label: extraOptions.label,
      // frictionAir: 0,
      // angularVelocity: 0,
      // restitution: 1,
      mass: 1,
      friction: 3,
      frictionStatic: 3,
      isStatic: extraOptions.isStatic,
      //velocity: { x: 1, y: 1 },
    }
  );
  Matter.World.add(world, theBasket);
  return {
    body: theBasket,
    color,
    pos,
    size,
    extraOptions,
    renderer: <Basket />,
  };
};
