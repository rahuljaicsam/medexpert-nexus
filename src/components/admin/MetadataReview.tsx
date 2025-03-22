"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Flag,
  Clock,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  FileText,
} from "lucide-react";
import type { MetadataEntry, AdminAction } from "@/types/admin";

// Dummy data
const dummyMetadata: MetadataEntry[] = [
  {
    id: "1",
    title: "Brain MRI Dataset Update",
    type: "dataset",
    status: "pending",
    submittedBy: "Dr. Sarah Chen",
    submittedAt: "2024-03-20T10:30:00Z",
    lastModified: "2024-03-20T10:30:00Z",
    content: {
      description: "Updated metadata for brain MRI dataset",
      changes: ["Added new tags", "Updated description", "Modified compliance info"],
    },
  },
  {
    id: "2",
    title: "Chest X-Ray Project Metadata",
    type: "project",
    status: "flagged",
    submittedBy: "Dr. Michael Brown",
    submittedAt: "2024-03-19T15:45:00Z",
    lastModified: "2024-03-19T16:20:00Z",
    content: {
      description: "Project metadata requiring review",
      issues: ["Missing compliance documentation", "Incomplete team information"],
    },
  },
];

const dummyActions: AdminAction[] = [
  {
    id: "1",
    action: "approve",
    performedBy: "Admin User",
    performedAt: "2024-03-20T11:00:00Z",
    targetId: "dataset-123",
    notes: "All requirements met",
  },
];

interface MetadataReviewProps {
  onClose?: () => void;
}

export function MetadataReview({ onClose }: MetadataReviewProps) {
  const [entries, setEntries] = useState<MetadataEntry[]>(dummyMetadata);
  const [selectedEntries, setSelectedEntries] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof MetadataEntry>("submittedAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filterType, setFilterType] = useState<MetadataEntry["type"] | "all">("all");
  const [filterStatus, setFilterStatus] = useState<MetadataEntry["status"] | "all">("all");
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  const filteredEntries = entries
    .filter((entry) => {
      const matchesSearch = entry.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || entry.type === filterType;
      const matchesStatus = filterStatus === "all" || entry.status === filterStatus;
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const direction = sortDirection === "asc" ? 1 : -1;
      return aValue < bValue ? -1 * direction : 1 * direction;
    });

  const handleSort = (field: keyof MetadataEntry) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const handleAction = (action: "approve" | "reject" | "flag", ids: string[]) => {
    setEntries((prev) =>
      prev.map((entry) =>
        ids.includes(entry.id)
          ? { ...entry, status: action === "flag" ? "flagged" : action === "approve" ? "approved" : "rejected" }
          : entry
      )
    );
    setSelectedEntries(new Set());
  };

  const handleExport = () => {
    const data = JSON.stringify(filteredEntries, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "metadata-review-export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Metadata Review</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Close Dashboard
          </button>
        )}
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search metadata..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 rounded-lg border border-gray-300 py-2 pr-4 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as MetadataEntry["type"] | "all")}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Types</option>
            <option value="dataset">Dataset</option>
            <option value="project">Project</option>
            <option value="annotation">Annotation</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as MetadataEntry["status"] | "all")}
            className="rounded-lg border border-gray-300 py-2 pl-3 pr-8 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="flagged">Flagged</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          {selectedEntries.size > 0 && (
            <>
              <button
                onClick={() => handleAction("approve", Array.from(selectedEntries))}
                className="inline-flex items-center rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve Selected
              </button>
              <button
                onClick={() => handleAction("reject", Array.from(selectedEntries))}
                className="inline-flex items-center rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject Selected
              </button>
              <button
                onClick={() => handleAction("flag", Array.from(selectedEntries))}
                className="inline-flex items-center rounded-lg bg-yellow-600 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-700"
              >
                <Flag className="mr-2 h-4 w-4" />
                Flag Selected
              </button>
            </>
          )}
          <button
            onClick={handleExport}
            className="inline-flex items-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Entries Table */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="grid grid-cols-[auto,1fr,auto,auto,auto] gap-4 border-b border-gray-200 p-4 font-medium text-gray-700">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={selectedEntries.size === filteredEntries.length}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedEntries(new Set(filteredEntries.map((entry) => entry.id)));
                } else {
                  setSelectedEntries(new Set());
                }
              }}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
          </div>
          <button
            onClick={() => handleSort("title")}
            className="flex items-center"
          >
            Title
            {sortField === "title" && (
              sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => handleSort("type")}
            className="flex items-center"
          >
            Type
            {sortField === "type" && (
              sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => handleSort("submittedAt")}
            className="flex items-center"
          >
            Submitted
            {sortField === "submittedAt" && (
              sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </button>
          <div>Status</div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredEntries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={false}
              animate={{ height: expandedEntry === entry.id ? "auto" : "auto" }}
              className="grid grid-cols-[auto,1fr,auto,auto,auto] gap-4 p-4"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedEntries.has(entry.id)}
                  onChange={(e) => {
                    const newSelected = new Set(selectedEntries);
                    if (e.target.checked) {
                      newSelected.add(entry.id);
                    } else {
                      newSelected.delete(entry.id);
                    }
                    setSelectedEntries(newSelected);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
              </div>
              <button
                onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                className="flex items-center text-left"
              >
                <span className="font-medium text-gray-900">{entry.title}</span>
                {expandedEntry === entry.id ? (
                  <ChevronUp className="ml-2 h-4 w-4 text-gray-400" />
                ) : (
                  <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                )}
              </button>
              <div className="flex items-center">
                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                  {entry.type}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="mr-1 h-4 w-4" />
                {new Date(entry.submittedAt).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    entry.status === "approved"
                      ? "bg-green-100 text-green-800"
                      : entry.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : entry.status === "flagged"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {entry.status}
                </span>
              </div>

              {expandedEntry === entry.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-5 mt-4 rounded-lg bg-gray-50 p-4"
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-medium text-gray-900">Details</h4>
                      <dl className="mt-2 space-y-1">
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Submitted by:</dt>
                          <dd className="text-sm text-gray-900">{entry.submittedBy}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Last modified:</dt>
                          <dd className="text-sm text-gray-900">
                            {new Date(entry.lastModified).toLocaleString()}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Content</h4>
                      <pre className="mt-2 max-h-40 overflow-auto rounded bg-gray-100 p-2 text-xs">
                        {JSON.stringify(entry.content, null, 2)}
                      </pre>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleAction("approve", [entry.id])}
                      className="inline-flex items-center rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction("reject", [entry.id])}
                      className="inline-flex items-center rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleAction("flag", [entry.id])}
                      className="inline-flex items-center rounded-lg bg-yellow-600 px-3 py-2 text-sm font-medium text-white hover:bg-yellow-700"
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      Flag
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Activity</h3>
        <div className="space-y-4">
          {dummyActions.map((action) => (
            <div key={action.id} className="flex items-start gap-3">
              {action.action === "approve" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : action.action === "reject" ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : (
                <Flag className="h-5 w-5 text-yellow-500" />
              )}
              <div>
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{action.performedBy}</span>{" "}
                  {action.action}d metadata entry
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(action.performedAt).toLocaleString()}
                </p>
                {action.notes && (
                  <p className="mt-1 text-sm text-gray-600">{action.notes}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
