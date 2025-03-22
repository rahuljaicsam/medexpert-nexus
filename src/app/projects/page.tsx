"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ProjectMetrics } from "@/components/charts/ProjectMetrics";
import { ProjectWizard } from "@/components/ProjectWizard";
import { 
  BarChart, 
  Card, 
  Title, 
  Text,
  TabList,
  Tab,
  TabGroup,
  TabPanels,
  TabPanel,
  Grid,
  Col,
  Badge,
  Button,
  List,
  ListItem,
  Flex,
  ProgressBar
} from "@tremor/react";
import { 
  Plus,
  Users,
  FileCheck,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

// Dummy data
const projects = [
  {
    id: 1,
    name: "Chest X-Ray Classification",
    description: "Annotate chest x-rays for disease classification",
    progress: 75,
    tasks: 1000,
    completed: 750,
    assignedUsers: 12,
    status: "In Progress",
    lastUpdate: new Date("2024-03-15"),
    trend: "up",
  },
  {
    id: 2,
    name: "Brain MRI Segmentation",
    description: "Segment brain MRI scans for tumor detection",
    progress: 45,
    tasks: 500,
    completed: 225,
    assignedUsers: 8,
    status: "In Progress",
    lastUpdate: new Date("2024-03-18"),
    trend: "down",
  },
  {
    id: 3,
    name: "Pathology Slides",
    description: "Label pathology slides for cancer detection",
    progress: 90,
    tasks: 2000,
    completed: 1800,
    assignedUsers: 15,
    status: "Near Completion",
    lastUpdate: new Date("2024-03-19"),
    trend: "up",
  },
];

const chartData = [
  {
    date: "Jan 24",
    "Completed Tasks": 2451,
    "New Tasks": 3205,
  },
  {
    date: "Feb 24",
    "Completed Tasks": 3032,
    "New Tasks": 3128,
  },
  {
    date: "Mar 24",
    "Completed Tasks": 3485,
    "New Tasks": 2980,
  },
];

export default function ProjectsPage() {
  const [selectedView, setSelectedView] = useState("overview");
  const [showWizard, setShowWizard] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Project Management
              </h1>
              <p className="mt-2 text-lg text-gray-600">
                Manage and monitor your annotation projects
              </p>
            </div>
            <Button
              size="lg"
              variant="primary"
              icon={Plus}
              className="bg-primary text-white hover:bg-primary/90"
              onClick={() => setShowWizard(true)}
            >
              New Project
            </Button>
          </div>
        </motion.div>

        {showWizard ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Create New Project
              </h2>
              <button
                onClick={() => setShowWizard(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>
            <ProjectWizard />
          </motion.div>
        ) : (
          <TabGroup>
          <TabList className="mb-8">
            <Tab>Overview</Tab>
            <Tab>Projects</Tab>
            <Tab>Analytics</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ProjectMetrics />
              <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6 mt-6">
                <Card className="bg-white">
                  <Flex alignItems="start">
                    <div>
                      <Text>Total Projects</Text>
                      <Title>12</Title>
                    </div>
                    <Badge icon={FileCheck} color="blue">
                      +2 this month
                    </Badge>
                  </Flex>
                </Card>
                <Card className="bg-white">
                  <Flex alignItems="start">
                    <div>
                      <Text>Active Annotators</Text>
                      <Title>48</Title>
                    </div>
                    <Badge icon={Users} color="green">
                      +5 this week
                    </Badge>
                  </Flex>
                </Card>
                <Card className="bg-white">
                  <Flex alignItems="start">
                    <div>
                      <Text>Completion Rate</Text>
                      <Title>92%</Title>
                    </div>
                    <Badge icon={Clock} color="yellow">
                      On track
                    </Badge>
                  </Flex>
                </Card>
              </Grid>

              <Card className="mt-6 bg-white">
                <Title>Task Completion Trends</Title>
                <BarChart
                  className="mt-4 h-72"
                  data={chartData}
                  index="date"
                  categories={["Completed Tasks", "New Tasks"]}
                  colors={["emerald", "blue"]}
                  yAxisWidth={48}
                />
              </Card>
            </TabPanel>

            <TabPanel>
              <List>
                {projects.map((project) => (
                  <ListItem key={project.id} className="bg-white">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="w-full"
                    >
                      <Flex alignItems="start" className="gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Title>{project.name}</Title>
                            <div className="flex items-center gap-2">
                              {project.trend === "up" ? (
                                <ArrowUpRight className="h-4 w-4 text-green-500" />
                              ) : (
                                <ArrowDownRight className="h-4 w-4 text-red-500" />
                              )}
                              <Link
                                href="/projects/review"
                                className="text-sm text-primary hover:text-primary/80"
                              >
                                Review Annotations
                              </Link>
                            </div>
                          </div>
                          <Text>{project.description}</Text>
                          <div className="mt-2">
                            <Text>Progress</Text>
                            <ProgressBar value={project.progress} color="blue" className="mt-2" />
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge color={project.progress > 80 ? "green" : "blue"}>
                            {project.status}
                          </Badge>
                          <Text className="mt-2">
                            Last updated: {format(project.lastUpdate, "MMM d, yyyy")}
                          </Text>
                          <Text className="mt-1">
                            {project.completed} / {project.tasks} tasks completed
                          </Text>
                        </div>
                      </Flex>
                    </motion.div>
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            <TabPanel>
              <Grid numItems={1} numItemsSm={2} numItemsLg={2} className="gap-6">
                <Card className="bg-white">
                  <Title>Annotation Quality</Title>
                  <Text>Average agreement score across projects</Text>
                  <div className="mt-4">
                    <Text>Inter-annotator Agreement</Text>
                    <ProgressBar value={88} color="emerald" className="mt-2" />
                  </div>
                </Card>
                <Card className="bg-white">
                  <Title>Task Distribution</Title>
                  <Text>Current workload across annotators</Text>
                  <div className="mt-4">
                    <Text>Capacity Utilization</Text>
                    <ProgressBar value={75} color="blue" className="mt-2" />
                  </div>
                </Card>
              </Grid>
            </TabPanel>
          </TabPanels>
        </TabGroup>
        )}
      </div>
    </div>
  );
}
