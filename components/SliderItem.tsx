import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { Href, Link } from "expo-router";

type Props = {
  slideItem: NewsDataType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get("screen");

const SliderItem = ({ slideItem, index, scrollX }: Props) => {
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [-width * 0.15, 0, width * 0.15],
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            scrollX.value,
            [(index - 1) * width, index * width, (index + 1) * width],
            [0.9, 1, 0.9],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });

  return (
    <Link href={`/news/${slideItem.article_id}` as Href} asChild>
      <TouchableOpacity>
        <Animated.View style={[styles.itemWrapper, rStyle]} key={slideItem.article_id}>
          <Image source={{ uri: slideItem.image_url }} style={styles.image} />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.9)"]}
            style={styles.background}
          >
            <View style={styles.sourceInfo}>
              {slideItem.source_icon && (
                <Image
                  source={{ uri: slideItem.source_icon }}
                  style={styles.sourceIcon}
                  resizeMode="contain"
                />
              )}
              <Text style={styles.sourceName}>{slideItem.source_name}</Text>
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {slideItem.title}
            </Text>
          </LinearGradient>
        </Animated.View>
      </TouchableOpacity>
    </Link>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  background: {
    position: "absolute",
    left: 30,
    width: width - 60,
    right: 0,
    top: 0,
    height: 180,
    borderRadius: 20,
    padding: 20,
  },
  sourceName: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600",
  },
  sourceIcon: {
    width: 25,
    height: 25,
    borderRadius: 10,
  },
  sourceInfo: {
    flexDirection: "row",
    position: "absolute",
    top: 85,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: "600",
    position: "absolute",
    top: 120,
    paddingHorizontal: 20,
  },
});