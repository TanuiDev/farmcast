import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err.code, err.message);
    res.status(400).json({ error: 'File upload error', details: err.message });
    return;
  }

  console.error('Unhandled error:', err && err.message ? err.message : err);
  res.status(500).json({
    error: 'Something went wrong',
    details: err && err.message ? err.message : String(err),
  });
};