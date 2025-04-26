
import React from 'react';
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";

interface ReportFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  reportTypes: string[];
}

export const ReportFilters: React.FC<ReportFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  reportTypes
}) => {
  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search reports..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-white/5 border-white/10 text-white"
        />
      </div>
      
      <div className="w-full md:w-64">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2 text-gray-400" />
              <SelectValue placeholder="Filter by type" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-black/90 border-white/10 text-white">
            <SelectItem value="all">All Types</SelectItem>
            {reportTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
