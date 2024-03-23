export type WEATHER_CODE_TYPE =
  | '0'
  | '1000'
  | '1100'
  | '1101'
  | '1102'
  | '1001'
  | '2000'
  | '2100'
  | '4000'
  | '4001'
  | '4200'
  | '4201'
  | '5000'
  | '5001'
  | '5100'
  | '5101'
  | '6000'
  | '6001'
  | '6200'
  | '6201'
  | '7000'
  | '7101'
  | '7102'
  | '8000';

export type WEATHER_DAILY_VALUE_TYPE = {
  cloudBaseAvg: string;
  cloudBaseMax: string;
  cloudBaseMin: string;
  cloudCeilingAvg: string;
  cloudCeilingMax: string;
  cloudCeilingMin: string;
  cloudCoverAvg: string;
  cloudCoverMax: string;
  cloudCoverMin: string;
  dewPointAvg: string;
  dewPointMax: string;
  dewPointMin: string;
  evapotranspirationAvg: string;
  evapotranspirationMax: string;
  evapotranspirationMin: string;
  evapotranspirationSum: string;
  freezingRainIntensityAvg: string;
  freezingRainIntensityMax: string;
  freezingRainIntensityMin: string;
  humidityAvg: string;
  humidityMax: string;
  humidityMin: string;
  iceAccumulationAvg: string;
  iceAccumulationLweAvg: string;
  iceAccumulationLweMax: string;
  iceAccumulationLweMin: string;
  iceAccumulationLweSum: string;
  iceAccumulationMax: string;
  iceAccumulationMin: string;
  iceAccumulationSum: string;
  moonriseTime: string;
  moonsetTime: string;
  precipitationProbabilityAvg: string;
  precipitationProbabilityMax: string;
  precipitationProbabilityMin: string;
  pressureSurfaceLevelAvg: string;
  pressureSurfaceLevelMax: string;
  pressureSurfaceLevelMin: string;
  rainAccumulationAvg: string;
  rainAccumulationLweAvg: string;
  rainAccumulationLweMax: string;
  rainAccumulationLweMin: string;
  rainAccumulationMax: string;
  rainAccumulationMin: string;
  rainAccumulationSum: string;
  rainIntensityAvg: string;
  rainIntensityMax: string;
  rainIntensityMin: string;
  sleetAccumulationAvg: string;
  sleetAccumulationLweAvg: string;
  sleetAccumulationLweMax: string;
  sleetAccumulationLweMin: string;
  sleetAccumulationLweSum: string;
  sleetAccumulationMax: string;
  sleetAccumulationMin: string;
  sleetIntensityAvg: string;
  sleetIntensityMax: string;
  sleetIntensityMin: string;
  snowAccumulationAvg: string;
  snowAccumulationLweAvg: string;
  snowAccumulationLweMax: string;
  snowAccumulationLweMin: string;
  snowAccumulationLweSum: string;
  snowAccumulationMax: string;
  snowAccumulationMin: string;
  snowAccumulationSum: string;
  snowDepthAvg: string;
  snowDepthMax: string;
  snowDepthMin: string;
  snowDepthSum: string;
  snowIntensityAvg: string;
  snowIntensityMax: string;
  snowIntensityMin: string;
  sunriseTime: string;
  sunsetTime: string;
  temperatureApparentAvg: string;
  temperatureApparentMax: string;
  temperatureApparentMin: string;
  temperatureAvg: string;
  temperatureMax: string;
  temperatureMin: string;
  uvHealthConcernAvg: string;
  uvHealthConcernMax: string;
  uvHealthConcernMin: string;
  uvIndexAvg: string;
  uvIndexMax: string;
  uvIndexMin: string;
  visibilityAvg: string;
  visibilityMax: string;
  visibilityMin: string;
  weatherCodeMax: WEATHER_CODE_TYPE;
  weatherCodeMin: WEATHER_CODE_TYPE;
  windDirectionAvg: string;
  windGustAvg: string;
  windGustMax: string;
  windGustMin: string;
  windSpeedAvg: string;
  windSpeedMax: string;
  windSpeedMin: string;
};

export type WEATHER_VALUES_TYPE = {
  cloudBase: string;
  cloudCeiling: string;
  cloudCover: string;
  dewPoint: string;
  evapotranspiration: string;
  freezingRainIntensity: string;
  humidity: string; //imp
  iceAccumulation: string;
  iceAccumulationLwe: string;
  precipitationProbability: string; //imp
  pressureSurfaceLevel: string;
  rainAccumulation: string;
  rainAccumulationLwe: string;
  rainIntensity: string;
  sleetAccumulation: string;
  sleetAccumulationLwe: string;
  sleetIntensity: string;
  snowAccumulation: string;
  snowAccumulationLwe: string;
  snowDepth: string;
  snowIntensity: string;
  temperature: string; //imp
  temperatureApparent: string;
  uvHealthConcern: string;
  uvIndex: string; //imp
  visibility: string; //imp
  weatherCode: WEATHER_CODE_TYPE;
  windDirection: string;
  windGust: string;
  windSpeed: string; //imp
};

export type WEATHER_DATA_TYPE = {
  time: string;
  values: WEATHER_VALUES_TYPE;
};

export type WEATHER_DAILY_DATA_TYPE = {
  time: string;
  values: WEATHER_DAILY_VALUE_TYPE;
};

export type TIMLINES_DATA_TYPE = {
  minutely: WEATHER_DATA_TYPE[];
  hourly: WEATHER_DATA_TYPE[];
  daily: WEATHER_DAILY_DATA_TYPE[];
};

export type LOCATION_DATA_TYPE = {
  lat: string;
  lon: string;
  name: string;
  type: string;
};

export type FORCAST_WEATHER_TYPE = {
  timelines: TIMLINES_DATA_TYPE;
  location: LOCATION_DATA_TYPE;
};

export type REALTIME_WEATHER_TYPE = {
  data: WEATHER_DATA_TYPE;
  location: LOCATION_DATA_TYPE;
};

export type ERROR_MSG_TYPE = {
  msg: string;
  status: number;
};

export const error_msg_code: ERROR_MSG_TYPE = {
  msg: 'Incorrect Location Name',
  status: 400,
};

export const WEATHER_CODE = {
  '0': 'Unknown',
  '1000': 'Clear, Sunny',
  '1100': 'Mostly Clear',
  '1101': 'Partly Cloudy',
  '1102': 'Mostly Cloudy',
  '1001': 'Cloudy',
  '2000': 'Fog',
  '2100': 'Light Fog',
  '4000': 'Drizzle',
  '4001': 'Rain',
  '4200': 'Light Rain',
  '4201': 'Heavy Rain',
  '5000': 'Snow',
  '5001': 'Flurries',
  '5100': 'Light Snow',
  '5101': 'Heavy Snow',
  '6000': 'Freezing Drizzle',
  '6001': 'Freezing Rain',
  '6200': 'Light Freezing Rain',
  '6201': 'Heavy Freezing Rain',
  '7000': 'Ice Pellets',
  '7101': 'Heavy Ice Pellets',
  '7102': 'Light Ice Pellets',
  '8000': 'Thunderstorm',
};
