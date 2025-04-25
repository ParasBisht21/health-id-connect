
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

export const ReportUploadForm = () => {
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would upload the file and save metadata
    alert("File upload functionality will be implemented with backend integration");
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
            />
          </label>
        </div>
        {selectedFile && (
          <p className="text-sm text-emerald-400 mt-2">
            Selected file: {selectedFile.name}
          </p>
        )}
      </div>

      <Button 
        type="submit" 
        className="w-full bg-brand-green hover:bg-brand-green/90"
      >
        Upload Report
      </Button>
    </form>
  );
};
