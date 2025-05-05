
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, FileImage, Download } from "lucide-react";

interface Report {
  id: string;
  title: string;
  date: string;
  type: string;
  format: string;
  hospital: string;
  description: string;
}

interface ReportTableProps {
  reports: Report[];
  onDownload: (reportId: string) => void;
}

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

export const ReportTable: React.FC<ReportTableProps> = ({ reports, onDownload }) => {
  return (
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
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8 border-white/10 bg-white/5 hover:bg-white/10"
                onClick={() => onDownload(report.id)}
              >
                <Download className="h-4 w-4 text-gray-300" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
