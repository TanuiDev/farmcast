import { Request, Response } from 'express';

export const sendSMS = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone, message } = req.body;

    if (!phone || !message) {
      res.status(400).json({ error: 'phone and message are required' });
      return;
    }

    if (message.length > 160) {
      res.status(400).json({ error: 'Message exceeds 160 characters' });
      return;
    }

    const params = new URLSearchParams({
      username: process.env.AT_USERNAME || 'sandbox',
      to: phone,
      message: message,
    });

    const response = await fetch('https://api.sandbox.africastalking.com/version1/messaging', {
      method: 'POST',
      headers: {
        apiKey: process.env.AT_API_KEY || '',
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body: params.toString(),
    });

    const data = await response.json();

    res.json({
      status: 'sent',
      message: 'SMS delivered successfully',
      data,
    });
  } catch (error) {
    res.status(500).json({ error: 'SMS sending failed', details: String(error) });
  }
};