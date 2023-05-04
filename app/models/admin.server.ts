import { prisma } from "~/db.server"

export async function checkAdmin(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      email: true,
    }
  })
  if (!user) {
    throw new Error('User not found')
  }
  if (user.email === "quentingibson94+admin@gmail.com") {
    return true 
  }
  return false
}

export async function createStartState(userId: string) {
  if (!checkAdmin(userId)) {
    throw new Error('User is not an admin')
  } 
  
}