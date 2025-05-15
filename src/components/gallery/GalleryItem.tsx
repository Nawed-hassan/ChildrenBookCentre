import React from 'react';
import { GalleryImage } from '../../types';
import { motion } from 'framer-motion';

interface GalleryItemProps {
  image: GalleryImage;
  onClick: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, onClick }) => {
  return (
    <motion.div 
      className="relative overflow-hidden rounded-lg cursor-pointer h-64"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <img 
        src={image.image} 
        alt={image.title} 
        className="w-full h-full object-cover transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white font-semibold text-lg font-serif">{image.title}</h3>
        <p className="text-white/80 text-sm">{image.category}</p>
      </div>
    </motion.div>
  );
};

export default GalleryItem;