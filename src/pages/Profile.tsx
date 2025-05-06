import React, { useEffect, useState } from 'react';
import { PatientInfo } from '@/components/profile/PatientInfo';
import { MedicalConditions } from '@/components/profile/MedicalConditions';
import { Allergies } from '@/components/profile/Allergies';
import { Medications } from '@/components/profile/Medications';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from '@/components/auth/AuthContext';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

// Types for our data
interface PatientData {
  name: string;
  dateOfBirth?: string;
  gender?: string;
  bloodType?: string;
  height?: string;
  weight?: string;
  lastCheckup?: string;
}

interface MedicalCondition {
  id: string;
  name: string;
  diagnosedDate: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  status: 'Active' | 'In remission' | 'Resolved';
}

interface Allergy {
  id: string;
  allergen: string;
  reaction: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  notes?: string;
}

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
}

const Profile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const [medicalConditions, setMedicalConditions] = useState<MedicalCondition[]>([]);
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [medications, setMedications] = useState<Medication[]>([]);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        if (profileData) {
          setPatientData({
            name: `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim(),
            // Other fields would come from additional user metadata
          });
        }

        // Fetch medical conditions
        const { data: conditionsData, error: conditionsError } = await supabase
          .from('medical_conditions')
          .select('*')
          .eq('user_id', user.id);

        if (conditionsError) throw conditionsError;

        if (conditionsData) {
          setMedicalConditions(conditionsData.map(condition => ({
            id: condition.id,
            name: condition.name,
            diagnosedDate: condition.diagnosed_date ? new Date(condition.diagnosed_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Unknown',
            severity: condition.severity as 'Mild' | 'Moderate' | 'Severe',
            status: condition.status as 'Active' | 'In remission' | 'Resolved'
          })));
        }

        // Fetch allergies
        const { data: allergiesData, error: allergiesError } = await supabase
          .from('allergies')
          .select('*')
          .eq('user_id', user.id);

        if (allergiesError) throw allergiesError;

        if (allergiesData) {
          setAllergies(allergiesData.map(allergy => ({
            id: allergy.id,
            allergen: allergy.allergen,
            reaction: allergy.reaction || 'Not specified',
            severity: allergy.severity as 'Mild' | 'Moderate' | 'Severe',
            notes: allergy.notes
          })));
        }

        // Fetch medications
        const { data: medicationsData, error: medicationsError } = await supabase
          .from('medications')
          .select('*')
          .eq('user_id', user.id);

        if (medicationsError) throw medicationsError;

        if (medicationsData) {
          setMedications(medicationsData.map(medication => ({
            id: medication.id,
            name: medication.name,
            dosage: medication.dosage || 'Not specified',
            frequency: medication.frequency || 'Not specified',
            startDate: medication.start_date ? new Date(medication.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Unknown',
            prescribedBy: medication.prescribed_by || 'Unknown'
          })));
        }

      } catch (error: any) {
        console.error('Error fetching profile data:', error);
        toast.error('Failed to load profile data', {
          description: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  // If user is not logged in or data is loading, show loading state
  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-green mb-4" />
        <p className="text-gray-400">Loading profile data...</p>
      </div>
    );
  }

  // Check if user data is available
  if (!user || !patientData) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-white mb-2">Profile Not Found</h2>
          <p className="text-gray-400">
            Please log in to view your profile information.
          </p>
        </div>
      </div>
    );
  }

  // If we get here, we have user data so render the profile
  return (
    <div className="p-6">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Patient Profile</h1>
        <p className="text-gray-400">View and manage your personal health information</p>
      </header>

      {/* Profile Content */}
      <div className="grid grid-cols-1 gap-6">
        <PatientInfo patient={{
          name: patientData.name,
          dateOfBirth: patientData.dateOfBirth || 'Not provided',
          gender: patientData.gender || 'Not provided',
          bloodType: patientData.bloodType || 'Not provided',
          height: patientData.height || 'Not provided',
          weight: patientData.weight || 'Not provided',
          lastCheckup: patientData.lastCheckup || 'No recent checkup'
        }} />
        
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
