
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChartBar, Heart, Hospital, UserRound, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome Back, John</h1>
        <p className="text-gray-400">Your health dashboard overview</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Health Score</CardTitle>
            <Heart className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">85%</div>
            <Progress value={85} className="bg-white/10" />
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Appointments</CardTitle>
            <Hospital className="h-4 w-4 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2</div>
            <p className="text-gray-400 text-sm">Upcoming this week</p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Medical Records</CardTitle>
            <ChartBar className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">15</div>
            <p className="text-gray-400 text-sm">Total documents</p>
          </CardContent>
        </Card>

        <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Profile Status</CardTitle>
            <UserRound className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">Complete</div>
            <p className="text-gray-400 text-sm">Last updated 2 days ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Reports Section */}
      <Card className="bg-black/40 border-border/10 backdrop-blur-xl mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-white">Medical Reports</CardTitle>
            <p className="text-sm text-gray-400 mt-1">Access your health records and documents</p>
          </div>
          <Link to="/reports">
            <Button className="bg-brand-green hover:bg-brand-green/90">
              <FileText className="mr-2 h-4 w-4" /> View All Reports
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">Blood Test Results</h3>
                  <p className="text-xs text-gray-400">Uploaded on Apr 20, 2025</p>
                </div>
              </div>
              <Link to="/reports" className="text-xs text-cyan-400 hover:text-cyan-300">View</Link>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">X-Ray Report</h3>
                  <p className="text-xs text-gray-400">Uploaded on Mar 15, 2025</p>
                </div>
              </div>
              <Link to="/reports" className="text-xs text-cyan-400 hover:text-cyan-300">View</Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity Section */}
      <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-white/5">
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Hospital className="h-5 w-5 text-emerald-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-white">Appointment Scheduled</h3>
                  <p className="text-xs text-gray-400">General checkup with Dr. Smith</p>
                </div>
                <span className="text-xs text-gray-400">2h ago</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
