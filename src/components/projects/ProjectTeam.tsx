"use client";

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

interface ProjectTeamProps {
  team: TeamMember[];
}

export function ProjectTeam({ team }: ProjectTeamProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Project Team
      </h2>
      <div className="space-y-4">
        {team.map((member) => (
          <div key={member.name} className="flex items-center gap-3">
            <img
              src={member.avatar}
              alt={member.name}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">
                {member.name}
              </p>
              <p className="text-xs text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
