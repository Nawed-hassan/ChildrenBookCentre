import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { GalleryImage } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryModalProps {
  image: GalleryImage | null;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-hidden relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="absolute top-4 right-4 bg-white/80 rounded-full p-1 hover:bg-white transition-colors z-10"
            onClick={onClose}
          >
            <X size={24} className="text-accent-950" />
          </button>
          
          <div className="max-h-[70vh] overflow-hidden">
            <img src={image.image} alt={image.title} className="w-full h-full object-contain" />
          </div>
          
          <div className="p-6">
            <h3 className="text-2xl font-serif font-semibold mb-2">{image.title}</h3>
            <div className="flex justify-between text-sm text-accent-700 mb-3">
              <span>{image.category}</span>
              <span>{new Date(image.date).toLocaleDateString('en-US', { 
                month: 'long', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
            </div>
            <p className="text-accent-800">{image.description}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryModal;