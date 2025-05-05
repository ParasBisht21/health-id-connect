
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
}

interface MedicationsProps {
  medications: Medication[];
}

export const Medications: React.FC<MedicationsProps> = ({ medications }) => {
  return (
    <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-brand-green" />
          Medications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {medications.length === 0 ? (
          <p className="text-gray-400">No medications on record</p>
        ) : (
          <div className="space-y-4">
            {medications.map((medication) => (
              <div key={medication.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h4 className="text-white font-medium">{medication.name}</h4>
                  <p className="text-gray-400 text-sm">
                    {medication.startDate} {medication.endDate ? `- ${medication.endDate}` : '(Current)'}
                  </p>
                </div>
                <p className="text-gray-300 mb-1">Dosage: <span className="text-white">{medication.dosage}</span></p>
                <p className="text-gray-300 mb-1">Frequency: <span className="text-white">{medication.frequency}</span></p>
                <p className="text-gray-400 text-sm">Prescribed by: {medication.prescribedBy}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
