
import React from 'react';
import { PatientInfo } from '@/components/profile/PatientInfo';
import { MedicalConditions } from '@/components/profile/MedicalConditions';
import { Allergies } from '@/components/profile/Allergies';
import { Medications } from '@/components/profile/Medications';

// Mock data for patient profile
const patientData = {
  name: "Jane Smith",
  dateOfBirth: "May 15, 1985",
  gender: "Female",
  bloodType: "O+",
  height: "5'6\" (168 cm)",
  weight: "145 lbs (66 kg)",
  lastCheckup: "March 10, 2025"
};

const medicalConditions = [
  {
    id: "1",
    name: "Asthma",
    diagnosedDate: "January 2018",
    severity: "Moderate" as const,
    status: "Active" as const
  },
  {
    id: "2",
    name: "Hypertension",
    diagnosedDate: "March 2022",
    severity: "Mild" as const,
    status: "Active" as const
  }
];

const allergies = [
  {
    id: "1",
    allergen: "Penicillin",
    reaction: "Hives, difficulty breathing",
    severity: "Severe" as const,
    notes: "Requires immediate medical attention if exposed"
  },
  {
    id: "2",
    allergen: "Peanuts",
    reaction: "Swelling, itchiness",
    severity: "Moderate" as const
  },
  {
    id: "3",
    allergen: "Dust mites",
    reaction: "Sneezing, watery eyes",
    severity: "Mild" as const
  }
];

const medications = [
  {
    id: "1",
    name: "Albuterol Inhaler",
    dosage: "2 puffs",
    frequency: "As needed for asthma symptoms",
    startDate: "January 2018",
    prescribedBy: "Dr. Robert Chen"
  },
  {
    id: "2",
    name: "Lisinopril",
    dosage: "10 mg",
    frequency: "Once daily",
    startDate: "March 2022",
    prescribedBy: "Dr. Susan Wong"
  },
  {
    id: "3",
    name: "Vitamin D Supplement",
    dosage: "2000 IU",
    frequency: "Once daily",
    startDate: "December 2024",
    prescribedBy: "Dr. Susan Wong"
  }
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Patient Profile</h1>
        <p className="text-gray-400">View and manage your personal health information</p>
      </header>

      {/* Profile Content */}
      <div className="grid grid-cols-1 gap-6">
        <PatientInfo patient={patientData} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Allergies allergies={allergies} />
          <MedicalConditions conditions={medicalConditions} />
        </div>
        
        <Medications medications={medications} />
      </div>
    </div>
  );
};

export default Profile;
