import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_KEY, URL} from '../apikey';
import {REALTIME_WEATHER_TYPE, error_msg_code} from '../types/weatherDataType';

export const getRealtimeWeatherData = async (locationVal: string) => {
  const locationSearchString = locationVal.trim().replaceAll(' ', '%20');
  try {
    const data = await fetch(
      `${URL}/realtime?location=${locationSearchString}&apikey=${API_KEY}`,
    );
    if (data.status === 200) {
      const realtime_data: REALTIME_WEATHER_TYPE = await data.json();
      AsyncStorage.setItem('realtime', JSON.stringify(realtime_data));
      return realtime_data;
    } else if (data.status === 404) {
      return {
        msg: 'Something Went Wrong',
        status: 404,
      };
    } else if (data.status === 429) {
      return {
        msg: 'Request limit exceeded',
        status: data.status,
      };
    }
  } catch (error) {
    return {
      msg: 'API FAILED',
      status: 404,
    };
  }

  return error_msg_code;
};
