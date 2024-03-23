import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Entypo';
import {WEATHER_CODE, WEATHER_VALUES_TYPE} from '../types/weatherDataType';
import {getTimeIn12Hours} from '../utils/utils';
import ItemViewComponent from './ItemViewComponent';
import Shimmer from './Shimmer';

export default function RealTimeDataViewComponent({
  weatherData,
  time,
  location,
}: {
  weatherData: WEATHER_VALUES_TYPE;
  time: string;
  location: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const featchedAt = new Date(Date.parse(time));

  const updatedAt = getTimeIn12Hours(featchedAt);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.realtime_container}>
      <View
        style={[styles.item_row_container, {justifyContent: 'space-between'}]}>
        <Text>Updated at: {updatedAt}</Text>
        <View style={styles.item_row_container}>
          <Icon name="location-pin" size={18} color="#777" />
          <Text>{location}</Text>
        </View>
      </View>
      <Shimmer isLoading={isLoading} wrapperStyle={styles.report_container}>
        <View style={styles.report_container}>
          <ItemViewComponent
            name={'Weather'}
            value={WEATHER_CODE[weatherData.weatherCode]}
          />
        </View>
      </Shimmer>
      <Shimmer isLoading={isLoading} wrapperStyle={styles.report_container}>
        <View style={styles.report_container}>
          <ItemViewComponent
            name={'Humidity'}
            value={weatherData.humidity}
            valueType="%"
          />
          <ItemViewComponent
            name={'Precipitation'}
            value={weatherData.precipitationProbability}
            valueType="%"
          />
        </View>
      </Shimmer>
      <Shimmer isLoading={isLoading} wrapperStyle={styles.report_container}>
        <View style={styles.report_container}>
          <ItemViewComponent name={'UV Index'} value={weatherData.uvIndex} />
          <ItemViewComponent
            name={'Visibility'}
            value={weatherData.visibility}
            valueType="Km"
          />
        </View>
      </Shimmer>
      <Shimmer isLoading={isLoading} wrapperStyle={styles.report_container}>
        <View style={styles.report_container}>
          <ItemViewComponent
            name={'Temperature'}
            value={weatherData.temperature}
            valueType="°C"
          />
          <ItemViewComponent
            name={'Wind Speed'}
            value={weatherData.windSpeed}
            valueType="m/s"
          />
        </View>
      </Shimmer>
    </View>
  );
}

const styles = StyleSheet.create({
  realtime_container: {
    margin: 12,
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: 12,
  },
  report_container: {
    paddingHorizontal: 4,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    height: 90,
  },
  item_row_container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2,
    alignItems: 'center',
  },
});
