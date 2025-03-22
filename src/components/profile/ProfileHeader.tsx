"use client";

import { Save } from "lucide-react";

interface ProfileHeaderProps {
  isAdmin: boolean;
  showAdminDashboard: boolean;
  onToggleAdminView: () => void;
}

export function ProfileHeader({ 
  isAdmin, 
  showAdminDashboard, 
  onToggleAdminView 
}: ProfileHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Professional Profile
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Showcase your medical expertise and qualifications
        </p>
      </div>
      <div className="flex items-center gap-4">
        {isAdmin && (
          <button
            onClick={onToggleAdminView}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            {showAdminDashboard ? "View Profile" : "Admin Dashboard"}
          </button>
        )}
        <button
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          onClick={() => {
            // Save profile logic here
            console.log("Profile saved");
          }}
        >
          <Save className="mr-2 h-4 w-4" />
          Save Profile
        </button>
      </div>
    </div>
  );
}
