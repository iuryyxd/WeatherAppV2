import Clear from "../assets/Clear.png";
import HeavyCloud from "../assets/HeavyCloud.png";
import HeavyRain from "../assets/HeavyRain.png";
import LightCloud from "../assets/LightCloud.png";
import LightRain from "../assets/LightRain.png";
import Snow from "../assets/Snow.png";
import Thunderstorm from "../assets/Thunderstorm.png";

let imgs = {
    "01d": Clear,
    "02d": LightCloud,
    "03d": HeavyCloud,
    "04d": HeavyCloud,
    "09d": HeavyRain,
    "10d": LightRain,
    "11d": Thunderstorm,
    "13d": Snow,
    "50d": HeavyCloud,
    "01n": Clear,
    "02n": LightCloud,
    "03n": HeavyCloud,
    "04n": HeavyCloud,
    "09n": HeavyRain,
    "10n": LightRain,
    "11n": Thunderstorm,
    "13n": Snow,
    "50n": HeavyCloud,    
}

export const convertIcon = (icon: string) => {
    return imgs[icon as keyof typeof imgs]
}