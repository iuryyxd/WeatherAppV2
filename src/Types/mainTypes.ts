export interface CurrentWeatherType {
  local?: string;
  temperature: {
    metric: number;
  };
  pressure: number;
  humidity: number;
  visibility: number;
  windSpeed: {
    metric: number;
  };
  weathericon: string;
  weathertext: string;
}

export interface ForecastWeatherType {
  day: string;
  temperature: {
    minimum: {
      metric: number;
    };
    maximum: {
      metric: number;
    };
  };
  icon: string;
}

export interface CitiesType {
  name: string;
  state: string;
  lat: number;
  lon: number;
}

export interface ForecastWeatherDataType {
  dt_txt: string;
  main: {
    temp_max: number;
    temp_min: number;
  };
  weather: [
    {
      icon: string;
    }
  ];
}

export interface PositionType {
  coords: {
    latitude: number;
    longitude: number;
  }
}

export interface CitiesItemType {
  name: string;
  state: string;
  lat: number;
  lon: number;
}
