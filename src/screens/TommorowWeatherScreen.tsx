import {useContext} from 'react';
import {FlatList, Text, View} from 'react-native';
import {WeatherDataContext} from '../context/WeatherDataContext';
import {getDateInMMDDYYYY} from '../utils/utils';
import {WEATHER_CODE} from '../types/weatherDataType';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';

export default function TommorowWeatherScreen(): React.JSX.Element {
  const {forecast} = useContext(WeatherDataContext);

  return (
    <View style={{marginTop: 12}}>
      {forecast &&
        ('msg' in forecast ? (
          <Text>{forecast.msg}</Text>
        ) : (
          <FlatList
            data={forecast.timelines.daily}
            renderItem={({item}) => {
              const date = getDateInMMDDYYYY(new Date(Date.parse(item.time)));
              const today = getDateInMMDDYYYY(new Date());

              return (
                <View
                  style={{
                    marginHorizontal: 12,
                    marginVertical: 6,
                    backgroundColor: '#EBDEFF',
                    height: 100,
                    borderRadius: 20,
                    paddingVertical: 12,
                    paddingHorizontal: 20,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                    }}>
                    <Text style={{fontSize: 15, fontWeight: '700'}}>
                      {date === today ? 'Today' : date}
                    </Text>
                    <View style={{marginTop: 'auto'}}>
                      <Text>{WEATHER_CODE[item.values.weatherCodeMin]}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'center',
                      gap: 12,
                      width: 120,
                    }}>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 12}}>
                      <FontAwesome
                        name="thermometer-2"
                        size={18}
                        color="#777"
                      />
                      <Text>{item.values.temperatureAvg} °C</Text>
                    </View>
                    <View
                      style={{display: 'flex', flexDirection: 'row', gap: 5}}>
                      <MaterialIcon name="dew-point" size={18} color="#777" />
                      <Text>{item.values.dewPointAvg} °C</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ))}
    </View>
  );
}
