"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { ProjectOverview } from "@/components/projects/ProjectOverview";
import { ProjectTeam } from "@/components/projects/ProjectTeam";

const project = {
  id: "chest-xray",
  title: "Chest X-Ray Classification Dataset",
  description: "Label chest x-rays for presence of pneumonia and other respiratory conditions",
  dataType: "Medical Images",
  taskType: "Image Classification",
  compensation: {
    type: "per_label" as const,
    amount: 2.5,
  },
  deadline: new Date("2024-04-15"),
  requiredSpecialty: "Radiology",
  totalTasks: 1000,
  completedTasks: 250,
  guidelines: `
1. Review the entire X-ray image before starting annotation
2. For pneumonia identification:
   - Look for areas of opacity or consolidation
   - Mark any infiltrates or abnormal densities
   - Note the distribution pattern (e.g., lobar, patchy)
3. Additional conditions to look for:
   - Pleural effusions
   - Pulmonary edema
   - Cardiomegaly
4. Classification guidelines:
   - Normal: Clear lung fields with no significant abnormalities
   - Bacterial Pneumonia: Dense, lobar consolidation
   - Viral Pneumonia: More diffuse, interstitial pattern
   - Other: Any other significant findings
5. Quality control:
   - Ensure proper image orientation
   - Check for proper contrast and brightness
   - Document any technical limitations
  `,
  team: [
    {
      name: "Dr. Sarah Chen",
      role: "Lead Annotator",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    },
    {
      name: "Dr. Michael Brown",
      role: "Quality Control",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    },
    {
      name: "Dr. Emily White",
      role: "Specialist Reviewer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    }
  ]
};

export default function ChestXrayProjectPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <Link
            href="/projects/browse"
            className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ProjectHeader 
            title={project.title}
            description={project.description}
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <ProjectOverview
                dataType={project.dataType}
                requiredSpecialty={project.requiredSpecialty}
                deadline={project.deadline}
                teamSize={project.team.length}
              />

              {/* Guidelines */}
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Annotation Guidelines
                </h2>
                <pre className="whitespace-pre-wrap text-sm text-gray-600 font-mono bg-gray-50 p-4 rounded-lg">
                  {project.guidelines}
                </pre>
              </div>

              {/* Progress */}
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Project Progress
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Overall Progress</span>
                    <span>
                      {project.completedTasks} / {project.totalTasks} tasks
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{
                        width: `${(project.completedTasks / project.totalTasks) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Compensation */}
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Compensation
                </h2>
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    ${project.compensation.amount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {project.compensation.type === "per_label" ? "per label" : "per hour"}
                  </p>
                </div>
                <button className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90">
                  Apply Now
                </button>
              </div>

              <ProjectTeam team={project.team} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
