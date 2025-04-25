
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

export const AboutReports = () => {
  return (
    <Card className="bg-black/40 border-border/10 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-white">About Your Reports</CardTitle>
        <CardDescription className="text-gray-400">
          Understanding your medical documentation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-300">
        <p>
          Your medical reports are securely stored and can only be accessed by you and the healthcare providers you authorize.
        </p>
        <p>
          All reports are categorized by type, making it easy to find specific documents when needed.
        </p>
        <p>
          You can download any report for offline access or to share with other healthcare professionals.
        </p>
      </CardContent>
      <CardFooter className="border-t border-white/10 pt-6">
        <p className="text-sm text-gray-400">
          For assistance with report interpretation, please consult with your healthcare provider.
        </p>
      </CardFooter>
    </Card>
  );
};
