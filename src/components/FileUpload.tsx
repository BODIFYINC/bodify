
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File, type: 'front' | 'side' | 'back') => void;
  type: 'front' | 'side' | 'back';
  currentImage?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, type, currentImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file, type);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {currentImage ? (
        <div className="relative group cursor-pointer" onClick={handleClick}>
          <img 
            src={currentImage} 
            alt={`${type} view`}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
            <Camera size={32} className="text-white" />
          </div>
        </div>
      ) : (
        <Button
          onClick={handleClick}
          variant="outline"
          className="w-full h-64 border-dashed border-2 border-white/30 hover:border-white/50 bg-white/5 hover:bg-white/10"
        >
          <div className="flex flex-col items-center space-y-2">
            <Upload size={32} className="text-white/70" />
            <span className="text-white/70">Upload {type} photo</span>
          </div>
        </Button>
      )}
    </div>
  );
};

export default FileUpload;
