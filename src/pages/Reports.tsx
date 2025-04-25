import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, FileImage, Upload, Download } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Mock data for medical reports
const mockReports = [
  {
    id: "1",
    title: "Blood Test Results",
    date: "2025-04-20",
    type: "Laboratory",
    format: "pdf",
    hospital: "Metro General Hospital",
    description: "Complete blood count and metabolic panel"
  },
  {
    id: "2",
    title: "X-Ray Report",
    date: "2025-03-15",
    type: "Radiology",
    format: "image",
    hospital: "City Medical Center",
    description: "Chest X-ray examination"
  },
  {
    id: "3",
    title: "Annual Physical Exam",
    date: "2025-02-10",
    type: "General",
    format: "pdf",
    hospital: "Family Health Practice",
    description: "Yearly comprehensive physical examination"
  }
];

const Reports = () => {
  const [reports] = useState(mockReports);
  const [uploadDescription, setUploadDescription] = useState('');
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadType, setUploadType] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const getFileIcon = (format: string) => {
    switch (format) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'image':
        return <FileImage className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

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
    <div className="min-h-screen bg-background p-6">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Medical Reports</h1>
        <p className="text-gray-400">View, upload and manage your medical records</p>
      </header>

      {/* Upload Button and Reports Table */}
      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-white">Your Reports</h2>
          
          {/* Upload Report Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-brand-green hover:bg-brand-green/90">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Report
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-black/90 border-border/10 backdrop-blur-xl text-white">
              <SheetHeader>
                <SheetTitle className="text-white">Upload Medical Report</SheetTitle>
                <SheetDescription className="text-gray-400">
                  Upload your medical reports, test results, or prescriptions.
                </SheetDescription>
              </SheetHeader>

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
            </SheetContent>
          </Sheet>
        </div>

        <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-white/5 border-white/10">
                  <TableHead className="text-gray-400">Report</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Hospital</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-white/5 border-white/10">
                    <TableCell className="font-medium text-white flex items-center gap-2">
                      {getFileIcon(report.format)}
                      {report.title}
                    </TableCell>
                    <TableCell className="text-gray-300">{report.date}</TableCell>
                    <TableCell className="text-gray-300">{report.type}</TableCell>
                    <TableCell className="text-gray-300">{report.hospital}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="icon" className="h-8 w-8 border-white/10 bg-white/5 hover:bg-white/10">
                        <Download className="h-4 w-4 text-gray-300" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Report Details Section */}
        <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-white">About Your Reports</CardTitle>
            <CardDescription className="text-gray-400">
              Understanding your medical documentation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <p>
              Your medical reports are securely stored and can only be accessed by you and the healthcare providers you authorize.
            </p>
            <p>
              All reports are categorized by type, making it easy to find specific documents when needed.
            </p>
            <p>
              You can download any report for offline access or to share with other healthcare professionals.
            </p>
          </CardContent>
          <CardFooter className="border-t border-white/10 pt-6">
            <p className="text-sm text-gray-400">
              For assistance with report interpretation, please consult with your healthcare provider.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
