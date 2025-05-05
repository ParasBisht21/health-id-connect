
import React, { useState, useMemo } from 'react';
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { Upload } from "lucide-react";
import { ReportTable } from '@/components/reports/ReportTable';
import { ReportUploadForm } from '@/components/reports/ReportUploadForm';
import { AboutReports } from '@/components/reports/AboutReports';
import { ReportFilters } from '@/components/reports/ReportFilters';
import { toast } from "@/components/ui/sonner";

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
  },
  {
    id: "4",
    title: "MRI Results",
    date: "2025-03-28",
    type: "Radiology",
    format: "pdf",
    hospital: "Metro General Hospital",
    description: "Brain MRI scan results"
  },
  {
    id: "5",
    title: "Prescription",
    date: "2025-04-15",
    type: "Medication",
    format: "pdf",
    hospital: "City Medical Center",
    description: "Monthly prescription for hypertension medications"
  }
];

const Reports = () => {
  const [allReports] = useState(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  
  // Extract unique report types for the filter dropdown
  const reportTypes = useMemo(() => {
    const types = allReports.map(report => report.type);
    return [...new Set(types)];
  }, [allReports]);

  // Filter reports based on search query and selected type
  const filteredReports = useMemo(() => {
    return allReports.filter(report => {
      const matchesSearch = 
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.hospital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesType = selectedType === 'all' || report.type === selectedType;
      
      return matchesSearch && matchesType;
    });
  }, [allReports, searchQuery, selectedType]);

  // Handle report download
  const handleDownloadReport = (reportId: string) => {
    const report = allReports.find(r => r.id === reportId);
    if (report) {
      toast.success(`Downloading ${report.title}`, {
        description: "Your report will be downloaded shortly."
      });
    }
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Medical Reports</h1>
        <p className="text-gray-400">View, upload and manage your medical records</p>
      </header>

      {/* Upload Button, Search, Filter and Reports Table */}
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
              <ReportUploadForm />
            </SheetContent>
          </Sheet>
        </div>

        {/* Search and Filters */}
        <ReportFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          reportTypes={reportTypes}
        />

        <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
          <CardContent className="p-0">
            <ReportTable 
              reports={filteredReports} 
              onDownload={handleDownloadReport}
            />
          </CardContent>
        </Card>

        {filteredReports.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400">No reports matching your search criteria</p>
          </div>
        )}

        <AboutReports />
      </div>
    </div>
  );
};

export default Reports;
