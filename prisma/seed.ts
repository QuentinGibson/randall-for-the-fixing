import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { searchForWorkspaceRoot } from "vite";
import {faker} from "@faker-js/faker"

const prisma = new PrismaClient();

async function seed() {
  const email = "random@remix.run";

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
      name: faker.name.fullName(),
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
      name: faker.name.fullName(),
      image: "https://picsum.photos/200",
      testimonyBody: "This is a testimony",
      type: { connect: { id: residentialType.id } },
    }
  })

  await prisma.testimony.create({
    data: {
      name: faker.name.fullName(),
      image: "https://picsum.photos/200",
      testimonyBody: "This is a testimony",
      type: { connect: { id: residentialType.id } },
    }
  })

  const services = [
    {
      title: "Driveways",
      image: "https://picsum.photos/200",
      type: { connect: { id: residentialType.id } },
      serviceDescription: "This service",
      subtext: "This is a subtext",
      serviceCta: "This is a service cta",
      serviceFiller: "This is a service filler",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: faker.lorem.words()
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
        name: faker.lorem.words()
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
        name: faker.lorem.words()
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
        name: faker.lorem.words()
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
        name: faker.lorem.words()
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
        name:faker.lorem.words()
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
        name: faker.lorem.words()
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
        name: faker.lorem.words(),
        }
      }
    }
  ]

  services.forEach(async (service) => {
    await prisma.service.create({
      data: service
    })
  })

  const drivewayId = await prisma.service.findUnique({
    where: {
      title: "Driveways"
    }
  }).then((service) => service?.id)

  const backyardId = await prisma.service.findUnique({
    where: {
      title: "Backyards"
    }
  }).then((service) => service?.id)

  const homeId = await prisma.service.findUnique({
    where: {
      title: "Homes"
    }
  }).then((service) => service?.id)

  const officeId = await prisma.service.findUnique({
    where: {
      title: "Office Buildings"
    }
  }).then((service) => service?.id)

  const projects = [
    {
      title: faker.lorem.words(),
      image: "https://picsum.photos/200",
      service: { connect: {id: drivewayId} },
      projectBody: faker.lorem.words(100)
    }, {
      title: faker.lorem.words(),
      image: "https://picsum.photos/200",
      service: { connect: {id: homeId} },
      projectBody: faker.lorem.words(100)
    },{
      title: faker.lorem.words(),
      image: "https://picsum.photos/200",
      service: { connect: {id: homeId} },
      projectBody: faker.lorem.words(100)
    }, {
      title: faker.lorem.words(),
      image: "https://picsum.photos/200",
      service: { connect: {id: officeId} },
      projectBody: faker.lorem.words(100)
    }, {
      title: faker.lorem.words(),
      image: "https://picsum.photos/200",
      service: { connect: {id: officeId} },
      projectBody: faker.lorem.words(100)
    }
  ]
  projects.forEach(async (project) => {
    await prisma.project.create({
      data: project
    })
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
