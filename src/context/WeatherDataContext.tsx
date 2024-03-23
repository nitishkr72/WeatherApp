import {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {getForcastWeatherData} from '../api/forcastAPI';
import {getRealtimeWeatherData} from '../api/realtimeAPI';
import {
  ERROR_MSG_TYPE,
  FORCAST_WEATHER_TYPE,
  REALTIME_WEATHER_TYPE,
} from '../types/weatherDataType';
import {memoizedAPICall} from '../utils/utils';
import Geolocation from '@react-native-community/geolocation';

type WEATHER_DATA_CONTEXT_TYPE = {
  realtime: REALTIME_WEATHER_TYPE | ERROR_MSG_TYPE | undefined;
  forecast: FORCAST_WEATHER_TYPE | ERROR_MSG_TYPE | undefined;
  location: string;
  setLocation: (location: string) => void;
};

export const WeatherDataContext = createContext<WEATHER_DATA_CONTEXT_TYPE>({
  realtime: undefined,
  forecast: undefined,
  location: '',
  setLocation: (location: string) => {},
});

export function WeatherDataContextProvider({children}: any) {
  const [realtime, setRealtimeData] = useState<
    REALTIME_WEATHER_TYPE | ERROR_MSG_TYPE | undefined
  >();

  const [forecast, setForecastData] = useState<
    FORCAST_WEATHER_TYPE | ERROR_MSG_TYPE | undefined
  >();

  const [location, setLocation] = useState<string>('');

  const getRealtimeData = async (location: string) => {
    const data: REALTIME_WEATHER_TYPE | ERROR_MSG_TYPE | undefined =
      await memoizedAPICall(location, getRealtimeWeatherData, 'realtime', true);
    if (
      data &&
      'status' in data &&
      (data.status === 429 || data.status === 404 || data.status === 400)
    ) {
      setRealtimeData(JSON.parse(data.msg));
    } else {
      setRealtimeData(data);
    }
  };

  const getForecastData = async (location: string) => {
    const data: FORCAST_WEATHER_TYPE | ERROR_MSG_TYPE | undefined =
      await memoizedAPICall(location, getForcastWeatherData, 'forecast', true);

    if (
      data &&
      'status' in data &&
      (data.status === 429 || data.status === 404 || data.status === 400)
    ) {
      if (data.status === 429) Alert.alert('Too many Request');
      else if (data.status === 404)
        Alert.alert('Not able to fetch data, Showing cache data');
      else if (data.status === 400) Alert.alert(data.msg);

      setForecastData(JSON.parse(data.msg));
    } else {
      setForecastData(data);
    }
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        const location = pos.coords.longitude + ', ' + pos.coords.latitude;
        getRealtimeData(location);
        getForecastData(location);
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  useEffect(() => {
    if (location !== '') {
      getRealtimeData(location);
      getForecastData(location);
    }
  }, [location]);

  useEffect(() => {
    Geolocation.requestAuthorization(
      () => {
        getCurrentPosition();
      },
      () => {
        Alert.alert('Location Permission not granted');
      },
    );
  }, []);

  return (
    <WeatherDataContext.Provider
      value={{realtime, forecast, location, setLocation}}>
      {children}
    </WeatherDataContext.Provider>
  );
}
