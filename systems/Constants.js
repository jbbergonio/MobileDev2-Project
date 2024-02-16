import { Dimensions } from "react-native";

// Define categories and masks
const CATEGORY_OF_THE_CIRCLE = 0x0001;
const MASK_OF_THE_CIRCLE = 0x0002;
const CATEGORY_OF_BOUNDARY = 0x0004;

const Constants = {
  SCREEN_WIDTH: Dimensions.get("screen").width,
  SCREEN_HEIGHT: Dimensions.get("screen").height,
  WINDOW_WIDTH: Dimensions.get("window").width,
  WINDOW_HEIGHT: Dimensions.get("window").height,
};

export default Constants;
