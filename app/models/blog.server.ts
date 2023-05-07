import { prisma } from "~/db.server";

export async function getBlogById(id:string) {
  const blog = await prisma.blog.findUnique({ where: { id } });
  if (!blog) {
    throw new Error("Blog not found");
  }
  return { blog , message: "Blog found successfully"}
}

export async function getBlogBySlug(slug: string) {
  const blog = await prisma.blog.findUnique({ where: { slug } });
  if (!blog) {
    throw new Error("Blog not found");
  }
  return { blog , message: "Blog found successfully"}
}
export async function getBlogs() {
  const blogs = await prisma.blog.findMany();
  if (!blogs) {
    throw new Error("No blogs found");
  }
  return { blogs , message: "Blogs found successfully"}
}

export async function createBlog(data: any) {
  const blog = await prisma.blog.create({ data });
  if (!blog) {
    throw new Error("Blog not created");
  }
  return { blog , message: "Blog created successfully" }
}

export async function deleteBlog(id: string) {
  const blog = await prisma.blog.delete({ where: { id } });
  if (!blog) {
    throw new Error("Blog not deleted");
  }
  return { blog , message: "Blog deleted successfully" }
}