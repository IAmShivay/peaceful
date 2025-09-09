'use client';

import { useState, useRef, useCallback } from 'react';
import { 
  Upload, 
  X, 
  FileAudio, 
  Music, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  Play,
  Pause,
  Volume2,
  Tag,
  Globe,
  Lock,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AudioFile {
  file: File;
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  isPremium: boolean;
  preview?: string;
  duration?: number;
  size: number;
  format: string;
  uploadProgress: number;
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

const categories = [
  { id: 'electronic', name: 'Electronic', color: 'bg-blue-500' },
  { id: 'hip-hop', name: 'Hip Hop', color: 'bg-purple-500' },
  { id: 'rock', name: 'Rock', color: 'bg-red-500' },
  { id: 'jazz', name: 'Jazz', color: 'bg-yellow-500' },
  { id: 'classical', name: 'Classical', color: 'bg-indigo-500' },
  { id: 'ambient', name: 'Ambient', color: 'bg-green-500' },
  { id: 'pop', name: 'Pop', color: 'bg-pink-500' },
  { id: 'sound-effects', name: 'Sound Effects', color: 'bg-gray-500' },
];

export default function AdminUpload() {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    const audioFiles = files.filter(file => file.type.startsWith('audio/'));
    
    audioFiles.forEach(file => {
      const audioFile: AudioFile = {
        file,
        id: Math.random().toString(36).substr(2, 9),
        title: file.name.replace(/\.[^/.]+$/, ''),
        description: '',
        category: 'electronic',
        tags: [],
        isPublic: true,
        isPremium: false,
        size: file.size,
        format: file.type.split('/')[1] || 'unknown',
        uploadProgress: 0,
        status: 'pending'
      };

      // Create audio preview URL
      const url = URL.createObjectURL(file);
      audioFile.preview = url;

      // Get audio duration
      const audio = new Audio(url);
      audio.addEventListener('loadedmetadata', () => {
        audioFile.duration = audio.duration;
        setAudioFiles(prev => prev.map(f => f.id === audioFile.id ? audioFile : f));
      });

      setAudioFiles(prev => [...prev, audioFile]);
    });
  };

  const removeFile = (id: string) => {
    setAudioFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const updateFile = (id: string, updates: Partial<AudioFile>) => {
    setAudioFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const addTag = (id: string, tag: string) => {
    if (!tag.trim()) return;
    updateFile(id, {
      tags: [...(audioFiles.find(f => f.id === id)?.tags || []), tag.trim().toLowerCase()]
    });
  };

  const removeTag = (id: string, tagIndex: number) => {
    const file = audioFiles.find(f => f.id === id);
    if (file) {
      updateFile(id, {
        tags: file.tags.filter((_, index) => index !== tagIndex)
      });
    }
  };

  const uploadFiles = async () => {
    setIsUploading(true);
    
    for (const audioFile of audioFiles) {
      if (audioFile.status !== 'pending') continue;

      try {
        updateFile(audioFile.id, { status: 'uploading', uploadProgress: 0 });

        // Simulate upload progress
        for (let progress = 0; progress <= 100; progress += 10) {
          await new Promise(resolve => setTimeout(resolve, 200));
          updateFile(audioFile.id, { uploadProgress: progress });
        }

        updateFile(audioFile.id, { status: 'processing' });
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Make the actual API call to upload the file
        const formData = new FormData();
        formData.append('file', audioFile.file);
        formData.append('title', audioFile.title);
        formData.append('description', audioFile.description);
        formData.append('category', audioFile.category);
        formData.append('tags', JSON.stringify(audioFile.tags));
        formData.append('isPublic', audioFile.isPublic.toString());
        formData.append('isPremium', audioFile.isPremium.toString());

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Upload error:', response.status, errorData);
          throw new Error(`Upload failed: ${response.status}`);
        }

        const result = await response.json();
        console.log('Upload success:', result);

        updateFile(audioFile.id, { status: 'completed', uploadProgress: 100 });
      } catch (error) {
        updateFile(audioFile.id, { 
          status: 'error', 
          error: 'Upload failed. Please try again.' 
        });
      }
    }

    setIsUploading(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Upload Audio Files
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Upload and manage audio content for the platform.
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div className="bg-white shadow-xl rounded-2xl border border-gray-100">
        <div className="p-8">
          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 ${
              dragActive 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Upload className="h-8 w-8 text-white" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Drop your audio files here
                </h3>
                <p className="text-gray-600 mb-4">
                  or click to browse your computer
                </p>
                <p className="text-sm text-gray-500">
                  Supports MP3, WAV, FLAC, AAC, M4A, OGG • Max 100MB per file
                </p>
              </div>

              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-200"
              >
                <Upload className="h-5 w-5 mr-2" />
                Choose Files
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="audio/*"
              onChange={(e) => handleFiles(Array.from(e.target.files || []))}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* File List */}
      {audioFiles.length > 0 && (
        <div className="bg-white shadow-xl rounded-2xl border border-gray-100">
          <div className="px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                Files to Upload ({audioFiles.length})
              </h3>
              <Button
                onClick={uploadFiles}
                disabled={isUploading || audioFiles.every(f => f.status !== 'pending')}
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-6 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 disabled:opacity-50"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload All
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {audioFiles.map((audioFile) => (
              <div key={audioFile.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-start space-x-6">
                  {/* File Icon & Status */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <FileAudio className="h-8 w-8 text-white" />
                      </div>
                      {audioFile.status === 'completed' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                      {audioFile.status === 'error' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                          <AlertCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* File Details */}
                  <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Basic Info */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                          </label>
                          <Input
                            value={audioFile.title}
                            onChange={(e) => updateFile(audioFile.id, { title: e.target.value })}
                            className="w-full"
                            placeholder="Enter audio title"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            value={audioFile.description}
                            onChange={(e) => updateFile(audioFile.id, { description: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                            rows={3}
                            placeholder="Enter audio description"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                          </label>
                          <select
                            value={audioFile.category}
                            onChange={(e) => updateFile(audioFile.id, { category: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            {categories.map(category => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Advanced Options */}
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags
                          </label>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {audioFile.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                              >
                                {tag}
                                <button
                                  onClick={() => removeTag(audioFile.id, index)}
                                  className="ml-2 text-blue-600 hover:text-blue-800"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                          <div className="flex">
                            <Input
                              placeholder="Add tag and press Enter"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  addTag(audioFile.id, e.currentTarget.value);
                                  e.currentTarget.value = '';
                                }
                              }}
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id={`public-${audioFile.id}`}
                              checked={audioFile.isPublic}
                              onChange={(e) => updateFile(audioFile.id, { isPublic: e.target.checked })}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`public-${audioFile.id}`} className="flex items-center text-sm font-medium text-gray-700">
                              <Globe className="h-4 w-4 mr-2 text-green-500" />
                              Public (visible to all users)
                            </label>
                          </div>

                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id={`premium-${audioFile.id}`}
                              checked={audioFile.isPremium}
                              onChange={(e) => updateFile(audioFile.id, { isPremium: e.target.checked })}
                              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label htmlFor={`premium-${audioFile.id}`} className="flex items-center text-sm font-medium text-gray-700">
                              <Crown className="h-4 w-4 mr-2 text-yellow-500" />
                              Premium (requires subscription)
                            </label>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">File Info</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p>Size: {formatFileSize(audioFile.size)}</p>
                            <p>Format: {audioFile.format.toUpperCase()}</p>
                            {audioFile.duration && (
                              <p>Duration: {formatDuration(audioFile.duration)}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {audioFile.status !== 'pending' && (
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">
                            {audioFile.status === 'uploading' && 'Uploading...'}
                            {audioFile.status === 'processing' && 'Processing...'}
                            {audioFile.status === 'completed' && 'Upload Complete'}
                            {audioFile.status === 'error' && 'Upload Failed'}
                          </span>
                          <span className="text-sm text-gray-500">
                            {audioFile.uploadProgress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              audioFile.status === 'completed' ? 'bg-emerald-500' :
                              audioFile.status === 'error' ? 'bg-red-500' :
                              'bg-blue-500'
                            }`}
                            style={{ width: `${audioFile.uploadProgress}%` }}
                          />
                        </div>
                        {audioFile.error && (
                          <p className="text-sm text-red-600 mt-2">{audioFile.error}</p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFile(audioFile.id)}
                    className="flex-shrink-0 p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
