import { prisma } from "~/db.server";

export async function getTestimonies() {
  const testimonies = prisma.testimonies.findMany();
  if (!testimonies) {
    throw new Error("No testimonies found");
  }
  return { testimonies , message: "Testimonies found successfully"}
 }

 export async function createTestimony(data: any) {
   const testimony = await prisma.testimonies.create({ data });
   if (!testimony) {
     throw new Error("Testimony not created");
   }
   return { testimony , message: "Testimony created successfully" }
 }

export async function deleteTestimony(id: string) {
  const testimony = await prisma.testimonies.delete({ where: { id } });
  if (!testimony) {
    throw new Error("Testimony not deleted");
  }
  return { testimony , message: "Testimony deleted successfully" }
 }