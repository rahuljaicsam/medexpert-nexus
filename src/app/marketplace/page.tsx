"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { 
  Download,
  FileText,
  Database,
  ShieldCheck,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import { SearchBar } from "@/components/marketplace/SearchBar";
import { DatasetFilters } from "@/components/marketplace/DatasetFilters";

import type { DatasetMetadata } from "@/types/dataset-metadata";

import { datasets } from "@/lib/datasets";
import { useDatasets } from "@/hooks/useDatasets";

export default function MarketplacePage() {
  const {
    searchTerm,
    setSearchTerm,
    selectedFilters,
    setSelectedFilters,
    filteredDatasets,
    clearFilters
  } = useDatasets(datasets);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Medical Dataset Marketplace
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Access high-quality, validated medical datasets for AI training
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 grid gap-8 lg:grid-cols-[300px,1fr]">
            <div className="space-y-6">
              <SearchBar 
                onSearch={setSearchTerm}
                placeholder="Search medical datasets..."
              />
              <DatasetFilters
                selectedFilters={selectedFilters}
                onFilterChange={setSelectedFilters}
                onClearFilters={() => setSelectedFilters(new Set())}
              />
            </div>
            
            {/* Dataset Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Showing {filteredDatasets.length} datasets
                </p>
                <select
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  onChange={(e) => {
                    // Sort functionality would go here
                  }}
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="downloads">Most Downloads</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              <div className="grid gap-6 lg:grid-cols-2">
                {filteredDatasets.map((dataset) => (
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
                      <span className="text-sm">{dataset.size.formatted}</span>
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
                    {dataset.format.map((format: string) => (
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

              {/* Features Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-gray-900">
                  Why Choose Our Datasets?
                </h2>
                <div className="mt-8 grid gap-8 lg:grid-cols-3">
                  <div className="rounded-lg bg-white p-6 shadow-lg">
                <Database className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Validated Quality
                </h3>
                <p className="mt-2 text-gray-600">
                  All datasets are validated by medical professionals and undergo rigorous quality checks.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Compliance Ready
                </h3>
                <p className="mt-2 text-gray-600">
                  Fully compliant with HIPAA, GDPR, and other relevant medical data regulations.
                </p>
              </div>
              <div className="rounded-lg bg-white p-6 shadow-lg">
                <FileText className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Comprehensive Documentation
                </h3>
                <p className="mt-2 text-gray-600">
                  Detailed documentation and integration guides for major AI frameworks.
                </p>
              </div>
            </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
