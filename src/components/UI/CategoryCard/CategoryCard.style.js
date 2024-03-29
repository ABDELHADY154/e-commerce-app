import { scale } from "react-native-size-matters";

export const _shadowStyle = shadowColor => ({
  shadowColor,
  shadowRadius: 5,
  shadowOpacity: 0.2,
  shadowOffset: {
    width: 0,
    height: 5,
  },
});

export const _container = (height, width, borderRadius, backgroundColor) => ({
  height,
  width,
  borderRadius,
  backgroundColor,
  flexDirection: "row",
  alignItems: "center",
});

export default {
  gradient: {
    height: scale(80),
    width: scale(80),
    opacity: 0.5,
    marginLeft: 16,
    marginRight: 20,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: "90%",
    height: "90%",
    borderRadius: 200,
  },
  textContainer: {
    height: 50,
    justifyContent: "space-around",
  },
  countContainerStyle: {
    marginLeft: "auto",
  },
  rightButtonContainer: {
    marginLeft: 22,
    marginRight: 16,
  },
  buttonImageStyle: {
    width: 16,
    height: 16,
  },
};
