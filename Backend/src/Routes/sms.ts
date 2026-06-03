import { Router } from 'express';
import { sendSMS } from '../Controllers/smsController';

const router = Router();

router.post('/send', sendSMS);

export default router;