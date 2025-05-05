
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  notes?: string;
}

interface AllergiesProps {
  allergies: Allergy[];
}

export const Allergies: React.FC<AllergiesProps> = ({ allergies }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Mild': return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'Moderate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20';
      case 'Severe': return 'bg-red-500/20 text-red-400 border-red-500/20';
      default: return 'bg-white/5 text-white border-white/20';
    }
  };

  return (
    <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <Filter className="h-5 w-5 text-brand-green" />
          Allergies
        </CardTitle>
      </CardHeader>
      <CardContent>
        {allergies.length === 0 ? (
          <p className="text-gray-400">No allergies on record</p>
        ) : (
          <div className="space-y-4">
            {allergies.map((allergy) => (
              <div key={allergy.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{allergy.allergen}</h4>
                  <Badge 
                    variant="outline" 
                    className={getSeverityColor(allergy.severity)}
                  >
                    {allergy.severity}
                  </Badge>
                </div>
                <p className="text-gray-300 mb-1">Reaction: {allergy.reaction}</p>
                {allergy.notes && <p className="text-gray-400 text-sm">{allergy.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
