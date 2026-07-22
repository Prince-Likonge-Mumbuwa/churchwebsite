import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import imageCompression from 'browser-image-compression';
import { 
  Upload, Image, Video, LogOut, Trash2, X, FolderPlus, 
  Edit2, Camera, Film, Play, Eye, Link, Globe, CheckCircle,
  Loader2, Plus, AlertCircle, XCircle, Zap
} from 'lucide-react';

export interface PhotoCollection {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  photos: Photo[];
}

export interface Photo {
  id: string;
  url: string;
  title: string;
  description?: string;
  createdAt: Date;
  size?: number;
  compressedSize?: number;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  videoType: 'local' | 'link';
  createdAt: Date;
  size?: number;
  file?: File;
}

// Confirm Modal
const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  type = 'danger'
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning';
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0a1628] rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-white/5">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4
          ${type === 'danger' ? 'bg-red-500/10' : 'bg-[#f59e0b]/10'}`}>
          {type === 'danger' ? (
            <AlertCircle className="w-6 h-6 text-red-400" />
          ) : (
            <CheckCircle className="w-6 h-6 text-[#f59e0b]" />
          )}
        </div>
        <h3 className="text-lg font-semibold text-white text-center mb-2">{title}</h3>
        <p className="text-white/40 text-sm text-center mb-6">{message}</p>
        <div className="flex gap-3">
          <button 
            onClick={onClose} 
            className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl 
              transition-all text-sm"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl transition-all text-sm font-medium
              ${type === 'danger' 
                ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' 
                : 'bg-[#f59e0b] hover:bg-[#fbbf24] text-[#0a1628]'
              }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'photos' | 'videos'>('photos');
  
  // Photo states
  const [collections, setCollections] = useState<PhotoCollection[]>([]);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<PhotoCollection | null>(null);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [collectionDescription, setCollectionDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false);
  const [photoTitle, setPhotoTitle] = useState('');
  const [photoDescription, setPhotoDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [compressionProgress, setCompressionProgress] = useState(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const [uploadCancelled, setUploadCancelled] = useState(false);
  
  // Video states
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [videoSourceType, setVideoSourceType] = useState<'local' | 'link'>('link');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [localVideoFile, setLocalVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoStep, setVideoStep] = useState<'source' | 'details'>('source');
  
  // Delete confirm states
  const [deleteConfirm, setDeleteConfirm] = useState<{
    show: boolean;
    type?: 'collection' | 'photo' | 'video';
    collectionId?: string;
    photoId?: string;
    videoId?: string;
    title?: string;
    message?: string;
  }>({ show: false });

  // Cancel upload refs
  const uploadController = useRef<AbortController | null>(null);

  // PROPER COMPRESSION FUNCTION using browser-image-compression
  const compressImage = async (file: File): Promise<File> => {
    // If file is less than 2MB, skip compression
    if (file.size <= 2 * 1024 * 1024) {
      setCompressionProgress(100);
      return file;
    }

    setIsCompressing(true);
    setCompressionProgress(0);

    try {
      const options = {
        maxSizeMB: 1.5,          // Target size in MB
        maxWidthOrHeight: 1920,   // Max resolution
        useWebWorker: true,       // Use Web Worker for better performance
        onProgress: (progress: number) => {
          setCompressionProgress(Math.round(progress));
        },
        fileType: 'image/jpeg',
        initialQuality: 0.85,
      };

      const compressedFile = await imageCompression(file, options);
      setIsCompressing(false);
      setCompressionProgress(100);
      
      return compressedFile;
    } catch (error) {
      console.error('Compression error:', error);
      setIsCompressing(false);
      toast.error('Compression failed, using original file');
      return file; // Return original file if compression fails
    }
  };

  useEffect(() => {
    loadCollections();
    loadVideos();
  }, []);

  const loadCollections = () => {
    const savedCollections = localStorage.getItem('photo_collections');
    if (savedCollections) {
      const parsed = JSON.parse(savedCollections);
      const collectionsWithDates = parsed.map((collection: any) => ({
        ...collection,
        createdAt: new Date(collection.createdAt),
        photos: collection.photos.map((photo: any) => ({
          ...photo,
          createdAt: new Date(photo.createdAt)
        }))
      }));
      setCollections(collectionsWithDates);
    }
  };

  const loadVideos = () => {
    const savedVideos = localStorage.getItem('video_collections');
    if (savedVideos) {
      const parsed = JSON.parse(savedVideos);
      const videosWithDates = parsed.map((video: any) => ({
        ...video,
        createdAt: new Date(video.createdAt)
      }));
      setVideos(videosWithDates);
    }
  };

  const saveCollections = (updatedCollections: PhotoCollection[]) => {
    localStorage.setItem('photo_collections', JSON.stringify(updatedCollections));
    setCollections(updatedCollections);
  };

  const saveVideos = (updatedVideos: VideoItem[]) => {
    localStorage.setItem('video_collections', JSON.stringify(updatedVideos));
    setVideos(updatedVideos);
  };

  const getVideoMetadata = (url: string) => {
    const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&/?]+)/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      const videoId = youtubeMatch[1];
      return {
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      };
    }

    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return {
        embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
        thumbnail: `https://vumbnail.com/${vimeoMatch[1]}.jpg`
      };
    }

    return {
      embedUrl: url,
      thumbnail: '/api/placeholder/640/360'
    };
  };

  const handleCreateCollection = () => {
    if (!collectionTitle.trim()) {
      toast.error('Please enter a collection title');
      return;
    }

    const newCollection: PhotoCollection = {
      id: Date.now().toString(),
      title: collectionTitle,
      description: collectionDescription,
      createdAt: new Date(),
      photos: []
    };

    const updatedCollections = [newCollection, ...collections];
    saveCollections(updatedCollections);
    toast.success('Collection created');
    setShowCollectionModal(false);
    setCollectionTitle('');
    setCollectionDescription('');
  };

  const handleUpdateCollection = () => {
    if (!collectionTitle.trim() || !editingCollection) return;

    const updatedCollections = collections.map(collection =>
      collection.id === editingCollection.id
        ? { ...collection, title: collectionTitle, description: collectionDescription }
        : collection
    );

    saveCollections(updatedCollections);
    toast.success('Collection updated');
    setShowCollectionModal(false);
    setEditingCollection(null);
    setCollectionTitle('');
    setCollectionDescription('');
  };

  const handleDeleteCollection = (collectionId: string) => {
    const updatedCollections = collections.filter(c => c.id !== collectionId);
    saveCollections(updatedCollections);
    toast.success('Collection deleted');
    if (selectedCollection === collectionId) setSelectedCollection(null);
    setDeleteConfirm({ show: false });
  };

  const handlePhotoUpload = async () => {
    if (!selectedFile || !selectedCollection || !photoTitle.trim()) {
      toast.error('Please select a file and enter a title');
      return;
    }

    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setUploading(true);
    setCompressionProgress(0);
    setUploadCancelled(false);

    try {
      // Compress only if needed (file > 2MB)
      const compressedFile = await compressImage(selectedFile);
      
      if (uploadCancelled) {
        setUploading(false);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPhoto: Photo = {
          id: Date.now().toString() + Math.random(),
          url: reader.result as string,
          title: photoTitle,
          description: photoDescription,
          createdAt: new Date(),
          size: selectedFile.size,
          compressedSize: compressedFile.size
        };

        const updatedCollections = collections.map(collection =>
          collection.id === selectedCollection
            ? { ...collection, photos: [newPhoto, ...collection.photos] }
            : collection
        );

        saveCollections(updatedCollections);
        
        const sizeReduction = ((selectedFile.size - compressedFile.size) / 1024 / 1024);
        if (sizeReduction > 0.1) {
          toast.success(`Photo uploaded (saved ${sizeReduction.toFixed(1)} MB)`);
        } else {
          toast.success('Photo uploaded successfully');
        }
        
        setShowPhotoUploadModal(false);
        setPhotoTitle('');
        setPhotoDescription('');
        setSelectedFile(null);
        setUploading(false);
        setCompressionProgress(0);
        setIsCompressing(false);
      };

      reader.readAsDataURL(compressedFile);
    } catch (error) {
      toast.error('Failed to process image');
      setUploading(false);
      setCompressionProgress(0);
      setIsCompressing(false);
    }
  };

  const handleDeletePhoto = (collectionId: string, photoId: string) => {
    const updatedCollections = collections.map(collection =>
      collection.id === collectionId
        ? { ...collection, photos: collection.photos.filter(photo => photo.id !== photoId) }
        : collection
    );

    saveCollections(updatedCollections);
    toast.success('Photo deleted');
    setDeleteConfirm({ show: false });
  };

  const handleVideoUpload = async () => {
    if (!videoTitle.trim()) {
      toast.error('Please enter a video title');
      return;
    }

    if (videoSourceType === 'local' && !localVideoFile) {
      toast.error('Please select a video file');
      return;
    }

    if (videoSourceType === 'link' && !videoLink.trim()) {
      toast.error('Please enter a video link');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    uploadController.current = new AbortController();

    try {
      let finalVideoUrl = '';
      let thumbnail = '';

      if (videoSourceType === 'local' && localVideoFile) {
        if (localVideoFile.size > 100 * 1024 * 1024) {
          toast.error('Video size should be less than 100MB');
          setUploading(false);
          return;
        }

        const interval = setInterval(() => {
          if (uploadController.current?.signal.aborted) {
            clearInterval(interval);
            return;
          }
          setUploadProgress(prev => {
            if (prev >= 90) {
              clearInterval(interval);
              return 90;
            }
            return prev + 10;
          });
        }, 500);

        const reader = await new Promise<string>((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onloadend = () => {
            if (uploadController.current?.signal.aborted) {
              reject(new Error('Cancelled'));
              return;
            }
            resolve(fileReader.result as string);
          };
          fileReader.onerror = reject;
          fileReader.readAsDataURL(localVideoFile!);
        });

        if (uploadController.current?.signal.aborted) {
          clearInterval(interval);
          throw new Error('Cancelled');
        }

        finalVideoUrl = reader;
        thumbnail = '/api/placeholder/640/360';
        clearInterval(interval);
        setUploadProgress(100);
      } else {
        const metadata = getVideoMetadata(videoLink);
        finalVideoUrl = metadata.embedUrl;
        thumbnail = metadata.thumbnail;
        setUploadProgress(100);
      }

      const newVideo: VideoItem = {
        id: editingVideo?.id || Date.now().toString(),
        title: videoTitle,
        description: videoDescription,
        thumbnail: thumbnail,
        videoUrl: finalVideoUrl,
        videoType: videoSourceType,
        createdAt: new Date(),
        size: localVideoFile?.size,
        file: localVideoFile || undefined,
      };

      let updatedVideos;
      if (editingVideo) {
        updatedVideos = videos.map(v => v.id === editingVideo.id ? newVideo : v);
        toast.success('Video updated');
      } else {
        updatedVideos = [newVideo, ...videos];
        toast.success('Video added');
      }

      saveVideos(updatedVideos);
      setShowVideoModal(false);
      resetVideoForm();
    } catch (error) {
      if (error instanceof Error && error.message === 'Cancelled') {
        setUploading(false);
        setUploadProgress(0);
        return;
      }
      toast.error('Failed to upload video');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const handleDeleteVideo = (videoId: string) => {
    const updatedVideos = videos.filter(v => v.id !== videoId);
    saveVideos(updatedVideos);
    toast.success('Video deleted');
    setDeleteConfirm({ show: false });
  };

  const resetVideoForm = () => {
    setEditingVideo(null);
    setVideoSourceType('link');
    setVideoTitle('');
    setVideoDescription('');
    setVideoLink('');
    setLocalVideoFile(null);
    setUploadProgress(0);
    setVideoStep('source');
  };

  const handleSignOut = () => {
    signout();
    toast.success('Signed out');
    navigate('/');
  };

  const showDeleteConfirm = (type: 'collection' | 'photo' | 'video', data: any) => {
    const titles = {
      collection: 'Delete Collection',
      photo: 'Delete Photo',
      video: 'Delete Video'
    };
    const messages = {
      collection: 'This will permanently delete this collection and all its photos.',
      photo: 'This will permanently delete this photo.',
      video: 'This will permanently delete this video.'
    };

    setDeleteConfirm({
      show: true,
      type,
      ...data,
      title: titles[type],
      message: messages[type]
    });
  };

  const currentCollection = collections.find(c => c.id === selectedCollection);
  const totalPhotos = collections.reduce((acc, c) => acc + c.photos.length, 0);

  // Cancel upload
  const cancelUpload = () => {
    setUploadCancelled(true);
    setUploading(false);
    setCompressionProgress(0);
    setIsCompressing(false);
    toast.info('Upload cancelled');
  };

  return (
    <div className="min-h-screen bg-[#0a1628]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-semibold text-white">Media Library</h1>
            <p className="text-white/40 text-sm mt-0.5">Manage your photos and videos</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/30 text-sm">{user?.name}</span>
            <button
              onClick={handleSignOut}
              className="p-2 text-white/30 hover:text-white/50 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-white/5 mb-8">
          <button
            onClick={() => setActiveTab('photos')}
            className={`pb-3 text-sm font-medium transition-all ${
              activeTab === 'photos'
                ? 'text-[#f59e0b] border-b-2 border-[#f59e0b]'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            Photos ({totalPhotos})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`pb-3 text-sm font-medium transition-all ${
              activeTab === 'videos'
                ? 'text-[#f59e0b] border-b-2 border-[#f59e0b]'
                : 'text-white/40 hover:text-white/60'
            }`}
          >
            Videos ({videos.length})
          </button>
        </div>

        {/* Photos Section */}
        {activeTab === 'photos' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Collections Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/5">
                <button
                  onClick={() => {
                    setEditingCollection(null);
                    setCollectionTitle('');
                    setCollectionDescription('');
                    setShowCollectionModal(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 
                    bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 text-[#f59e0b] 
                    rounded-xl transition-all text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  New Collection
                </button>

                <div className="mt-4 space-y-1 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                  {collections.length === 0 ? (
                    <p className="text-white/20 text-sm text-center py-8">No collections yet</p>
                  ) : (
                    collections.map((collection) => (
                      <button
                        key={collection.id}
                        onClick={() => setSelectedCollection(collection.id)}
                        className={`w-full px-4 py-3 rounded-xl text-left transition-all ${
                          selectedCollection === collection.id
                            ? 'bg-[#f59e0b]/10 border border-[#f59e0b]/20'
                            : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">
                              {collection.title}
                            </p>
                            {collection.description && (
                              <p className="text-white/30 text-xs truncate">
                                {collection.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 ml-3">
                            <span className="text-white/20 text-xs">
                              {collection.photos.length}
                            </span>
                            <div className="flex gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditingCollection(collection);
                                  setCollectionTitle(collection.title);
                                  setCollectionDescription(collection.description || '');
                                  setShowCollectionModal(true);
                                }}
                                className="p-1 text-white/20 hover:text-white/40 transition-colors"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  showDeleteConfirm('collection', { collectionId: collection.id });
                                }}
                                className="p-1 text-white/20 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Photos Grid */}
            <div className="lg:col-span-3">
              {selectedCollection && currentCollection ? (
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-white">
                        {currentCollection.title}
                      </h2>
                      {currentCollection.description && (
                        <p className="text-white/40 text-sm">
                          {currentCollection.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => setShowPhotoUploadModal(true)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#f59e0b] 
                        text-[#0a1628] font-medium rounded-xl hover:bg-[#fbbf24] 
                        transition-all text-sm"
                    >
                      <Camera className="w-4 h-4" />
                      Add Photos
                    </button>
                  </div>

                  {currentCollection.photos.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                        <Camera className="w-8 h-8 text-white/20" />
                      </div>
                      <p className="text-white/30 text-sm">No photos in this collection</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {currentCollection.photos.map((photo) => (
                        <div key={photo.id} className="group relative aspect-square rounded-xl overflow-hidden bg-white/5">
                          <img 
                            src={photo.url} 
                            alt={photo.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent 
                            opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                              <p className="text-white text-sm font-medium truncate">{photo.title}</p>
                              {photo.description && (
                                <p className="text-white/60 text-xs truncate">{photo.description}</p>
                              )}
                              {photo.compressedSize && photo.size && (
                                <p className="text-white/30 text-xs mt-1">
                                  {photo.compressedSize < photo.size ? (
                                    <>↓ {((photo.size - photo.compressedSize) / 1024 / 1024).toFixed(1)} MB saved</>
                                  ) : (
                                    '✓ Optimized'
                                  )}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => showDeleteConfirm('photo', { 
                                collectionId: currentCollection.id, 
                                photoId: photo.id 
                              })}
                              className="absolute top-2 right-2 p-2 rounded-lg bg-black/50 
                                opacity-0 group-hover:opacity-100 transition-opacity 
                                hover:bg-red-500/50"
                            >
                              <Trash2 className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-16 text-center border border-white/5">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                    <FolderPlus className="w-10 h-10 text-white/10" />
                  </div>
                  <p className="text-white/30 text-sm">Select a collection to view photos</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Videos Section */}
        {activeTab === 'videos' && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Video Gallery</h2>
              <button
                onClick={() => {
                  resetVideoForm();
                  setShowVideoModal(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#f59e0b] 
                  text-[#0a1628] font-medium rounded-xl hover:bg-[#fbbf24] 
                  transition-all text-sm"
              >
                <Film className="w-4 h-4" />
                Add Video
              </button>
            </div>

            {videos.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-white/30 text-sm">No videos uploaded yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {videos.map((video) => (
                  <div key={video.id} className="group bg-white/5 rounded-xl overflow-hidden 
                    hover:bg-white/10 transition-all duration-300">
                    <div className="relative aspect-video bg-white/5">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center 
                        opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm 
                          flex items-center justify-center hover:bg-white/30 transition-all">
                          <Play className="w-5 h-5 text-white ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 rounded-lg 
                        text-white/60 text-xs flex items-center gap-1.5">
                        {video.videoType === 'local' ? (
                          <Upload className="w-3 h-3" />
                        ) : (
                          <Link className="w-3 h-3" />
                        )}
                        <span>{video.videoType === 'local' ? 'File' : 'Link'}</span>
                      </div>
                      <button
                        onClick={() => showDeleteConfirm('video', { videoId: video.id })}
                        className="absolute top-2 right-2 p-2 rounded-lg bg-black/50 
                          opacity-0 group-hover:opacity-100 transition-opacity 
                          hover:bg-red-500/50"
                      >
                        <Trash2 className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium truncate">{video.title}</h3>
                      {video.description && (
                        <p className="text-white/40 text-sm truncate mt-0.5">{video.description}</p>
                      )}
                      <div className="flex items-center gap-3 mt-2 text-xs text-white/20">
                        {video.size && (
                          <span>{(video.size / 1024 / 1024).toFixed(1)} MB</span>
                        )}
                        {video.size && <span>•</span>}
                        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Collection Modal */}
      {showCollectionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a1628] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/5">
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-white">
                {editingCollection ? 'Edit Collection' : 'New Collection'}
              </h3>
              <button 
                onClick={() => setShowCollectionModal(false)} 
                className="text-white/30 hover:text-white/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white/40 text-sm mb-1.5">Title</label>
                <input
                  type="text"
                  value={collectionTitle}
                  onChange={(e) => setCollectionTitle(e.target.value)}
                  placeholder="Collection name..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl 
                    text-white placeholder-white/20 focus:outline-none focus:border-[#f59e0b] 
                    transition-all"
                />
              </div>
              <div>
                <label className="block text-white/40 text-sm mb-1.5">Description</label>
                <textarea
                  value={collectionDescription}
                  onChange={(e) => setCollectionDescription(e.target.value)}
                  rows={2}
                  placeholder="Add a description..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl 
                    text-white placeholder-white/20 focus:outline-none focus:border-[#f59e0b] 
                    transition-all resize-none"
                />
              </div>
              <button
                onClick={editingCollection ? handleUpdateCollection : handleCreateCollection}
                className="w-full py-2.5 bg-[#f59e0b] text-[#0a1628] font-medium rounded-xl 
                  hover:bg-[#fbbf24] transition-all"
              >
                {editingCollection ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Upload Modal */}
      {showPhotoUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a1628] rounded-2xl max-w-md w-full p-6 shadow-2xl border border-white/5">
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-lg font-semibold text-white">Upload Photo</h3>
                <p className="text-white/30 text-sm">
                  {selectedFile && selectedFile.size > 2 * 1024 * 1024 ? (
                    <span className="text-[#f59e0b] flex items-center gap-1">
                      <Zap className="w-3 h-3" />
                      Will be compressed
                    </span>
                  ) : (
                    'Upload directly (under 2MB)'
                  )}
                </p>
              </div>
              <button 
                onClick={() => {
                  if (isCompressing || uploading) {
                    cancelUpload();
                  }
                  setShowPhotoUploadModal(false);
                }} 
                className="text-white/30 hover:text-white/50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-white/40 text-sm mb-1.5">Title</label>
                <input
                  type="text"
                  value={photoTitle}
                  onChange={(e) => setPhotoTitle(e.target.value)}
                  placeholder="Photo title..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl 
                    text-white placeholder-white/20 focus:outline-none focus:border-[#f59e0b] 
                    transition-all"
                />
              </div>
              <div>
                <label className="block text-white/40 text-sm mb-1.5">Description</label>
                <textarea
                  value={photoDescription}
                  onChange={(e) => setPhotoDescription(e.target.value)}
                  rows={2}
                  placeholder="Add a description..."
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl 
                    text-white placeholder-white/20 focus:outline-none focus:border-[#f59e0b] 
                    transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-white/40 text-sm mb-1.5">Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedFile(file);
                        setUploadCancelled(false);
                        setCompressionProgress(0);
                        setIsCompressing(false);
                      }
                    }}
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl 
                      text-white/60 focus:outline-none focus:border-[#f59e0b] transition-all
                      file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 
                      file:bg-[#f59e0b]/10 file:text-[#f59e0b] file:text-sm
                      hover:file:bg-[#f59e0b]/20"
                  />
                </div>
              </div>

              {/* File info and compression status */}
              {selectedFile && (
                <div className="bg-white/5 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/60 truncate">{selectedFile.name}</span>
                    <span className="text-white/30">
                      {(selectedFile.size / 1024 / 1024).toFixed(1)} MB
                    </span>
                  </div>
                  
                  {(isCompressing || compressionProgress > 0) && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#f59e0b] flex items-center gap-1">
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Compressing...
                        </span>
                        <span className="text-white/40">{compressionProgress}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                        <div 
                          className="bg-[#f59e0b] h-full transition-all duration-300"
                          style={{ width: `${compressionProgress}%` }}
                        />
                      </div>
                      <button
                        onClick={cancelUpload}
                        className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3" />
                        Cancel compression
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={handlePhotoUpload}
                disabled={uploading || !selectedFile || !photoTitle.trim()}
                className="w-full py-2.5 bg-[#f59e0b] text-[#0a1628] font-medium rounded-xl 
                  hover:bg-[#fbbf24] transition-all disabled:opacity-50 
                  disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    {isCompressing ? 'Compressing...' : 'Uploading...'}
                  </>
                ) : (
                  'Upload Photo'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Upload Modal - Same as before */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a1628] rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <div className={`flex-1 h-1 rounded-full transition-all ${
                videoStep === 'source' ? 'bg-[#f59e0b]' : 'bg-[#f59e0b]/30'
              }`} />
              <div className={`flex-1 h-1 rounded-full transition-all ${
                videoStep === 'details' ? 'bg-[#f59e0b]' : 'bg-white/10'
              }`} />
            </div>

            {videoStep === 'source' ? (
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-white">Add Video</h3>
                  <p className="text-white/30 text-sm">Choose how to add your video</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setVideoSourceType('link')}
                    className={`p-4 rounded-xl text-center transition-all border-2 ${
                      videoSourceType === 'link'
                        ? 'border-[#f59e0b] bg-[#f59e0b]/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Link className="w-6 h-6 mx-auto mb-2 text-white/40" />
                    <span className="text-white text-sm font-medium">Paste Link</span>
                    <p className="text-white/20 text-xs mt-1">YouTube, Vimeo, etc.</p>
                  </button>
                  <button
                    onClick={() => setVideoSourceType('local')}
                    className={`p-4 rounded-xl text-center transition-all border-2 ${
                      videoSourceType === 'local'
                        ? 'border-[#f59e0b] bg-[#f59e0b]/10'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <Upload className="w-6 h-6 mx-auto mb-2 text-white/40" />
                    <span className="text-white text-sm font-medium">Upload File</span>
                    <p className="text-white/20 text-xs mt-1">MP4, WebM, MOV</p>
                  </button>
                </div>

                {videoSourceType === 'link' ? (
                  <input
                    type="url"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                    placeholder="Paste video link..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl 
                      text-white placeholder-white/20 focus:outline-none focus:border-[#f59e0b] 
                      transition-all"
                  />
                ) : (
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center 
                    hover:border-white/20 transition-all">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setLocalVideoFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer block">
                      {localVideoFile ? (
                        <div>
                          <CheckCircle className="w-8 h-8 mx-auto text-[#f59e0b] mb-2" />
                          <p className="text-white text-sm font-medium">{localVideoFile.name}</p>
                          <p className="text-white/20 text-xs">
                            {(localVideoFile.size / 1024 / 1024).toFixed(1)} MB
                          </p>
                        </div>
                      ) : (
                        <div>
                          <Video className="w-10 h-10 mx-auto text-white/20 mb-3" />
                          <p className="text-white text-sm font-medium">Drop video here</p>
                          <p className="text-white/20 text-xs mt-1">or click to browse</p>
                        </div>
                      )}
                    </label>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (videoSourceType === 'link' && !videoLink.trim()) {
                      toast.error('Please paste a video link');
                      return;
                    }
                    if (videoSourceType === 'local' && !localVideoFile) {
                      toast.error('Please select a video file');
                      return;
                    }
                    setVideoStep('details');
                  }}
                  className="w-full py-2.5 bg-[#f59e0b] text-[#0a1628] font-medium rounded-xl 
                    hover:bg-[#fbbf24] transition-all"
                >
                  Continue
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Video Details</h3>
                    <p className="text-white/30 text-sm">Add title and description</p>
                  </div>
                  <button 
                    onClick={() => {
                      if (uploading) {
                        // Cancel video upload if in progress
                        if (uploadController.current) {
                          uploadController.current.abort();
                          setUploading(false);
                          setUploadProgress(0);
                          toast.info('Upload cancelled');
                        }
                      }
                      setShowVideoModal(false);
                    }} 
                    className="text-white/30 hover:text-white/50 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-white/40 text-sm mb-1.5">Title</label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    placeholder="Video title..."
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl 
                      text-white placeholder-white/20 focus:outline-none focus:border-[#f59e0b] 
                      transition-all"
                  />
                </div>

                <div>
                  <label className="block text-white/40 text-sm mb-1.5">Description</label>
                  <textarea
                    value={videoDescription}
                    onChange={(e) => setVideoDescription(e.target.value)}
                    rows={3}
                    placeholder="What's this video about?"
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl 
                      text-white placeholder-white/20 focus:outline-none focus:border-[#f59e0b] 
                      transition-all resize-none"
                  />
                </div>

                {uploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/40">Uploading...</span>
                      <span className="text-white/40">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                      <div 
                        className="bg-[#f59e0b] h-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <button
                      onClick={() => {
                        if (uploadController.current) {
                          uploadController.current.abort();
                          setUploading(false);
                          setUploadProgress(0);
                          toast.info('Upload cancelled');
                        }
                      }}
                      className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                    >
                      <XCircle className="w-3 h-3" />
                      Cancel upload
                    </button>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (uploading) {
                        if (uploadController.current) {
                          uploadController.current.abort();
                          setUploading(false);
                          setUploadProgress(0);
                          toast.info('Upload cancelled');
                        }
                      }
                      setVideoStep('source');
                    }}
                    className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl 
                      transition-all text-sm"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleVideoUpload}
                    disabled={uploading || !videoTitle.trim()}
                    className="flex-1 py-2.5 bg-[#f59e0b] text-[#0a1628] font-medium rounded-xl 
                      hover:bg-[#fbbf24] transition-all disabled:opacity-50 
                      disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      editingVideo ? 'Update' : 'Upload'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.show}
        onClose={() => setDeleteConfirm({ show: false })}
        onConfirm={() => {
          if (deleteConfirm.type === 'collection' && deleteConfirm.collectionId) {
            handleDeleteCollection(deleteConfirm.collectionId);
          } else if (deleteConfirm.type === 'photo' && deleteConfirm.collectionId && deleteConfirm.photoId) {
            handleDeletePhoto(deleteConfirm.collectionId, deleteConfirm.photoId);
          } else if (deleteConfirm.type === 'video' && deleteConfirm.videoId) {
            handleDeleteVideo(deleteConfirm.videoId);
          }
        }}
        title={deleteConfirm.title || 'Delete?'}
        message={deleteConfirm.message || 'This action cannot be undone.'}
        type="danger"
      />
    </div>
  );
};

export default Dashboard;