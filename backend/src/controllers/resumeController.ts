import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth';
import Resume from '../models/Resume';
import cloudinary from '../config/cloudinary';
import { Readable } from 'stream';

export const uploadResume = async (req: AuthRequest, res: Response) => {
  try {
    const { title, role, tags } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Please upload a file' });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        resource_type: 'raw', 
        folder: 'resumes',
        public_id: `${Date.now()}_${file.originalname}`
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ error: 'Upload to Cloudinary failed' });
        }

        const parsedTags = typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : tags;

        const resume = await Resume.create({
          user: req.user?._id,
          title,
          role,
          tags: parsedTags || [],
          fileUrl: result?.secure_url,
          fileName: file.originalname,
          fileSize: file.size,
        });

        res.status(201).json(resume);
      }
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(file.buffer);
    readable.push(null);
    readable.pipe(uploadStream);

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getResumes = async (req: AuthRequest, res: Response) => {
  try {
    const resumes = await Resume.find({ user: req.user?._id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateResume = async (req: AuthRequest, res: Response) => {
  try {
    const { title, role, tags } = req.body;
    
    let resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user?._id.toString()) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    const parsedTags = typeof tags === 'string' ? tags.split(',').map((t: string) => t.trim()) : tags;

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { title, role, tags: parsedTags || resume.tags },
      { new: true }
    );

    res.json(resume);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteResume = async (req: AuthRequest, res: Response) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    if (resume.user.toString() !== req.user?._id.toString()) {
      return res.status(401).json({ error: 'Not authorized' });
    }

    if (resume.fileUrl) {
      const urlParts = resume.fileUrl.split('/');
      const filename = urlParts.pop();
      const folder = urlParts.pop();
      if (filename && folder) {
        const publicId = `${folder}/${filename}`;
        await cloudinary.uploader.destroy(publicId, { resource_type: 'raw' });
      }
    }

    await resume.deleteOne();
    res.json({ message: 'Resume removed' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
