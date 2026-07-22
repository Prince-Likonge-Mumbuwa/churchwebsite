import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { Play, Eye, X, Youtube, Facebook, Video as VideoIcon, Globe } from "lucide-react";
import { VideoItem } from "./Dashboard";

export default function Videos() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideos();
  }, []);

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
    setLoading(false);
  };

  const categories = ["All", ...Array.from(new Set(videos.map(v => v.category)))];

  const filteredVideos = activeCategory === "All"
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const getVideoTypeIcon = (type: string, className = "w-5 h-5") => {
    switch(type) {
      case 'youtube': return <Youtube className={`${className} text-red-500`} />;
      case 'facebook': return <Facebook className={`${className} text-blue-500`} />;
      case 'vimeo': return <VideoIcon className={`${className} text-green-500`} />;
      case 'local': return <VideoIcon className={`${className} text-purple-500`} />;
      default: return <Globe className={`${className} text-gray-400`} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-escz-navy flex items-center justify-center">
        <div className="text-escz-cream">Loading videos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-escz-navy">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden pt-8">
        <div className="absolute inset-0 bg-gradient-to-br from-escz-gold/10 via-escz-navy to-escz-navy z-0" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-escz-cream mb-6">
            Videos
          </h1>
          <p className="text-xl text-escz-cream/90 max-w-2xl mx-auto">
            Watch inspiring stories of transformation and impact from our ministry
            across Zambia
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {videos.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-wrap gap-4 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-escz-orange to-escz-gold text-escz-navy"
                      : "bg-escz-navy/50 border border-escz-gray/20 text-escz-cream hover:border-escz-gold/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy/80 border-t border-escz-gray/20">
        <div className="max-w-6xl mx-auto">
          {videos.length === 0 ? (
            <div className="text-center py-12">
              <Play className="w-24 h-24 mx-auto text-escz-cream/20 mb-6" />
              <h2 className="text-2xl font-semibold text-escz-cream mb-2">No Videos Yet</h2>
              <p className="text-escz-cream/60">Check back soon for inspiring videos</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  className="bg-escz-navy/50 border border-escz-gray/20 rounded-2xl overflow-hidden backdrop-blur-sm hover:border-escz-orange/50 transition-all duration-300 group cursor-pointer"
                  onClick={() => setSelectedVideo(video)}
                >
                  {/* Thumbnail */}
                  <div className="relative overflow-hidden aspect-video bg-escz-navy/80">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-escz-orange/80 rounded-full flex items-center justify-center group-hover:bg-escz-gold transition-colors duration-300">
                        <Play className="w-8 h-8 text-escz-navy ml-1" />
                      </div>
                    </div>

                    {/* Video Source Badge */}
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur rounded-lg">
                      {getVideoTypeIcon(video.videoType, "w-3 h-3")}
                      <span className="text-white text-xs capitalize">{video.videoType}</span>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-escz-navy/80 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold text-escz-cream">
                      {video.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-escz-orange font-semibold text-sm mb-2">
                      {video.category}
                    </p>
                    <h3 className="text-xl font-bold text-escz-cream mb-3 group-hover:text-escz-gold transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-escz-cream/70 text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-escz-cream/60">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{video.views} views</span>
                      </div>
                      <span className="text-escz-orange font-semibold">
                        Watch Now →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-escz-navy/95 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 text-escz-cream hover:text-escz-orange transition-colors text-2xl z-10"
          >
            ✕
          </button>

          <div className="max-w-5xl w-full my-8">
            <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden">
              {selectedVideo.videoType === 'local' ? (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  className="w-full h-full"
                  poster={selectedVideo.thumbnail}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  width="100%"
                  height="100%"
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3 mb-2">
                <p className="text-escz-orange font-semibold">
                  {selectedVideo.category}
                </p>
                <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-lg">
                  {getVideoTypeIcon(selectedVideo.videoType, "w-4 h-4")}
                  <span className="text-escz-cream/70 text-sm capitalize">{selectedVideo.videoType}</span>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-escz-cream mb-4">
                {selectedVideo.title}
              </h2>
              <p className="text-escz-cream/80 text-lg mb-6">
                {selectedVideo.description}
              </p>
              <div className="flex items-center gap-6 text-escz-cream/60">
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span>{selectedVideo.views} views</span>
                </div>
                <div>{selectedVideo.duration}</div>
                {selectedVideo.size && (
                  <div>{(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      {videos.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-escz-navy border-t border-escz-gray/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-escz-cream mb-6">
              More Stories to Come
            </h2>
            <p className="text-xl text-escz-cream/80 mb-10">
              We're constantly documenting and sharing stories of transformation.
              Subscribe to stay updated on the latest videos from our ministry.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-escz-orange to-escz-gold text-escz-navy font-bold rounded-lg hover:shadow-2xl transition-shadow duration-300">
              Subscribe for Updates
            </button>
          </div>
        </section>
      )}
    </div>
  );
}