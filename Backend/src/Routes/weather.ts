import { Router } from 'express';
import {
  getWeather,
  getCurrentWeather,
  getDailyForecast,
  getHourlyForecast,
} from '../Controllers/waetherController';

const router = Router();

router.get('/', getWeather);
router.get('/current', getCurrentWeather);
router.get('/daily', getDailyForecast);
router.get('/hourly', getHourlyForecast);

export default router;