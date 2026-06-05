import { Router } from 'express';
import multer from 'multer';
import {
  analyzeTrees,
  getTreeHistory,
  getTreeQuota,
} from '../Controllers/treeController';

const router = Router();

// Accept images up to 5MB and only allow image/* mimetypes
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (file && file.mimetype && file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

router.post('/analyze', upload.single('image'), analyzeTrees);
router.get('/history', getTreeHistory);
router.get('/quota', getTreeQuota);

// Temporary debug endpoint: echoes received file metadata and fields
router.post('/debug-echo', upload.single('image'), (req, res) => {
  const file = req.file;
  const body = req.body;
  res.json({
    receivedFile: file
      ? {
          fieldname: file.fieldname,
          originalname: file.originalname,
          encoding: file.encoding,
          mimetype: file.mimetype,
          size: file.size,
        }
      : null,
    fields: body,
  });
});

export default router;