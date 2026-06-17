import { ExternalLink, Trash2, FileText } from 'lucide-react';

interface Resume {
  _id: string;
  title: string;
  role: string;
  tags: string[];
  fileUrl: string;
  fileName: string;
  fileSize: number;
  createdAt: string;
}

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
}

export default function ResumeCard({ resume, onDelete }: ResumeCardProps) {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        <button 
          onClick={() => window.open(resume.fileUrl, '_blank')}
          className="p-1.5 bg-background border border-border rounded-md text-textSecondary hover:text-accent transition-colors"
          title="View"
        >
          <ExternalLink className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onDelete(resume._id)}
          className="p-1.5 bg-background border border-border rounded-md text-textSecondary hover:text-red-400 transition-colors"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-accent/10 rounded-lg text-accent">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-textPrimary text-lg line-clamp-1 pr-16">{resume.title}</h3>
          <p className="text-textSecondary text-sm line-clamp-1">{resume.role}</p>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-wrap gap-2 mb-4">
          {resume.tags.map((tag, idx) => (
             <span key={idx} className="px-2 py-1 text-xs font-medium bg-background border border-border rounded-md text-textSecondary">
               {tag}
             </span>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border flex justify-between items-center text-xs text-textSecondary">
        <span>{new Date(resume.createdAt).toLocaleDateString()}</span>
        <span>{formatBytes(resume.fileSize)}</span>
      </div>
    </div>
  );
}
