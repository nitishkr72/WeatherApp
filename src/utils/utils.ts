import AsyncStorage from '@react-native-async-storage/async-storage';

export async function memoizedAPICall(
  location: string,
  apiFunCall: (location: string) => Promise<any>,
  weatherDataType: string,
  refresh: Boolean = false,
) {
  const val = await AsyncStorage.getItem(weatherDataType);
  if (refresh || val === null) {
    const data = await apiFunCall(location);
    if (data.status && (data.status === 429 || data.status === 404)) {
      return {
        status: data.status,
        msg: val ?? '',
      };
    }
    return data;
  } else {
    return JSON.parse(val);
  }
}

export function isWithinOneHour(date1: Date, date2: Date) {
  const timeDifference = Math.abs(date2.getTime() - date1.getTime());
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  return hoursDifference <= 1;
}

export function getTimeIn12Hours(date: Date) {
  return date
    .toLocaleTimeString()
    .replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, '$1$3');
}

export function getDateInMMDDYYYY(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}
