
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

interface Condition {
  id: string;
  name: string;
  diagnosedDate: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  status: 'Active' | 'In remission' | 'Resolved';
}

interface MedicalConditionsProps {
  conditions: Condition[];
}

export const MedicalConditions: React.FC<MedicalConditionsProps> = ({ conditions }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mild': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'Moderate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      case 'Severe': return 'bg-red-500/20 text-red-400 border-red-500/20';
      default: return 'bg-white/5 text-white border-white/20';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
      case 'In remission': return 'bg-purple-500/20 text-purple-400 border-purple-500/20';
      case 'Resolved': return 'bg-green-500/20 text-green-400 border-green-500/20';
      default: return 'bg-white/5 text-white border-white/20';
    }
  };

  return (
    <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <FileText className="h-5 w-5 text-brand-green" />
          Medical Conditions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {conditions.length === 0 ? (
          <p className="text-gray-400">No medical conditions on record</p>
        ) : (
          <div className="space-y-4">
            {conditions.map((condition) => (
              <div key={condition.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{condition.name}</h4>
                  <p className="text-gray-400 text-sm">Diagnosed: {condition.diagnosedDate}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge 
                    variant="outline" 
                    className={getSeverityColor(condition.severity)}
                  >
                    {condition.severity}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className={getStatusColor(condition.status)}
                  >
                    {condition.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
