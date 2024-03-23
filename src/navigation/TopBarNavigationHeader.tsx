import {Animated, Text, TextInput, TouchableOpacity, View} from 'react-native';
import TextHeading from '../components/TextHeading';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {useContext, useState} from 'react';
import {WeatherDataContext} from '../context/WeatherDataContext';
import {WEATHER_CODE} from '../types/weatherDataType';

export default function TopBarNavigationHeader({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps): React.JSX.Element {
  const {realtime, setLocation} = useContext(WeatherDataContext);
  const [showInputText, setShowInputText] = useState(false);
  const [locationText, setLocationText] = useState('');

  return (
    <View style={{flexDirection: 'column', backgroundColor: '#E2D3FA'}}>
      <View
        style={{
          width: '100%',
          height: 150,
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        {realtime &&
          ('msg' in realtime ? (
            <Text>Loading</Text>
          ) : (
            <View>
              {showInputText ? (
                <TextInput
                  value={locationText}
                  onChangeText={text => setLocationText(text)}
                  autoFocus={true}
                  onSubmitEditing={() => {
                    setLocation(locationText);
                    setShowInputText(false);
                  }}
                  placeholder="Location Name"
                  placeholderTextColor={'#5588ff4d'}
                  style={{
                    fontSize: 20,
                    borderWidth: 1,
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    borderColor: '#18f',
                    color: '#5588ff',
                  }}
                />
              ) : (
                <TouchableOpacity onPress={() => setShowInputText(true)}>
                  <TextHeading
                    text={
                      realtime.location.name === undefined
                        ? 'Location Unknown'
                        : realtime.location.name.split(',')[0]
                    }
                  />
                </TouchableOpacity>
              )}
              <View>
                <Text style={{fontSize: 50, color: 'black'}}>
                  {Number(realtime.data.values.temperature).toFixed(0)} °C
                </Text>
                <Text>{WEATHER_CODE[realtime.data.values.weatherCode]}</Text>
              </View>
            </View>
          ))}
      </View>
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0.6)),
          });

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{flex: 1}}>
              <Animated.View style={{opacity}}>
                <View
                  style={{
                    display: 'flex',
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#E0B6FF',
                  }}>
                  <Text style={{fontWeight: '700', fontSize: 16}}>{label}</Text>
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
