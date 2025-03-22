"use client";

import { useState } from "react";
import { Plus, X, Save, Award, BookOpen } from "lucide-react";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

interface Publication {
  id: string;
  title: string;
  journal: string;
  year: string;
}

export function ProfileContent() {
  const [specializations, setSpecializations] = useState<string[]>([]);
  const [newSpecialization, setNewSpecialization] = useState("");
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [publications, setPublications] = useState<Publication[]>([]);

  const handleAddSpecialization = () => {
    if (newSpecialization.trim() && !specializations.includes(newSpecialization)) {
      setSpecializations([...specializations, newSpecialization.trim()]);
      setNewSpecialization("");
    }
  };

  const handleRemoveSpecialization = (index: number) => {
    setSpecializations(specializations.filter((_, i) => i !== index));
  };

  const handleAddCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      year: new Date().getFullYear().toString(),
    };
    setCertifications([...certifications, newCert]);
  };

  const handleAddPublication = () => {
    const newPub: Publication = {
      id: Date.now().toString(),
      title: "",
      journal: "",
      year: new Date().getFullYear().toString(),
    };
    setPublications([...publications, newPub]);
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Medical License Number
            </label>
            <input
              type="text"
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
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Primary Specialty
            </label>
            <select
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
      </div>

      {/* Specializations */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Areas of Expertise
        </h2>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newSpecialization}
              onChange={(e) => setNewSpecialization(e.target.value)}
              placeholder="Add specialization"
              className="flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleAddSpecialization}
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {specializations.map((spec, index) => (
              <span
                key={index}
                className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm"
              >
                {spec}
                <button
                  onClick={() => handleRemoveSpecialization(index)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Certifications
          </h2>
          <button
            onClick={handleAddCertification}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            <Award className="mr-2 h-4 w-4" />
            Add Certification
          </button>
        </div>
        <div className="space-y-4">
          {certifications.map((cert) => (
            <div key={cert.id} className="grid gap-4 rounded-lg border p-4 md:grid-cols-3">
              <input
                placeholder="Certification name"
                className="rounded-md border border-gray-300 px-3 py-2"
                value={cert.name}
                onChange={(e) =>
                  setCertifications(
                    certifications.map((c) =>
                      c.id === cert.id ? { ...c, name: e.target.value } : c
                    )
                  )
                }
              />
              <input
                placeholder="Issuing organization"
                className="rounded-md border border-gray-300 px-3 py-2"
                value={cert.issuer}
                onChange={(e) =>
                  setCertifications(
                    certifications.map((c) =>
                      c.id === cert.id ? { ...c, issuer: e.target.value } : c
                    )
                  )
                }
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Year"
                  className="w-24 rounded-md border border-gray-300 px-3 py-2"
                  value={cert.year}
                  onChange={(e) =>
                    setCertifications(
                      certifications.map((c) =>
                        c.id === cert.id ? { ...c, year: e.target.value } : c
                      )
                    )
                  }
                />
                <button
                  onClick={() =>
                    setCertifications(certifications.filter((c) => c.id !== cert.id))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Publications */}
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Publications
          </h2>
          <button
            onClick={handleAddPublication}
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
          >
            <BookOpen className="mr-2 h-4 w-4" />
            Add Publication
          </button>
        </div>
        <div className="space-y-4">
          {publications.map((pub) => (
            <div key={pub.id} className="grid gap-4 rounded-lg border p-4 md:grid-cols-3">
              <input
                placeholder="Publication title"
                className="rounded-md border border-gray-300 px-3 py-2"
                value={pub.title}
                onChange={(e) =>
                  setPublications(
                    publications.map((p) =>
                      p.id === pub.id ? { ...p, title: e.target.value } : p
                    )
                  )
                }
              />
              <input
                placeholder="Journal/Conference"
                className="rounded-md border border-gray-300 px-3 py-2"
                value={pub.journal}
                onChange={(e) =>
                  setPublications(
                    publications.map((p) =>
                      p.id === pub.id ? { ...p, journal: e.target.value } : p
                    )
                  )
                }
              />
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Year"
                  className="w-24 rounded-md border border-gray-300 px-3 py-2"
                  value={pub.year}
                  onChange={(e) =>
                    setPublications(
                      publications.map((p) =>
                        p.id === pub.id ? { ...p, year: e.target.value } : p
                      )
                    )
                  }
                />
                <button
                  onClick={() =>
                    setPublications(publications.filter((p) => p.id !== pub.id))
                  }
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
