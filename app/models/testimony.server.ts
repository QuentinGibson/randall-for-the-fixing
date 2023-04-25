import { prisma } from "~/db.server";

export default async function getTestimonies() {
  const testimonies = prisma.testimonies.findMany();
  if (!testimonies) {
    throw new Error("No testimonies found");
  }
  return testimonies
 }