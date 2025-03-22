"use client";

import { FileText, Award, Calendar, Users } from "lucide-react";

interface ProjectOverviewProps {
  dataType: string;
  requiredSpecialty: string;
  deadline: Date;
  teamSize: number;
}

export function ProjectOverview({ 
  dataType, 
  requiredSpecialty, 
  deadline, 
  teamSize 
}: ProjectOverviewProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Project Overview
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Data Type</p>
            <p className="text-sm text-gray-500">{dataType}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Required Specialty</p>
            <p className="text-sm text-gray-500">{requiredSpecialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Deadline</p>
            <p className="text-sm text-gray-500">
              {deadline.toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">Team Size</p>
            <p className="text-sm text-gray-500">{teamSize} members</p>
          </div>
        </div>
      </div>
    </div>
  );
}
