import express from 'express';
import { uploadResume, getResumes, updateResume, deleteResume } from '../controllers/resumeController';
import { protect } from '../middlewares/auth';
import upload from '../middlewares/upload';

const router = express.Router();

router.route('/')
  .post(protect, upload.single('file'), uploadResume)
  .get(protect, getResumes);

router.route('/:id')
  .put(protect, updateResume)
  .delete(protect, deleteResume);

export default router;
