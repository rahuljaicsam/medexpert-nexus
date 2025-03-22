"use client";

import { ProfileSection } from "./ProfileSection";

interface BasicInformationProps {
  onUpdate?: (field: string, value: string) => void;
}

export function BasicInformation({ onUpdate }: BasicInformationProps) {
  return (
    <ProfileSection title="Basic Information">
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            onChange={(e) => onUpdate?.("name", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Medical License Number
          </label>
          <input
            type="text"
            onChange={(e) => onUpdate?.("license", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Years of Experience
          </label>
          <input
            type="number"
            min="0"
            onChange={(e) => onUpdate?.("experience", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Primary Specialty
          </label>
          <select
            onChange={(e) => onUpdate?.("specialty", e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Select specialty</option>
            <option value="radiology">Radiology</option>
            <option value="pathology">Pathology</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
          </select>
        </div>
      </div>
    </ProfileSection>
  );
}
