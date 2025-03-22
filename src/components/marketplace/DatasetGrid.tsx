"use client";

import { motion } from "framer-motion";
import { Download, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Dataset } from "@/types/marketplace";

interface DatasetGridProps {
  datasets: Dataset[];
}

export function DatasetGrid({ datasets }: DatasetGridProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {datasets.map((dataset) => (
        <motion.div
          key={dataset.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.02 }}
          className="overflow-hidden rounded-lg bg-white shadow-lg transition-all"
        >
          <div className="relative h-48">
            <img
              src={dataset.preview}
              alt={dataset.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center justify-between text-white">
                <span className="text-sm">{dataset.type}</span>
                <span className="text-sm">{dataset.size}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {dataset.title}
              </h2>
              <p className="mt-2 text-gray-600">{dataset.description}</p>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {dataset.format.map((format) => (
                <span
                  key={format}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600"
                >
                  {format}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {dataset.downloads} downloads
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-600">
                    {dataset.compliance.join(", ")}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">
                  ${dataset.price}
                </div>
                <Link
                  href={`/marketplace/${dataset.id}`}
                  className="mt-2 inline-flex items-center text-sm text-primary hover:text-primary/80"
                >
                  View Details
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
