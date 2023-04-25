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
  const fastReadTag = await prisma.tag.create({
    data: {
      name: "Fast Read"
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
      tags: { connect: [{ id: blogTag.id }, {id: fastReadTag.id}] },
     
      image: "https://picsum.photos/200"

    }
  })
  const commercialType = await prisma.serviceType.create({
    data: {
      name: "Commercial"
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

  const services = [
    {
      title: "Driveways",
      image: "https://picsum.photos/200",
      serviceDescription: "This service",
      subtext: "This is a subtext",
      serviceCta: "This is a service cta",
      serviceFiller: "This is a service filler",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: "Rachel's Gallery"
        }
      }
    }, {
      title: "Homes",
      image: "https://picsum.photos/200",
      type: { connect: { id: commercialType.id } },
      subtext: "This is a subtext",
      serviceCta: "This is a service cta",
      serviceFiller: "This is a service filler",
      serviceDescription: "This service",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: "Rachel's Gallery"
        }
      }
    }, {
      title: "Backyards",
      image: "https://picsum.photos/200",
      type: { connect: { id: commercialType.id } },
      subtext: "This is a subtext",
      serviceCta: "This is a service cta",
      serviceDescription: "This service",
      serviceFiller: "This is a service filler",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: "Rachel's Gallery"
        }
      }
    },{
      title: "Front Porches",
      image: "https://picsum.photos/200",
      serviceDescription: "This service",
      type: { connect: { id: commercialType.id } },
      subtext: "This is a subtext",
      serviceCta: "This is a service cta",
      serviceFiller: "This is a service filler",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: "Rachel's Gallery"
        }
      }
    },{
      title: "Office Buildings",
      image: "https://picsum.photos/200",
      serviceDescription: "This service",
      type: { connect: { id: commercialType.id } },
      subtext: "This is a subtext",
      serviceCta: "This is a service cta",
      serviceFiller: "This is a service filler",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: "Rachel's Gallery"
        }
      }
    },{
      title: "Curbsides",
      image: "https://picsum.photos/200",
      serviceDescription: "This service",
      type: { connect: { id: commercialType.id } },
      subtext: "This is a subtext",
      serviceCta: "This is a service cta",
      serviceFiller: "This is a service filler",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: "Rachel's Gallery"
        }
      }
    },{
      title: "Outside Cleaning",
      serviceDescription: "This service",
      image: "https://picsum.photos/200",
      type: { connect: { id: commercialType.id } },
      subtext: "This is a subtext",
      serviceCta: "This is a service cta",
      serviceFiller: "This is a service filler",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: "Rachel's Gallery"
        }
      }
    },{
      title: "Outside Dining",
      image: "https://picsum.photos/200",
      serviceDescription: "This service",
      type: { connect: { id: commercialType.id } },
      subtext: "This is a subtext",
      serviceCta: "This is a service cta",
      serviceFiller: "This is a service filler",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: "Rachel's Gallery"
        }
      }
    }
  ]

  services.forEach(async (service) => {
    await prisma.service.create({
      data: service
    })
  })

  const project = await prisma.project.create({
    data: {
      title: "Rachel's Project",
      image: "https://picsum.photos/200",
      service: { connect: {title: "Driveways"}  },
      projectBody: "This is a project",
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
