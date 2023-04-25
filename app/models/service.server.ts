import { prisma } from "~/db.server";
export async function getServiceById(id:string) {
  const service = prisma.service.findUnique({ where: { id } });
  if (!service) {
    throw new Error("Service not found");
  }
  return service
}

export async function getAllServices() {
  return prisma.service.findMany();
}

export async function getServicesByCategory(category: string) {

  const services = prisma.service.findMany({
    where: {
      type: {name: category}},
    },
  );
  if (!services) {
    throw new Error("Category does not exist");
  }
  return services
}
