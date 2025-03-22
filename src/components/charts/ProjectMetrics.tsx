"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { Card, Title, Text } from "@tremor/react";

const areaData = [
  { date: "Jan", annotations: 2400, quality: 85 },
  { date: "Feb", annotations: 1398, quality: 88 },
  { date: "Mar", annotations: 9800, quality: 92 },
  { date: "Apr", annotations: 3908, quality: 89 },
  { date: "May", annotations: 4800, quality: 91 },
  { date: "Jun", annotations: 3800, quality: 87 },
];

const pieData = [
  { name: "Completed", value: 400 },
  { name: "In Progress", value: 300 },
  { name: "Pending", value: 200 },
  { name: "Rejected", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const radarData = [
  {
    subject: "Speed",
    A: 120,
    B: 110,
    fullMark: 150,
  },
  {
    subject: "Quality",
    A: 98,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Consistency",
    A: 86,
    B: 130,
    fullMark: 150,
  },
  {
    subject: "Accuracy",
    A: 99,
    B: 100,
    fullMark: 150,
  },
  {
    subject: "Coverage",
    A: 85,
    B: 90,
    fullMark: 150,
  },
];

export function ProjectMetrics() {
  return (
    <div className="space-y-6">
      <Card className="bg-white p-6">
        <Title>Annotation Progress & Quality Over Time</Title>
        <Text>Track the volume and quality of annotations</Text>
        <div className="mt-6 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={areaData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAnnotations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0088FE" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorQuality" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="annotations"
                stroke="#0088FE"
                fillOpacity={1}
                fill="url(#colorAnnotations)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="quality"
                stroke="#00C49F"
                fillOpacity={1}
                fill="url(#colorQuality)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card className="bg-white p-6">
          <Title>Task Distribution</Title>
          <Text>Current status of annotation tasks</Text>
          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="bg-white p-6">
          <Title>Performance Metrics</Title>
          <Text>Annotator performance analysis</Text>
          <div className="mt-6 h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar
                  name="Team A"
                  dataKey="A"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
                <Radar
                  name="Team B"
                  dataKey="B"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  fillOpacity={0.6}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
