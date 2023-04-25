import { prisma } from "~/db.server";

export async function getProjectById(id:string) {
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) {
    throw new Error("Project not found");
  }
  return project
}

export async function getProjects() {
  const projects = await prisma.project.findMany();
  if (!projects) {
    throw new Error("No projects found");
  }
  return projects
}

export async function createProject(data: any) {
  const project = await prisma.project.create({ data });
  if (!project) {
    throw new Error("Project not created");
  }
  return project
}

export async function deleteProject(id: string) {
  const project = await prisma.project.delete({ where: { id } });
  if (!project) {
    throw new Error("Project not deleted");
  }
  return project
}