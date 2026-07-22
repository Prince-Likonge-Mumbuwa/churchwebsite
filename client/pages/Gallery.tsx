import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, FolderOpen } from "lucide-react";
import { PhotoCollection, Photo } from "./Dashboard"; // Import the types

export default function Gallery() {
  const [collections, setCollections] = useState<PhotoCollection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<PhotoCollection | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCollections();
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
    setLoading(false);
  };

  const handlePrevious = () => {
    if (selectedPhotoIndex !== null && selectedCollection) {
      const newIndex = selectedPhotoIndex === 0 
        ? selectedCollection.photos.length - 1 
        : selectedPhotoIndex - 1;
      setSelectedPhotoIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (selectedPhotoIndex !== null && selectedCollection) {
      const newIndex = selectedPhotoIndex === selectedCollection.photos.length - 1 
        ? 0 
        : selectedPhotoIndex + 1;
      setSelectedPhotoIndex(newIndex);
    }
  };

  // Get all photos for the "All Photos" view
  const allPhotos = collections.flatMap(collection => 
    collection.photos.map(photo => ({
      ...photo,
      collectionTitle: collection.title,
      collectionId: collection.id
    }))
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-escz-navy flex items-center justify-center">
        <div className="text-escz-cream">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-escz-navy">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[300px] flex items-center justify-center overflow-hidden pt-8">
        <div className="absolute inset-0 bg-gradient-to-br from-escz-orange/10 via-escz-navy to-escz-navy z-0" />
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold text-escz-cream mb-6">
            Our Gallery
          </h1>
          <p className="text-xl text-escz-cream/90 max-w-2xl mx-auto">
            Visual stories of transformation and community impact across Zambia
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      {!selectedCollection && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {collections.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="w-24 h-24 mx-auto text-escz-cream/20 mb-6" />
                <h2 className="text-2xl font-semibold text-escz-cream mb-2">No Collections Yet</h2>
                <p className="text-escz-cream/60">Check back soon for photos and updates</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-escz-cream mb-4">Photo Collections</h2>
                  <p className="text-escz-cream/70">Browse through our photo galleries</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {collections.map((collection) => (
                    <div
                      key={collection.id}
                      onClick={() => setSelectedCollection(collection)}
                      className="group cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-escz-gray/20 hover:border-escz-orange/50 transition-all duration-300 bg-white/5">
                        {collection.photos.length > 0 ? (
                          <img
                            src={collection.photos[0].url}
                            alt={collection.title}
                            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-64 flex items-center justify-center bg-escz-navy/50">
                            <FolderOpen className="w-16 h-16 text-escz-cream/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-escz-navy/90 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                          <h3 className="text-escz-cream font-bold text-xl mb-1">
                            {collection.title}
                          </h3>
                          <p className="text-escz-cream/80 text-sm mb-2">{collection.description}</p>
                          <p className="text-escz-orange text-sm">
                            {collection.photos.length} photo{collection.photos.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 text-center">
                        <h3 className="text-escz-cream font-semibold">{collection.title}</h3>
                        <p className="text-escz-cream/60 text-sm">{collection.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* Photos Grid for Selected Collection */}
      {selectedCollection && (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setSelectedCollection(null)}
              className="mb-8 flex items-center gap-2 text-escz-cream/70 hover:text-escz-cream transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Collections
            </button>

            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-escz-cream mb-4">{selectedCollection.title}</h2>
              <p className="text-escz-cream/70">{selectedCollection.description}</p>
              <p className="text-escz-cream/50 text-sm mt-2">
                {selectedCollection.photos.length} photo{selectedCollection.photos.length !== 1 ? 's' : ''}
              </p>
            </div>

            {selectedCollection.photos.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-escz-cream/60">No photos in this collection yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {selectedCollection.photos.map((photo, index) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhotoIndex(index)}
                    className="group relative overflow-hidden rounded-2xl border border-escz-gray/20 cursor-pointer hover:border-escz-orange/50 transition-all duration-300 aspect-video bg-white/5"
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-escz-navy/90 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <h3 className="text-escz-cream font-bold text-lg mb-1">{photo.title}</h3>
                      {photo.description && (
                        <p className="text-escz-cream/80 text-sm">{photo.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && selectedCollection && (
        <div className="fixed inset-0 bg-escz-navy/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-4 right-4 p-2 bg-escz-navy/50 hover:bg-escz-orange/30 rounded-lg transition-colors z-10"
          >
            <X className="w-6 h-6 text-escz-cream" />
          </button>

          <button
            onClick={handlePrevious}
            className="absolute left-4 p-2 bg-escz-navy/50 hover:bg-escz-orange/30 rounded-lg transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6 text-escz-cream" />
          </button>

          <div className="max-w-5xl w-full">
            <img
              src={selectedCollection.photos[selectedPhotoIndex].url}
              alt={selectedCollection.photos[selectedPhotoIndex].title}
              className="w-full h-auto rounded-2xl max-h-[70vh] object-contain"
            />
            <div className="mt-8 text-center">
              <h2 className="text-3xl font-bold text-escz-cream mb-2">
                {selectedCollection.photos[selectedPhotoIndex].title}
              </h2>
              {selectedCollection.photos[selectedPhotoIndex].description && (
                <p className="text-escz-cream/80 text-lg mb-4">
                  {selectedCollection.photos[selectedPhotoIndex].description}
                </p>
              )}
              <p className="text-escz-cream/60 text-sm">
                {selectedPhotoIndex + 1} of {selectedCollection.photos.length} • {selectedCollection.title}
              </p>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 p-2 bg-escz-navy/50 hover:bg-escz-orange/30 rounded-lg transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6 text-escz-cream" />
          </button>
        </div>
      )}
    </div>
  );
}