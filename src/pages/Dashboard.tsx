
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HospitalUploadView } from '@/components/hospital/HospitalUploadView';
import { FileText, User, Calendar, Bell } from "lucide-react";

const Dashboard = () => {
  const [userType] = useState<'patient' | 'hospital'>('patient'); // In a real app, this would come from auth state

  // Mock data for patient dashboard
  const recentReports = [
    { id: '1', title: 'Blood Test Results', date: '2025-05-01', hospital: 'Metro General Hospital' },
    { id: '2', title: 'X-Ray Report', date: '2025-04-22', hospital: 'City Medical Center' },
  ];

  const upcomingAppointments = [
    { id: '1', doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: '2025-05-10', time: '10:30 AM', hospital: 'Metro General Hospital' },
    { id: '2', doctor: 'Dr. Robert Chen', specialty: 'Pulmonologist', date: '2025-05-15', time: '2:00 PM', hospital: 'City Medical Center' },
  ];

  const notifications = [
    { id: '1', message: 'New lab results uploaded', date: '2025-05-01', isRead: false },
    { id: '2', message: 'Appointment reminder: Dr. Sarah Johnson', date: '2025-05-02', isRead: true },
    { id: '3', message: 'Prescription renewed', date: '2025-04-28', isRead: true },
  ];

  return (
    <div className="min-h-screen p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back to your One Health portal</p>
      </header>

      {userType === 'hospital' ? (
        // Hospital View
        <HospitalUploadView />
      ) : (
        // Patient View
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-brand-green" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-white font-medium">{report.title}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-gray-400 text-xs">{report.date}</p>
                        <p className="text-gray-400 text-xs">{report.hospital}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2">
                    <a href="/reports" className="text-brand-cyan text-sm hover:text-brand-cyan/80">
                      View all reports →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-brand-green" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-white font-medium">{appointment.doctor}</p>
                      <p className="text-gray-300 text-sm">{appointment.specialty}</p>
                      <div className="flex justify-between mt-1">
                        <p className="text-gray-400 text-xs">{appointment.date}, {appointment.time}</p>
                        <p className="text-gray-400 text-xs">{appointment.hospital}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                  <Bell className="h-5 w-5 text-brand-green" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg border ${notification.isRead ? 'bg-white/5 border-white/10' : 'bg-white/10 border-brand-green/30'}`}
                    >
                      <p className={`font-medium ${notification.isRead ? 'text-white' : 'text-brand-green'}`}>
                        {notification.message}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">{notification.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-white flex items-center gap-2">
                <User className="h-5 w-5 text-brand-green" />
                Health Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="bg-black/40 border-border/10">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="medications">Medications</TabsTrigger>
                  <TabsTrigger value="allergies">Allergies</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-sm">Blood Type</p>
                      <p className="text-white text-lg font-medium">O+</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-sm">Last Checkup</p>
                      <p className="text-white text-lg font-medium">March 10, 2025</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-sm">Height / Weight</p>
                      <p className="text-white text-lg font-medium">5'6" / 145 lbs</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="medications" className="mt-4">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium">Albuterol Inhaler</h4>
                        <p className="text-gray-400 text-sm">Current</p>
                      </div>
                      <p className="text-gray-300">2 puffs as needed</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium">Lisinopril</h4>
                        <p className="text-gray-400 text-sm">Current</p>
                      </div>
                      <p className="text-gray-300">10 mg once daily</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="allergies" className="mt-4">
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium">Penicillin</h4>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-500/20">
                          Severe
                        </span>
                      </div>
                      <p className="text-gray-300">Hives, difficulty breathing</p>
                    </div>
                    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-white font-medium">Peanuts</h4>
                        <span className="px-2 py-0.5 text-xs rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">
                          Moderate
                        </span>
                      </div>
                      <p className="text-gray-300">Swelling, itchiness</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
