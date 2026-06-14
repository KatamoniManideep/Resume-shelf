import { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { uploadResume } from '../services/resumeService';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function UploadModal({ isOpen, onClose, onSuccess }: UploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('role', role);
    formData.append('tags', tags);

    try {
      await uploadResume(formData);
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to upload resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-surface border border-border rounded-xl shadow-lg w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-textPrimary">Upload Resume</h2>
          <button onClick={onClose} className="text-textSecondary hover:text-textPrimary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">{error}</div>}
          
          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">Resume File (PDF/DOCX)</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 flex flex-col items-center justify-center bg-background/50 hover:bg-border/30 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-8 h-8 text-accent mb-2" />
              <span className="text-sm text-textSecondary text-center">
                {file ? <span className="text-accent font-medium">{file.name}</span> : 'Click or drag file to upload'}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">Title (e.g. My Main Resume)</label>
            <input
              type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-textPrimary focus:ring-accent focus:border-accent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">Target Role</label>
            <input
              type="text" required value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-textPrimary focus:ring-accent focus:border-accent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textSecondary mb-1">Tags (comma separated)</label>
            <input
              type="text" value={tags} onChange={(e) => setTags(e.target.value)}
              placeholder="React, Node.js, Frontend"
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-textPrimary focus:ring-accent focus:border-accent outline-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit" disabled={loading}
              className="w-full bg-accent hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              {loading ? 'Uploading...' : 'Upload Resume'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
