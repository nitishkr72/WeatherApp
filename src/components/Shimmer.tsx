import React, {useState, useEffect, useRef} from 'react';
import {View, Animated, StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Shimmer = ({
  children,
  isLoading,
  wrapperStyle,
}: {
  children: React.JSX.Element;
  isLoading: boolean;
  wrapperStyle: any;
}) => {
  const GREY = 'rgb(234, 234, 234)';
  const shimmeringAnimatedValue = useRef(new Animated.Value(0)).current;
  const startAnimation = () => {
    const animation = Animated.loop(
      Animated.timing(shimmeringAnimatedValue, {
        useNativeDriver: false,
        delay: 1200,
        duration: 750,
        toValue: 1,
      }),
    );
    animation.start();
  };

  useEffect(() => {
    startAnimation();
  }, []);
  const gradientColors = [GREY, '#fff', GREY];

  return isLoading ? (
    <View
      style={{
        width: wrapperStyle?.width ?? '100%',
        height: wrapperStyle?.height ?? 80,
      }}>
      <View style={[styles.container, wrapperStyle]}>
        <Animated.View
          style={[
            {
              flex: 1,
            },
            // gradientStyle,
          ]}>
          <LinearGradient
            colors={gradientColors}
            start={{x: 0.3, y: 0.2}}
            end={{x: 0.8, y: 0.5}}
            style={{flex: 1}}
          />
        </Animated.View>
      </View>
    </View>
  ) : (
    children
  );
};
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    borderRadius: 5,
  },
});

export default Shimmer;
