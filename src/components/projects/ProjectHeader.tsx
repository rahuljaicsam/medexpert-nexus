"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProjectHeaderProps {
  title: string;
  description: string;
}

export function ProjectHeader({ title, description }: ProjectHeaderProps) {
  return (
    <>
      <div className="mb-8">
        <Link
          href="/projects/browse"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {title}
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {description}
        </p>
      </div>
    </>
  );
}
