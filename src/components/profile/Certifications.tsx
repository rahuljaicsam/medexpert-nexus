"use client";

import { useState } from "react";
import { Award, X } from "lucide-react";
import { ProfileSection } from "./ProfileSection";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  const handleAddCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: "",
      issuer: "",
      year: new Date().getFullYear().toString(),
    };
    setCertifications([...certifications, newCert]);
  };

  return (
    <ProfileSection title="Certifications">
      <div className="mb-4 flex items-center justify-between">
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
    </ProfileSection>
  );
}
