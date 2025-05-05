
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, CalendarCheck, User } from "lucide-react";

interface PatientInfoProps {
  patient: {
    name: string;
    dateOfBirth: string;
    gender: string;
    bloodType: string;
    height: string;
    weight: string;
    lastCheckup: string;
  };
}

export const PatientInfo: React.FC<PatientInfoProps> = ({ patient }) => {
  return (
    <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
          <User className="h-5 w-5 text-brand-green" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Full Name</p>
              <p className="text-white text-lg font-medium">{patient.name}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Date of Birth</p>
              <p className="text-white flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                {patient.dateOfBirth}
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Gender</p>
              <p className="text-white">{patient.gender}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 text-sm">Blood Type</p>
              <Badge variant="outline" className="mt-1 text-white border-white/20 bg-white/5">
                {patient.bloodType}
              </Badge>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Height / Weight</p>
              <p className="text-white">{patient.height} / {patient.weight}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Last Check-up</p>
              <p className="text-white flex items-center gap-2">
                <CalendarCheck className="h-4 w-4 text-gray-400" />
                {patient.lastCheckup}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
