import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  const email = "rachel@remix.run";

  // cleanup the existing database
  await prisma.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  });

  const hashedPassword = await bcrypt.hash("racheliscool", 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });

  await prisma.business.create({
    data: {
      name: "Rachel's Business",
      logo: "https://picsum.photos/200",
      phone: "123-456-7890",
      address: "123 Main St",
      email: "test@email.com"
    }
  })
  const blogTag = await prisma.tag.create({
    data: {
      name: "blog"
    }
  })
  await prisma.blog.create({
    data: {
      title: "Rachel's Blog",
      user: { connect: { id: user.id } },
      blogBody: "This is a blog post",
      tags: { connect: { id: blogTag.id } },
      image: "https://picsum.photos/200"

    }
  })
  const residentialType = await prisma.serviceType.create({
    data: {
      name: "Residential"
    }
  })
  await prisma.testimony.create({
    data: {
      name: "Rachel's Testimony",
      image: "https://picsum.photos/200",
      testimonyBody: "This is a testimony",
      type: { connect: { id: residentialType.id } },
    }
  })

  await prisma.testimony.create({
    data: {
      name: "Rachel's Testimony",
      image: "https://picsum.photos/200",
      testimonyBody: "This is a testimony",
      type: { connect: { id: residentialType.id } },
    }
  })

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
