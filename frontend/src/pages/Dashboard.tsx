import { useState, useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import ResumeCard from '../components/ResumeCard';
import UploadModal from '../components/UploadModal';
import { getResumes, deleteResume } from '../services/resumeService';
import { Plus, Search, Filter } from 'lucide-react';

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

export default function Dashboard() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const data = await getResumes();
      setResumes(data);
    } catch (err: any) {
      setError('Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await deleteResume(id);
        fetchResumes();
      } catch (err) {
        alert('Failed to delete resume');
      }
    }
  };

  const filteredAndSortedResumes = useMemo(() => {
    let result = [...resumes];

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(r => 
        r.title.toLowerCase().includes(lowerSearch) || 
        r.role.toLowerCase().includes(lowerSearch) ||
        r.tags.some(t => t.toLowerCase().includes(lowerSearch))
      );
    }

    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === 'a-z') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [resumes, searchTerm, sortBy]);

  return (
    <Layout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-textPrimary">Your Resumes</h2>
          <p className="text-textSecondary text-sm">Manage and organize your tailored resumes.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-accent hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors shadow-sm w-full md:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Upload Resume
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-textSecondary" />
          </div>
          <input
            type="text"
            placeholder="Search by title, role, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-surface text-textPrimary focus:ring-accent focus:border-accent sm:text-sm transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-textSecondary" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-textPrimary text-sm focus:outline-none w-full"
          >
            <option value="newest" className="bg-surface">Newest First</option>
            <option value="oldest" className="bg-surface">Oldest First</option>
            <option value="a-z" className="bg-surface">A-Z</option>
          </select>
        </div>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent"></div>
        </div>
      ) : filteredAndSortedResumes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedResumes.map(resume => (
            <ResumeCard key={resume._id} resume={resume} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-border border-dashed rounded-xl p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-textSecondary" />
          </div>
          <h3 className="text-lg font-medium text-textPrimary mb-2">No resumes found</h3>
          <p className="text-textSecondary max-w-md mb-6">
            {resumes.length === 0 
              ? "Upload your first resume to get started organizing your job applications."
              : "No resumes match your current search criteria."}
          </p>
          {resumes.length === 0 && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-accent hover:text-blue-400 font-medium transition-colors"
            >
              Click here to upload
            </button>
          )}
        </div>
      )}

      <UploadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchResumes} 
      />
    </Layout>
  );
}
