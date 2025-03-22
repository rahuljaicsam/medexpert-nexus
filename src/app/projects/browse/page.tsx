"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Search, Filter, DollarSign, Calendar, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

interface Project {
  id: string;
  title: string;
  dataType: string;
  taskType: string;
  compensation: {
    type: "per_label" | "hourly";
    amount: number;
  };
  deadline: Date;
  requiredSpecialty: string;
  description: string;
  totalTasks: number;
  completedTasks: number;
}

const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Chest X-Ray Classification Dataset",
    dataType: "Medical Images",
    taskType: "Image Classification",
    compensation: {
      type: "per_label",
      amount: 2.5,
    },
    deadline: new Date("2024-04-15"),
    requiredSpecialty: "Radiology",
    description: "Label chest x-rays for presence of pneumonia and other respiratory conditions",
    totalTasks: 1000,
    completedTasks: 250,
  },
  {
    id: "2",
    title: "Clinical Notes Sentiment Analysis",
    dataType: "Clinical Text",
    taskType: "Text Classification",
    compensation: {
      type: "hourly",
      amount: 75,
    },
    deadline: new Date("2024-04-30"),
    requiredSpecialty: "General Practice",
    description: "Analyze patient notes for sentiment and emotional content",
    totalTasks: 500,
    completedTasks: 100,
  },
  {
    id: "3",
    title: "Brain MRI Tumor Segmentation",
    dataType: "Medical Images",
    taskType: "Image Segmentation",
    compensation: {
      type: "per_label",
      amount: 5,
    },
    deadline: new Date("2024-05-15"),
    requiredSpecialty: "Neurology",
    description: "Segment brain tumors in MRI scans for AI model training",
    totalTasks: 750,
    completedTasks: 0,
  },
];

export default function ProjectBrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDataType, setSelectedDataType] = useState<string>("");

  const filteredProjects = sampleProjects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || project.requiredSpecialty === selectedSpecialty;
    const matchesDataType = !selectedDataType || project.dataType === selectedDataType;
    return matchesSearch && matchesSpecialty && matchesDataType;
  });

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-8">
          <Link
            href="/projects"
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Browse Projects
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Find medical annotation projects that match your expertise
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">All Specialties</option>
              <option value="Radiology">Radiology</option>
              <option value="Neurology">Neurology</option>
              <option value="General Practice">General Practice</option>
            </select>
            <select
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">All Data Types</option>
              <option value="Medical Images">Medical Images</option>
              <option value="Clinical Text">Clinical Text</option>
            </select>
          </div>

          {/* Project List */}
          <div className="space-y-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.01 }}
                className="overflow-hidden rounded-lg bg-white shadow-lg transition-all"
              >
                <div className="p-6">
                  <Link href={`/projects/chest-xray`} className="block">
                    <div className="flex items-start justify-between group">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          {project.title}
                        </h2>
                        <p className="mt-2 text-gray-600">{project.description}</p>
                      </div>
                      <span className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white group-hover:bg-primary/90 transition-colors">
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </Link>

                  <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="flex items-center gap-2">
                      <Filter className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">{project.dataType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {project.compensation.type === "per_label"
                          ? `$${project.compensation.amount} per label`
                          : `$${project.compensation.amount}/hour`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        Due {format(project.deadline, "MMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {project.requiredSpecialty}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>Progress</span>
                      <span>
                        {project.completedTasks} / {project.totalTasks} tasks
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{
                          width: `${(project.completedTasks / project.totalTasks) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
