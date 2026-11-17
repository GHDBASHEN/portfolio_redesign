import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const STATUS_OPTIONS = [
  { value: 'Live', label: 'Live', color: 'bg-emerald-500', desc: 'Active & hosted deployment' },
  { value: 'Ongoing', label: 'Ongoing', color: 'bg-amber-500', desc: 'Currently in development' },
  { value: 'Done (Not Hosted)', label: 'Done (Not Hosted)', color: 'bg-zinc-400', desc: 'Completed code, not live-hosted' },
];

export default function ProjectForm({ projectToEdit }) {
  const [name, setName] = useState(projectToEdit?.name || '');
  const [status, setStatus] = useState(projectToEdit?.status || 'Live');
  const [description, setDescription] = useState(projectToEdit?.description || '');
  const [projectUrl, setProjectUrl] = useState(projectToEdit?.projectUrl || '');
  const [videoUrl, setVideoUrl] = useState(projectToEdit?.videoUrl || '');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(projectToEdit?.imageUrl || null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('status', status);
    formData.append('description', description);
    formData.append('projectUrl', projectUrl);
    formData.append('videoUrl', videoUrl);
    if (image) {
      formData.append('image', image);
    }

    try {
      const endpoint = projectToEdit
        ? `/api/projects/${projectToEdit._id}`
        : '/api/projects';

      const method = projectToEdit ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method: method,
        body: formData,
      });

      if (response.ok) {
        alert(`Project ${projectToEdit ? 'updated' : 'added'} successfully!`);
        router.push('/admin');
      } else {
        const errorData = await response.json();
        alert(`Failed: ${errorData.message || errorData.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md max-w-2xl mx-auto border border-gray-100">
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-gray-800">
          Project Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. NextGen E-Commerce, AI Voice Platform"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          Project Status <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = status === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 ring-2 ring-indigo-500/20 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${opt.color} ${opt.value === 'Live' ? 'animate-pulse' : ''}`} />
                  <span className={`text-xs font-bold ${isSelected ? 'text-indigo-900' : 'text-gray-700'}`}>
                    {opt.label}
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 mt-1 leading-snug">
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label htmlFor="projectUrl" className="block text-sm font-semibold text-gray-800">
          Project / Live Deployment URL <span className="text-xs font-normal text-gray-500">(Optional if not hosted)</span>
        </label>
        <input
          type="url"
          id="projectUrl"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          placeholder="https://myproject.com or https://github.com/..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>

      <div>
        <label htmlFor="videoUrl" className="block text-sm font-semibold text-gray-800">
          Video Demo Link <span className="text-xs font-normal text-gray-500">(Optional — YouTube, Loom, Drive or MP4)</span>
        </label>
        <input
          type="url"
          id="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://youtube.com/watch?v=... or https://loom.com/share/..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
        <p className="mt-1 text-xs text-gray-500">
          If provided, visitors will see a &quot;Watch Demo&quot; button on the project card to watch the video.
        </p>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-800">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          placeholder="Detailed overview of what you built, architecture, stack and problem solved..."
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-semibold text-gray-800">
          Project Thumbnail Image {projectToEdit && '(Optional if not changing)'}
        </label>
        {preview && (
          <div className="mt-2 mb-4 relative h-44 w-full border rounded-xl overflow-hidden bg-gray-50">
            <Image src={preview} alt="Preview" fill className="object-contain" />
          </div>
        )}
        <input
          type="file"
          id="image"
          onChange={handleImageChange}
          required={!projectToEdit}
          accept="image/*"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100 cursor-pointer"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white transition-all ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        }`}
      >
        {loading ? 'Processing...' : (projectToEdit ? 'Update Project' : 'Add Project')}
      </button>
    </form>
  );
}
