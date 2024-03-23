import {useContext} from 'react';
import {ScrollView, Text, View} from 'react-native';
import ForecastDataViewComponent from '../components/ForecastDataViewComponent';
import RealTimeDataViewComponent from '../components/RealTimeDataViewComponent';
import {WeatherDataContext} from '../context/WeatherDataContext';

export default function TodayWeatherScreen(): React.JSX.Element {
  const {realtime, forecast} = useContext(WeatherDataContext);

  return (
    <ScrollView>
      <View>
        {realtime &&
          ('msg' in realtime ? (
            <Text>{realtime.msg}</Text>
          ) : (
            <RealTimeDataViewComponent
              weatherData={realtime.data.values}
              time={realtime.data.time}
              location={
                realtime.location.name === undefined
                  ? 'Location Unknown'
                  : realtime.location.name.split(',')[0]
              }
            />
          ))}
        {forecast &&
          ('status' in forecast ? (
            <Text>Error</Text>
          ) : (
            <ForecastDataViewComponent forecast={forecast} />
          ))}
      </View>
    </ScrollView>
  );
}
