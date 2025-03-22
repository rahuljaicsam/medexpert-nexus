"use client";

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ProfileSection({ title, children, className = "" }: ProfileSectionProps) {
  return (
    <div className={`rounded-lg bg-white p-6 shadow-lg ${className}`}>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}
