import { Router } from 'express';
import multer from 'multer';
import {
  analyzeTrees,
  getTreeHistory,
  getTreeQuota,
} from '../Controllers/treeController';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze', upload.single('image'), analyzeTrees);
router.get('/history', getTreeHistory);
router.get('/quota', getTreeQuota);

export default router;