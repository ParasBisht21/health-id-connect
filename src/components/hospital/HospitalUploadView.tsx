
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Upload } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export const HospitalUploadView: React.FC = () => {
  const [searchHealthId, setSearchHealthId] = useState('');
  const [patientFound, setPatientFound] = useState<boolean | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [reportType, setReportType] = useState('');
  
  // Mock patient data - in a real app this would come from API
  const mockPatient = {
    name: "Jane Smith",
    healthId: "OH-12345678",
    dateOfBirth: "May 15, 1985"
  };
  
  const handleSearchPatient = () => {
    // Mock search - in real app this would call an API
    if (searchHealthId === mockPatient.healthId || searchHealthId === "OH-12345678") {
      setPatientFound(true);
      toast.success("Patient found", {
        description: "Patient record has been found in the system."
      });
    } else {
      setPatientFound(false);
      toast.error("Patient not found", {
        description: "Please verify the Health ID and try again."
      });
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleUpload = () => {
    // In a real app, this would upload to Firebase/AWS
    if (!selectedFile || !reportType) {
      toast.error("Missing information", {
        description: "Please select a file and report type."
      });
      return;
    }
    
    toast.success("Report uploaded successfully", {
      description: `${reportType} has been uploaded for ${mockPatient.name}.`
    });
    
    // Reset form
    setSelectedFile(null);
    setReportType('');
  };
  
  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Find Patient by Health ID</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Enter Health ID (e.g., OH-12345678)"
                value={searchHealthId}
                onChange={(e) => setSearchHealthId(e.target.value)}
                className="bg-white/5 border-white/10 text-white pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Button 
              onClick={handleSearchPatient}
              className="bg-brand-green hover:bg-brand-green/90"
            >
              Search
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {patientFound && (
        <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Upload Report for Patient</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <p className="text-gray-400 text-sm">Patient Information</p>
              <p className="text-white text-lg font-medium">{mockPatient.name}</p>
              <div className="flex justify-between mt-2">
                <p className="text-gray-300">Health ID: {mockPatient.healthId}</p>
                <p className="text-gray-300">DOB: {mockPatient.dateOfBirth}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="reportType" className="text-gray-200">Report Type</Label>
                <Input 
                  id="reportType" 
                  placeholder="e.g., Blood Test, X-Ray, Prescription"
                  className="bg-white/5 border-white/10 text-white"
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                />
              </div>
              
              <div>
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
                onClick={handleUpload}
                className="w-full bg-brand-green hover:bg-brand-green/90"
                disabled={!selectedFile || !reportType}
              >
                Upload Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {patientFound === false && (
        <Card className="bg-red-500/10 border-red-500/20 backdrop-blur-xl">
          <CardContent className="p-4">
            <p className="text-red-400">Patient not found with the provided Health ID.</p>
            <p className="text-gray-400 text-sm mt-1">Please verify the ID and try again or contact support if you believe this is an error.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
