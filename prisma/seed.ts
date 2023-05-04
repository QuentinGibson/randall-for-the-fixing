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
      name: "Randall’s For The Fixing",
      logo: "https://picsum.photos/200",
      phone: "4704612731",
      address: "Bohannon Road, Fairburn, GA 30213",
      email: "Randallsforthefixing1@gmail.com"
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
  const posts = [
    {
      title: "How to mantain your driveway and keep it looking new",
      user: { connect: { id: user.id } },
      slug: "how-to-mantain-your-driveway-and-keep-it-looking-new",
      blogBody: "This is how you maintain your driveway. Maintaining your driveway is important. But finding time to do it is hard.",
      tags: { connect: [{ id: blogTag.id }, { id: fastReadTag.id }] },
      image: "https://picsum.photos/200"
    }, {
      title: "Why Regular Pressure Washing is Essential for Your Home or Business",
      user: { connect: { id: user.id } },
      slug: "why-regular-pressure-washing-is-essential-for-your-home-or-business",
      blogBody: "Pressure washing is a great way to keep your home or business looking clean and fresh. It can also help prevent damage from mold, mildew, and other harmful substances. But how often should you pressure wash? And what are the benefits of doing so? In this blog post, we'll answer these questions and more!",
      tags: { connect: [{ id: blogTag.id },] },
      image: "https://picsum.photos/200"
    }, {
      title: "The Dos and Don'ts of DIY Pressure Washing",
      user: { connect: { id: user.id } },
      slug: "do-and-donts-of-diy-pressure-washing",
      blogBody: "Pressure washing is a great way to keep your home or business looking clean and fresh. It can also help prevent damage from mold, mildew, and other harmful substances. But how often should you pressure wash? And what are the benefits of doing so? In this blog post, we'll answer these questions and more!",
      tags: { connect: [{ id: blogTag.id },] },
      image: "https://picsum.photos/200"
    },{
      title: "The Importance of Grease Trap Cleaning for Your Restaurant or Commercial Kitchen",
      user: { connect: { id: user.id } },
      slug: "importance-of-grease-trap-cleaning-for-your-restaurant-or-commercial-kitchen",
      blogBody: "Pressure washing is a great way to keep your home or business looking clean and fresh. It can also help prevent damage from mold, mildew, and other harmful substances. But how often should you pressure wash? And what are the benefits of doing so? In this blog post, we'll answer these questions and more!",
      tags: { connect: [{ id: blogTag.id },] },
      image: "https://picsum.photos/200"
    } , {
      title: "How to Choose the Right Pressure Washing Company for Your Needs",
      user: { connect: { id: user.id } },
      slug: "choose-the-right-pressure-washing-company",
      blogBody: "This blog post could offer advice on what to look for when choosing a pressure washing company, such as experience, equipment, and customer reviews.",
      tags: { connect: [{ id: blogTag.id }, { id: fastReadTag.id }] },
      image: "https://picsum.photos/200"
    }
  ]
  posts.forEach(async (post) => {
    await prisma.blog.create({
      data: post
  })
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

  const testimonies = [
    {
      name: faker.name.fullName(),
      image: "https://picsum.photos/200",
      testimonyBody: "I was so impressed with the quality of the pressure washing services provided by this company. Their team was professional and efficient, and they really took the time to ensure that every surface was cleaned to perfection. Our property looks brand new again! I highly recommend their services.",
      type: { connect: { id: residentialType.id } },
    }, {

      name: faker.name.fullName(),
      image: "https://picsum.photos/200",
      testimonyBody: "As a business owner, safety and sanitation are top priorities for me. I was really impressed with the thoroughness of this company's grease trap and sidewalk pressure washing services. They not only made our property look great, but they also helped us maintain a safe and hygienic environment for our customers and employees. I will definitely be using their services again in the future.",
      type: { connect: { id: residentialType.id } },
    }, {

      name: faker.name.fullName(),
      image: "https://picsum.photos/200",
      testimonyBody: "I had never used a pressure washing service before, but I am so glad I did. The team from this company was knowledgeable, friendly, and really took the time to explain the process to me. They were also very careful around delicate surfaces and landscaping. I was blown away by the results and would definitely recommend them to anyone looking for a reliable and high-quality pressure washing service.",
      type: { connect: { id: residentialType.id } },
    }, {
      name: faker.name.fullName(),
      image: "https://picsum.photos/200",
      testimonyBody: "I was preparing to sell my house and needed to make sure it was looking its best. I contacted this pressure washing company and they did an amazing job. They made my house's exterior look practically brand new. Their team was very friendly and easy to work with, and they completed the job in a timely manner. I would highly recommend their services to anyone looking to improve the appearance of their home.",
      type: { connect: { id: residentialType.id } },
    }, {

      name: faker.name.fullName(),
      image: "https://picsum.photos/200",
      testimonyBody: "I run a restaurant and was in dire need of a professional grease trap cleaning service. I came across this company and they did an excellent job. They were prompt, efficient, and got the job done in no time. They even provided some useful tips on how to keep the grease trap clean and well-maintained. I highly recommend them to anyone who needs this service.",
      type: { connect: { id: commercialType.id } },
    }, {
      name: faker.name.fullName(),
      image: "https://picsum.photos/200",
      testimonyBody: "I had some unsightly stains on my siding and driveway that had been bothering me for a while. I finally decided to hire a pressure washing company and I am so glad I chose this one. They were able to remove every single stain and my property looks so much better now. The team was friendly, professional, and really knew what they were doing. I would definitely use their services again in the future.",
      type: { connect: { id: commercialType.id } },
    }
  ]

  testimonies.forEach(async (testimony) => {
    await prisma.testimony.create({
      data: testimony
    })
  })

  const services = [
    {
      title: "Driveways",
      image: "https://picsum.photos/200",
      type: { connect: { id: residentialType.id } },
      slug: "driveways",
      serviceDescription: "Driveways are an essential component of a home, serving both functional and aesthetic purposes. They not only provide a path for vehicles and pedestrians to access the property but also contribute significantly to the curb appeal and value of a home. Over time, driveways accumulate dirt, grime, and stains, which can diminish their appearance and potentially cause damage if left unaddressed.",
      subtext: "Enhance your home's curb appeal with quality driveway washing.",
      serviceCta: "As a web developer, we understand the importance of providing exceptional services and value to our clients. Our driveway washing services are designed to meet the highest quality standards, and we are committed to delivering outstanding results. When you choose to work with us, you can trust that your driveway will be treated with the utmost care and professionalism. Don't hesitate to contact us for a quote or to discuss your driveway washing needs, and let us help you maintain the beauty and value of your home.",
      serviceFiller: "Our professional driveway washing services are designed to tackle these issues with a range of features. We utilize advanced home washing techniques and eco-friendly cleaning solutions to effectively remove dirt, grime, and stains from various driveway materials, such as concrete, asphalt, or pavers. Additionally, our team of experts is experienced in pressure washing techniques that are gentle yet effective, ensuring the longevity and durability of your driveway.",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: faker.lorem.words()
        }
      }
    }, {
      title: "Homes",
      image: "https://picsum.photos/200",
      slug: "homes",
      type: { connect: { id: residentialType.id } },
      subtext: "Elevate your home's appearance with professional exterior washing.",
      serviceCta: "We recognize the importance of delivering superior services and value to our clients. When you choose our home washing services, you can trust that we will treat your property with the utmost care and professionalism. We are committed to ensuring that your home looks impeccable and retains its value for years to come. Contact us today for a quote or to discuss your home washing needs, and let us help you maintain the beauty and longevity of your property.",
      serviceFiller: "Our comprehensive home washing services address these concerns with various features designed to provide exceptional quality and results. Our skilled professionals utilize advanced equipment and techniques to eliminate contaminants from various siding materials, such as brick, stucco, vinyl, or wood. We also use environmentally friendly cleaning solutions and methods to protect your home's surfaces and the surrounding environment, ensuring the safety and well-being of your family.",
      serviceDescription: "A well-maintained home exterior is vital for every homeowner, as it significantly impacts the overall appearance, curb appeal, and value of the property. Dirt, grime, mold, and other contaminants can accumulate on the exterior surfaces, detracting from the home's beauty and potentially causing damage if left untreated.",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: faker.lorem.words()
        }
      }
    }, {
      title: "Backyards",
      slug: "backyards",
      image: "https://picsum.photos/200",
      type: { connect: { id: residentialType.id } },
      subtext: "Transform your backyard space with meticulous patio cleaning.",
      serviceCta: "As a web developer, we understand the importance of providing exceptional services and value to our clients. Our backyard cleaning services are designed to meet the highest quality standards, and we are committed to delivering outstanding results. Contact us today for a quote or to discuss your backyard cleaning needs, and let us help you maintain the beauty and functionality of your outdoor living space.",
      serviceDescription: "A well-maintained backyard serves as an extension of your living space, offering a comfortable area to relax, entertain, and enjoy the outdoors. Over time, back patios and brick surfaces can accumulate dirt, grime, and stains, which can detract from the beauty and functionality of your backyard oasis.",
      serviceFiller: "Our expert backyard cleaning services are designed to address these concerns by offering a range of features that focus on cleaning bricks and back patios. We utilize advanced cleaning techniques and eco-friendly solutions to effectively remove dirt, stains, and moss, restoring the beauty and appeal of your outdoor living space. Our team is experienced in handling various patio materials and designs, ensuring that your backyard is well-maintained and inviting.",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: faker.lorem.words()
        }
      }
    },{
      title: "Front Porches",
      slug: "front-porches",
      image: "https://picsum.photos/200",
      serviceDescription: "A front porch is often the first impression of your home and plays a crucial role in establishing its curb appeal. Over time, front patios and brick surfaces can accumulate dirt, grime, and stains, which can detract from the welcoming appearance of your front yard.",
      type: { connect: { id: residentialType.id } },
      subtext: "Revitalize your front porch and boost your home's charm.",
      serviceCta: "As a web developer, we understand the importance of providing exceptional services and value to our clients. Our front porch cleaning services are designed to meet the highest quality standards, and we are committed to delivering outstanding results. Contact us today for a quote or to discuss your front porch cleaning needs, and let us help you maintain the beauty and appeal of your front yard.",
      serviceFiller: "Our front porch cleaning services are designed to address these concerns by offering a range of features that focus on restoring the appearance of bricks and front patios. We utilize advanced cleaning techniques and eco-friendly solutions to effectively remove dirt, stains, and moss, enhancing your front yard's curb appeal. Our team is experienced in handling various patio materials and designs, ensuring that your front porch is well-maintained and inviting.",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: faker.lorem.words()
        }
      }
    },{
      title: "Office Buildings",
      slug: "office-buildings",
      image: "https://picsum.photos/200",
      serviceDescription: "A clean and well-maintained office building is crucial for reflecting professionalism and attention to detail. Over time, exterior bricks and windows can accumulate dirt, grime, and stains, detracting from the building's appearance and potentially impacting the occupants' well-being.",
      type: { connect: { id: commercialType.id } },
      subtext: "Upgrade your commercial property with pristine window cleaning.",
      serviceCta: "As a web developer, we understand the importance of providing exceptional services and value to our clients. Our office building cleaning services are designed to meet the highest quality standards, and we are committed to delivering outstanding results. Contact us today for a quote or to discuss your office building cleaning needs, and let us help you maintain the beauty and professionalism of your commercial property.",
      serviceFiller: "Our commercial office building cleaning services cater to both exterior bricks and windows, offering a range of features that ensure a spotless and visually appealing environment. We utilize advanced cleaning techniques, including pressure washing and window cleaning, to provide a thorough clean that enhances the building's appearance. Our team is experienced in handling various building materials and designs, ensuring that your office building is well-maintained and professional.",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: faker.lorem.words()
        }
      }
    },{
      title: "Curbsides",
      slug: "curbsides",
      image: "https://picsum.photos/200",
      serviceDescription: "A clean and well-maintained curbside and sidewalk can significantly impact your property's appearance and overall curb appeal. Over time, dirt, grime, and stains can accumulate, detracting from the beauty of your residential",
      type: { connect: { id: commercialType.id } },
      subtext: "Enhance residential curb appeal through expert sidewalk cleaning.",
      serviceCta: "As a web developer, we understand the importance of providing exceptional services and value to our clients. Our curbside cleaning services are designed to meet the highest quality standards, and we are committed to delivering outstanding results. Contact us today for a quote or to discuss your curbside cleaning needs, and let us help you maintain the beauty and safety of your residential property.",
      serviceFiller: " Our residential curbside cleaning services are designed to address these concerns by offering a range of features that focus on removing dirt, grime, and stains from curbsides and sidewalks. We utilize advanced cleaning techniques and eco-friendly solutions to effectively clean these areas, ensuring that your home's surroundings are safe and visually appealing. Our team is experienced in handling various materials and designs, ensuring that your curbside and sidewalk are well-maintained and inviting.",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name:faker.lorem.words()
        }
      }
    },{
      title: "Outside Dining",
      slug: "outside-dining",
      serviceDescription: "An inviting and clean outside dining area is essential for any restaurant or café, as it significantly contributes to the overall customer experience. Over time, brick surfaces and dining areas can accumulate dirt, grime, and stains, detracting from the welcoming atmosphere that patrons expect.",
      image: "https://picsum.photos/200",
      type: { connect: { id: commercialType.id } },
      subtext: "Create a welcoming dining area with exceptional outdoor cleaning.",
      serviceCta: "As a web developer, we understand the importance of providing exceptional services and value to our clients. Our outside dining area cleaning services are designed to meet the highest quality standards, and we are committed to delivering outstanding results. Contact us today for a quote or to discuss your commercial cleaning needs, and let us help you create a welcoming atmosphere that will keep your patrons coming back for more.",
      serviceFiller: "Our commercial cleaning services specialize in maintaining outdoor dining areas, offering a range of features that focus on cleaning brick surfaces and dining spaces. We utilize advanced cleaning techniques and eco-friendly solutions to effectively remove dirt, stains, and moss, ensuring that your outside dining area is comfortable and pleasant for your customers. Our team is experienced in handling various materials and designs, ensuring that your dining space is well-maintained and inviting.",
      gallery: {
        create: {
        image: "https://picsum.photos/200",
        name: faker.lorem.words()
        }
      }
    },{
      title: "Outside Cleaning",
      slug: "outside-cleaning",
      image: "https://picsum.photos/200",
      serviceDescription: "Maintaining a clean and visually appealing exterior is essential for both commercial and residential properties, as it significantly contributes to the overall appeal, value, and safety of the space. Over time, exterior surfaces can accumulate dirt, grime, mold, and stains, which can detract from the appearance and potentially cause damage if left unaddressed.",
      type: { connect: { id: commercialType.id } },
      subtext: "Preserve property value with comprehensive outside cleaning services.",
      serviceCta: "As a web developer, we understand the importance of providing exceptional services and value to our clients. Our outside cleaning services are designed to meet the highest quality standards, and we are committed to delivering outstanding results. When you choose to work with us, you can trust that your property will be treated with the utmost care and professionalism. Contact us today for a quote or to discuss your outside cleaning needs, and let us help you maintain the beauty and longevity of your property.",
      serviceFiller: "Our outside cleaning services cater to a wide range of exterior surfaces, offering features that focus on removing dirt, grime, and other contaminants from various materials, such as brick, concrete, wood, or vinyl siding. We utilize advanced cleaning techniques, including pressure washing and soft washing, to provide a thorough clean that enhances the appearance and longevity of your property. Our team is experienced in handling various property types, ensuring that your commercial or residential space is well-maintained and inviting.",
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
      slug: 'driveway-1',
      image: "https://picsum.photos/200",
      service: { connect: {id: drivewayId} },
      projectBody: faker.lorem.words(100)
    }, {
      title: faker.lorem.words(),
      slug: 'home-1',
      image: "https://picsum.photos/200",
      service: { connect: {id: homeId} },
      projectBody: faker.lorem.words(100)
    },{
      title: faker.lorem.words(),
      slug: 'home-2',
      image: "https://picsum.photos/200",
      service: { connect: {id: homeId} },
      projectBody: faker.lorem.words(100)
    }, {
      title: faker.lorem.words(),
      slug: 'office-1',
      image: "https://picsum.photos/200",
      service: { connect: {id: officeId} },
      projectBody: faker.lorem.words(100)
    }, {
      title: faker.lorem.words(),
      slug: 'office-2',
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
