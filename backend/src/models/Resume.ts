import mongoose, { Schema, Document } from 'mongoose';

export interface IResume extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  role: string;
  tags: string[];
  fileUrl: string;
  fileName: string;
  fileSize: number;
}

const ResumeSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  role: { type: String, required: true },
  tags: { type: [String], default: [] },
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model<IResume>('Resume', ResumeSchema);
