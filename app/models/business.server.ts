import { prisma } from "~/db.server";
export async function getBusinessById(id: string) {
  const business = prisma.business.findUnique({ where: { id } });
  if (!business) {
    throw new Error("Business not found");
  }
  return { business , message: "Business found successfully"}
}

export async function createBusiness(data: any) {
  const business = prisma.business.create(data)
  if (!business) {
    throw new Error("Business not created");
  }
  return { business , message: "Business created successfully" }
}

export async function deleteBusiness(id: string) {
  const business = prisma.business.delete({ where: { id } });
  if (!business) {
    throw new Error("Business not deleted");
  }
  return { business , message: "Business deleted successfully" }
}

export async function getIdForFirstBusiness() {
  const business = await prisma.business.findFirst();
  if (!business) {
    throw new Error("Business not found");
  }
  return { businessID: business.id , message: "Business found successfully"}
}