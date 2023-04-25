import { prisma } from "~/db.server";

export async function getPhone() {
  const business = prisma.business.findUnique({ where: { id: 1 } });
  if (!business) {
    throw new Error("Business not found");
  }
  return business.phone
}