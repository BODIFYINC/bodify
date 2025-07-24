
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trash2, Camera, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';
import FileUpload from '@/components/FileUpload';

interface ProgressPhoto {
  id: string;
  date: string;
  frontImage: string;
  sideImage: string;
  backImage: string;
  weight?: number;
  notes?: string;
}

const Progress = () => {
  const [photos, setPhotos] = useState<ProgressPhoto[]>([]);
  const [currentUpload, setCurrentUpload] = useState({
    frontImage: '',
    sideImage: '',
    backImage: '',
    weight: '',
    notes: ''
  });

  useEffect(() => {
    const savedPhotos = localStorage.getItem('progressPhotos');
    if (savedPhotos) {
      setPhotos(JSON.parse(savedPhotos));
    }
  }, []);

  const handleFileSelect = (file: File, type: 'front' | 'side' | 'back') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCurrentUpload(prev => ({
        ...prev,
        [`${type}Image`]: result
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProgress = () => {
    if (!currentUpload.frontImage || !currentUpload.sideImage || !currentUpload.backImage) {
      toast({
        title: "Missing Photos",
        description: "Please upload all three photos (front, side, back)",
        variant: "destructive"
      });
      return;
    }

    const newPhoto: ProgressPhoto = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      frontImage: currentUpload.frontImage,
      sideImage: currentUpload.sideImage,
      backImage: currentUpload.backImage,
      weight: currentUpload.weight ? parseFloat(currentUpload.weight) : undefined,
      notes: currentUpload.notes
    };
    
    const updatedPhotos = [newPhoto, ...photos];
    setPhotos(updatedPhotos);
    localStorage.setItem('progressPhotos', JSON.stringify(updatedPhotos));
    
    // Track progress activity
    const today = new Date().toISOString().split('T')[0];
    const activityData = JSON.parse(localStorage.getItem('userActivity') || '{}');
    activityData[today] = { ...activityData[today], progress: true };
    localStorage.setItem('userActivity', JSON.stringify(activityData));
    
    setCurrentUpload({
      frontImage: '',
      sideImage: '',
      backImage: '',
      weight: '',
      notes: ''
    });
    
    toast({
      title: "Progress Saved!",
      description: "Your progress photos have been saved successfully!"
    });
  };

  const handleDeletePhoto = (id: string) => {
    const updatedPhotos = photos.filter(photo => photo.id !== id);
    setPhotos(updatedPhotos);
    localStorage.setItem('progressPhotos', JSON.stringify(updatedPhotos));
    toast({
      title: "Photo Deleted",
      description: "Progress photo has been removed."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-bodify-dark to-bodify-darker text-white">
      <div className="container mx-auto px-6 max-w-6xl py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Progress Tracker</h1>
              <p className="text-white/70 text-lg">Track your transformation journey with photos</p>
            </div>
            <Link to="/dashboard">
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                <ArrowLeft size={20} className="mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Upload New Progress Photos */}
          <Card className="glassmorphism border-0 mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Camera className="mr-2 text-bodify-orange" />
                Add New Progress Photos
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <Label className="text-sm font-medium mb-2 block text-white/70">Front View</Label>
                  <FileUpload 
                    onFileSelect={handleFileSelect}
                    type="front"
                    currentImage={currentUpload.frontImage}
                  />
                </div>
                <div className="text-center">
                  <Label className="text-sm font-medium mb-2 block text-white/70">Side View</Label>
                  <FileUpload 
                    onFileSelect={handleFileSelect}
                    type="side"
                    currentImage={currentUpload.sideImage}
                  />
                </div>
                <div className="text-center">
                  <Label className="text-sm font-medium mb-2 block text-white/70">Back View</Label>
                  <FileUpload 
                    onFileSelect={handleFileSelect}
                    type="back"
                    currentImage={currentUpload.backImage}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <Label htmlFor="weight" className="text-white mb-2 block">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={currentUpload.weight}
                    onChange={(e) => setCurrentUpload(prev => ({...prev, weight: e.target.value}))}
                    placeholder="Enter your current weight"
                    className="bg-white/10 border-white/30 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="notes" className="text-white mb-2 block">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={currentUpload.notes}
                    onChange={(e) => setCurrentUpload(prev => ({...prev, notes: e.target.value}))}
                    placeholder="How are you feeling? Any observations?"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/50"
                  />
                </div>
              </div>

              <Button 
                onClick={handleSaveProgress}
                className="bg-bodify-gradient hover:opacity-90 transition-all w-full"
              >
                Save Progress Photos
              </Button>
            </CardContent>
          </Card>

          {/* Progress History */}
          {photos.length === 0 ? (
            <Card className="glassmorphism border-0">
              <CardContent className="p-12 text-center">
                <Camera size={64} className="mx-auto mb-4 text-white/50" />
                <h3 className="text-xl font-bold mb-2">No Progress Photos Yet</h3>
                <p className="text-white/70">Start tracking your transformation by uploading your first set of photos above</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="glassmorphism border-0 overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <Calendar size={20} className="text-bodify-orange" />
                          <div>
                            <h3 className="text-lg font-bold">{new Date(photo.date).toLocaleDateString()}</h3>
                            {photo.weight && (
                              <p className="text-white/70">Weight: {photo.weight} kg</p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeletePhoto(photo.id)}
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div className="text-center">
                          <h4 className="text-sm font-medium mb-2 text-white/70">Front View</h4>
                          <img 
                            src={photo.frontImage} 
                            alt="Front view"
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                          />
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm font-medium mb-2 text-white/70">Side View</h4>
                          <img 
                            src={photo.sideImage} 
                            alt="Side view"
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                          />
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm font-medium mb-2 text-white/70">Back View</h4>
                          <img 
                            src={photo.backImage} 
                            alt="Back view"
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                          />
                        </div>
                      </div>

                      {photo.notes && (
                        <div className="bg-white/10 rounded-lg p-4">
                          <p className="text-white/90">{photo.notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Progress;
