
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, AlertCircle } from "lucide-react";
import { toast } from "@/components/ui/sonner";

// Maximum file size in bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;
// Allowed file types
const ALLOWED_FILE_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];

export const ReportUploadForm = () => {
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size
      if (file.size > MAX_FILE_SIZE) {
        setFileError(`File size exceeds maximum limit (10MB). Current size: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
        return;
      }
      
      // Check file type
      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setFileError(`File type not supported. Please upload PDF, JPG or PNG files only.`);
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (fileError) {
      toast.error("Please fix file errors before uploading", {
        description: fileError
      });
      return;
    }
    
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    
    // In a real app, this would upload the file and save metadata
    toast.success("Report uploaded successfully", {
      description: `${uploadTitle} has been securely encrypted and stored.`
    });
  };

  return (
    <form onSubmit={handleUploadSubmit} className="space-y-6 mt-6">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-gray-200">Report Title</Label>
        <Input 
          id="title" 
          placeholder="e.g., Blood Test Results" 
          className="bg-white/5 border-white/10 text-white"
          value={uploadTitle}
          onChange={(e) => setUploadTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type" className="text-gray-200">Report Type</Label>
        <Input 
          id="type" 
          placeholder="e.g., Laboratory, Radiology, Prescription" 
          className="bg-white/5 border-white/10 text-white"
          value={uploadType}
          onChange={(e) => setUploadType(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-gray-200">Description</Label>
        <Textarea 
          id="description" 
          placeholder="Brief description of the report" 
          className="bg-white/5 border-white/10 text-white"
          value={uploadDescription}
          onChange={(e) => setUploadDescription(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="file" className="text-gray-200">Report File</Label>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-white/10 hover:border-white/30 bg-white/5">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-gray-400" />
              <p className="mb-2 text-sm text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PDF, JPG, PNG (MAX. 10MB)</p>
            </div>
            <Input 
              id="file" 
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
              required
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </label>
        </div>
        {selectedFile && !fileError && (
          <p className="text-sm text-emerald-400 mt-2">
            Selected file: {selectedFile.name}
          </p>
        )}
        {fileError && (
          <div className="flex items-center mt-2">
            <AlertCircle className="h-4 w-4 text-red-400 mr-2" />
            <p className="text-sm text-red-400">{fileError}</p>
          </div>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-brand-green hover:bg-brand-green/90"
        disabled={!!fileError}
      >
        Upload Report
      </Button>
    </form>
  );
};
