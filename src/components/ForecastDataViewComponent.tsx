import {memo, useMemo} from 'react';
import {FlatList, Text, View} from 'react-native';
import EvilIcon from 'react-native-vector-icons/dist/EvilIcons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Ionicon from 'react-native-vector-icons/dist/Ionicons';
import {
  FORCAST_WEATHER_TYPE,
  WEATHER_DATA_TYPE,
} from '../types/weatherDataType';
import {getTimeIn12Hours, isWithinOneHour} from '../utils/utils';

const FLATLIST_ITEM_WIDTH = 120;
const FLATLIST_ITEM_HEIGHT = 150;

const FlatlistDataItem = memo(
  ({
    weather,
    itemIndex,
    targetIndex,
  }: {
    weather: WEATHER_DATA_TYPE;
    itemIndex: number;
    targetIndex: number;
  }) => {
    const date = new Date(Date.parse(weather.time));
    return (
      <View
        style={{
          backgroundColor:
            targetIndex === itemIndex ? '#D0BCFFe6' : '#D0BCFF4D',
          padding: 15,
          margin: 5,
          width: FLATLIST_ITEM_WIDTH,
          height: FLATLIST_ITEM_HEIGHT,
          borderRadius: 20,
        }}>
        <Text style={{color: '#454545', fontSize: 16, fontWeight: '700'}}>
          {itemIndex === targetIndex ? 'Now' : getTimeIn12Hours(date)}
        </Text>
        <View style={{marginTop: 'auto', flexDirection: 'column', gap: 6}}>
          <View style={{display: 'flex', flexDirection: 'row', gap: 4}}>
            <FontAwesome name="thermometer-2" size={18} color="#777" />
            <Text>{weather.values.temperature} °C</Text>
          </View>
          <View style={{display: 'flex', flexDirection: 'row', gap: 4}}>
            <Ionicon name="rainy-outline" size={18} color="#777" />
            <Text>{weather.values.precipitationProbability} %</Text>
          </View>
        </View>
      </View>
    );
  },
);

export default function ForecastDataViewComponent({
  forecast,
}: {
  forecast: FORCAST_WEATHER_TYPE;
}) {
  const date = new Date();
  const targetIndex = useMemo(() => {
    return forecast.timelines.hourly.findIndex(item => {
      return isWithinOneHour(new Date(Date.parse(item.time)), date);
    });
  }, [forecast, date]);

  const getItemLayout = (data, index: number) => ({
    length: FLATLIST_ITEM_WIDTH,
    offset: FLATLIST_ITEM_WIDTH * index,
    index,
  });

  return (
    <View style={{padding: 12, backgroundColor: '#D0BCFF4D'}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <EvilIcon name="clock" size={18} color="#777" />
        <Text>Hourly Forecast</Text>
      </View>
      <FlatList
        data={forecast.timelines.hourly}
        horizontal={true}
        initialScrollIndex={targetIndex}
        showsHorizontalScrollIndicator={true}
        getItemLayout={getItemLayout}
        renderItem={({item, index}) => (
          <FlatlistDataItem
            weather={item}
            itemIndex={index}
            targetIndex={targetIndex}
          />
        )}
      />
    </View>
  );
}
