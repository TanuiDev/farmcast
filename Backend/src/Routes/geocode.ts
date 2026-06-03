import { Router } from 'express';
import { geocodeLocation } from '../Controllers/geocodeController';

const router = Router();

router.get('/', geocodeLocation);

export default router;