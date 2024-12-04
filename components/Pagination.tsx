// import { View, StyleSheet, Dimensions } from "react-native";
// import React from "react";
// import { NewsDataType } from "@/types";
// import Animated, { 
//   SharedValue, 
//   useAnimatedStyle, 
//   interpolate,
//   Extrapolate,
//   interpolateColor
// } from "react-native-reanimated";
// import { Colors } from "@/constants/Colors";

// type Props = {
//   items: NewsDataType[];
//   scrollX: SharedValue<number>;
// };

// const { width } = Dimensions.get('window');

// const Pagination = ({ items, scrollX }: Props) => {
//   return (
//     <View style={styles.container}>
//       {items.map((_, index) => {
//         const inputRange = [
//           (index - 1) * width,
//           index * width,
//           (index + 1) * width
//         ];

//         const animatedDotStyle = useAnimatedStyle(() => {
//           const dotWidth = interpolate(
//             scrollX.value,
//             inputRange,
//             [8, 16, 8],
//             Extrapolate.CLAMP
//           );

//           const opacity = interpolate(
//             scrollX.value,
//             inputRange,
//             [0.5, 1, 0.5],
//             Extrapolate.CLAMP
//           );

//           const backgroundColor = interpolateColor(
//             scrollX.value,
//             inputRange,
//             [Colors.darkGrey, Colors.tint, Colors.darkGrey]
//           );

//           return { 
//             width: dotWidth,
//             opacity,
//             backgroundColor,
//           };
//         });

//         return (
//           <Animated.View
//             key={index}
//             style={[styles.dot, animatedDotStyle]}
//           />
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     height: 40,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   dot: {
//     height: 8,
//     marginHorizontal: 4,
//     borderRadius: 4,
//   },
// });

// export default Pagination;


import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { NewsDataType } from "@/types";
import Animated, { 
  SharedValue, 
  useAnimatedStyle, 
  interpolate,
  Extrapolate,
  interpolateColor,
  useSharedValue
} from "react-native-reanimated";
import { Colors } from "@/constants/Colors";

type Props = {
  items: NewsDataType[];
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('window');

const Dot: React.FC<{ index: number, scrollX: SharedValue<number> }> = ({ index, scrollX }) => {
  const inputRange = [
    (index - 1) * width,
    index * width,
    (index + 1) * width
  ];

  const animatedDotStyle = useAnimatedStyle(() => {
    const dotWidth = interpolate(
      scrollX.value,
      inputRange,
      [8, 16, 8],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      Extrapolate.CLAMP
    );

    const backgroundColor = interpolateColor(
      scrollX.value,
      inputRange,
      [Colors.darkGrey, Colors.tint, Colors.darkGrey]
    );

    return { 
      width: dotWidth,
      opacity,
      backgroundColor,
    };
  });

  return <Animated.View style={[styles.dot, animatedDotStyle]} />;
};

const Pagination: React.FC<Props> = ({ items, scrollX }) => {
  const itemsCount = useSharedValue(items.length);

  return (
    <View style={styles.container}>
      {Array(itemsCount.value).fill(0).map((_, index) => (
        <Dot key={index} index={index} scrollX={scrollX} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    height: 8,
    marginHorizontal: 4,
    borderRadius: 4,
  },
});

export default Pagination;