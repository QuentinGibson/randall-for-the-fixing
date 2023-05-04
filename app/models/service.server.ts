import { prisma } from "~/db.server";
export async function getServiceById(id:string) {
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) {
    throw new Error("Service not found");
  }
  return service
}

export async function getServiceBySlug(slug: string) {
  const service = await prisma.service.findUnique({ where: { slug } });
  if (!service) {
    throw new Error("Service not found");
  }
  return { service , message: "Service found" }
}

export async function getAllServices() {
  return await prisma.service.findMany();
}

export async function getServicesByCategory(category: string) {

  const services = await prisma.service.findMany({
    where: {
      type: {name: category}},
    include: {
      type: true
    }
    },
  );
  if (!services) {
    throw new Error("Category does not exist");
  }
  return services
}

export async function createService(data: any) {
  const service = await prisma.service.create({ data });
  if (!service) {
    throw new Error("Service not created");
  }
  return { service , message: "Service created successfully" }
}
export async function deleteService(id: string) {
  const service = await prisma.service.delete({ where: { id } });
  if (!service) {
    throw new Error("Service not deleted");
  }
  return { service , message: "Service deleted successfully" }
}