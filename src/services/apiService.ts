
/**
 * API Service with Supabase Integration
 * 
 * Previously this service was simulating backend API calls.
 * Now it's integrated with Supabase for real data persistence.
 */

import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent } from '@/utils/securityUtils';

// Generic API response type
type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

// Get user profile
export async function getUserProfile(): Promise<ApiResponse<any>> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      return {
        success: false,
        error: userError.message
      };
    }
    
    if (!user) {
      return {
        success: false,
        error: 'Not authenticated'
      };
    }
    
    // Get profile data
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (profileError) {
      return {
        success: false,
        error: profileError.message
      };
    }
    
    if (!profile) {
      return {
        success: false,
        error: 'Profile not found'
      };
    }
    
    return {
      success: true,
      data: {
        id: user.id,
        email: user.email,
        role: profile.role,
        healthId: profile.health_id,
        firstName: profile.first_name,
        lastName: profile.last_name,
        metadata: {}
      }
    };
  } catch (error: any) {
    console.error('Error getting user profile:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch user profile'
    };
  }
}

// Upload medical report
export async function uploadReport(file: File, metadata: any): Promise<ApiResponse<{ reportId: string }>> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return {
        success: false,
        error: userError?.message || 'Not authenticated'
      };
    }
    
    // Upload file to storage
    const fileName = `${user.id}/${Date.now()}_${file.name}`;
    const { data: fileData, error: fileError } = await supabase.storage
      .from('report_files')
      .upload(fileName, file);
    
    if (fileError) {
      return {
        success: false,
        error: fileError.message
      };
    }
    
    // Create report record in database
    const { data: reportData, error: reportError } = await supabase
      .from('medical_reports')
      .insert({
        user_id: user.id,
        title: metadata.title,
        report_type: metadata.type,
        doctor: metadata.doctor || null,
        hospital: metadata.hospital || null,
        report_date: metadata.date || new Date().toISOString().split('T')[0],
        file_path: fileData?.path || null
      })
      .select()
      .single();
    
    if (reportError) {
      return {
        success: false,
        error: reportError.message
      };
    }
    
    return {
      success: true,
      data: { reportId: reportData.id },
      message: 'Report uploaded successfully'
    };
  } catch (error: any) {
    console.error('Error uploading report:', error);
    return {
      success: false,
      error: error.message || 'Failed to upload report'
    };
  }
}

// Get medical reports
export async function getMedicalReports(): Promise<ApiResponse<any[]>> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return {
        success: false,
        error: userError?.message || 'Not authenticated'
      };
    }
    
    // Fetch reports from database
    const { data: reports, error: reportsError } = await supabase
      .from('medical_reports')
      .select('*')
      .eq('user_id', user.id)
      .order('report_date', { ascending: false });
    
    if (reportsError) {
      return {
        success: false,
        error: reportsError.message
      };
    }
    
    // Transform to the expected format
    const formattedReports = reports.map(report => ({
      id: report.id,
      title: report.title,
      date: report.report_date,
      hospital: report.hospital || 'Unknown',
      doctor: report.doctor || 'Unknown',
      type: report.report_type || 'General',
      fileUrl: report.file_path ? `${supabase.storage.from('report_files').getPublicUrl(report.file_path).data.publicUrl}` : '#'
    }));
    
    return {
      success: true,
      data: formattedReports
    };
  } catch (error: any) {
    console.error('Error getting medical reports:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch medical reports'
    };
  }
}

// Get medical conditions
export async function getMedicalConditions(): Promise<ApiResponse<any[]>> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return {
        success: false,
        error: userError?.message || 'Not authenticated'
      };
    }
    
    // Fetch conditions from database
    const { data: conditions, error: conditionsError } = await supabase
      .from('medical_conditions')
      .select('*')
      .eq('user_id', user.id);
    
    if (conditionsError) {
      return {
        success: false,
        error: conditionsError.message
      };
    }
    
    return {
      success: true,
      data: conditions.map(condition => ({
        id: condition.id,
        name: condition.name,
        diagnosedDate: condition.diagnosed_date,
        severity: condition.severity,
        status: condition.status
      }))
    };
  } catch (error: any) {
    console.error('Error getting medical conditions:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch medical conditions'
    };
  }
}

// Add medical condition
export async function addMedicalCondition(conditionData: {
  name: string;
  diagnosedDate?: string;
  severity?: 'Mild' | 'Moderate' | 'Severe';
  status?: 'Active' | 'In remission' | 'Resolved';
}): Promise<ApiResponse<any>> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return {
        success: false,
        error: userError?.message || 'Not authenticated'
      };
    }
    
    // Add condition to database
    const { data, error } = await supabase
      .from('medical_conditions')
      .insert({
        user_id: user.id,
        name: conditionData.name,
        diagnosed_date: conditionData.diagnosedDate,
        severity: conditionData.severity,
        status: conditionData.status || 'Active'
      })
      .select()
      .single();
    
    if (error) {
      return {
        success: false,
        error: error.message
      };
    }
    
    return {
      success: true,
      data,
      message: 'Medical condition added successfully'
    };
  } catch (error: any) {
    console.error('Error adding medical condition:', error);
    return {
      success: false,
      error: error.message || 'Failed to add medical condition'
    };
  }
}

// Get allergies
export async function getAllergies(): Promise<ApiResponse<any[]>> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return {
        success: false,
        error: userError?.message || 'Not authenticated'
      };
    }
    
    // Fetch allergies from database
    const { data: allergies, error: allergiesError } = await supabase
      .from('allergies')
      .select('*')
      .eq('user_id', user.id);
    
    if (allergiesError) {
      return {
        success: false,
        error: allergiesError.message
      };
    }
    
    return {
      success: true,
      data: allergies.map(allergy => ({
        id: allergy.id,
        allergen: allergy.allergen,
        reaction: allergy.reaction,
        severity: allergy.severity,
        notes: allergy.notes
      }))
    };
  } catch (error: any) {
    console.error('Error getting allergies:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch allergies'
    };
  }
}

// Add allergy
export async function addAllergy(allergyData: {
  allergen: string;
  reaction?: string;
  severity?: 'Mild' | 'Moderate' | 'Severe';
  notes?: string;
}): Promise<ApiResponse<any>> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return {
        success: false,
        error: userError?.message || 'Not authenticated'
      };
    }
    
    // Add allergy to database
    const { data, error } = await supabase
      .from('allergies')
      .insert({
        user_id: user.id,
        allergen: allergyData.allergen,
        reaction: allergyData.reaction,
        severity: allergyData.severity,
        notes: allergyData.notes
      })
      .select()
      .single();
    
    if (error) {
      return {
        success: false,
        error: error.message
      };
    }
    
    return {
      success: true,
      data,
      message: 'Allergy added successfully'
    };
  } catch (error: any) {
    console.error('Error adding allergy:', error);
    return {
      success: false,
      error: error.message || 'Failed to add allergy'
    };
  }
}

// Get medications
export async function getMedications(): Promise<ApiResponse<any[]>> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return {
        success: false,
        error: userError?.message || 'Not authenticated'
      };
    }
    
    // Fetch medications from database
    const { data: medications, error: medicationsError } = await supabase
      .from('medications')
      .select('*')
      .eq('user_id', user.id);
    
    if (medicationsError) {
      return {
        success: false,
        error: medicationsError.message
      };
    }
    
    return {
      success: true,
      data: medications.map(medication => ({
        id: medication.id,
        name: medication.name,
        dosage: medication.dosage,
        frequency: medication.frequency,
        startDate: medication.start_date,
        prescribedBy: medication.prescribed_by
      }))
    };
  } catch (error: any) {
    console.error('Error getting medications:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch medications'
    };
  }
}

// Add medication
export async function addMedication(medicationData: {
  name: string;
  dosage?: string;
  frequency?: string;
  startDate?: string;
  prescribedBy?: string;
}): Promise<ApiResponse<any>> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return {
        success: false,
        error: userError?.message || 'Not authenticated'
      };
    }
    
    // Add medication to database
    const { data, error } = await supabase
      .from('medications')
      .insert({
        user_id: user.id,
        name: medicationData.name,
        dosage: medicationData.dosage,
        frequency: medicationData.frequency,
        start_date: medicationData.startDate,
        prescribed_by: medicationData.prescribedBy
      })
      .select()
      .single();
    
    if (error) {
      return {
        success: false,
        error: error.message
      };
    }
    
    return {
      success: true,
      data,
      message: 'Medication added successfully'
    };
  } catch (error: any) {
    console.error('Error adding medication:', error);
    return {
      success: false,
      error: error.message || 'Failed to add medication'
    };
  }
}
