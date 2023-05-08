import { DataFunctionArgs, LoaderArgs, redirect, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { requireUser } from "~/session.server";
import { useQuill } from 'react-quilljs';
import draftCSS from "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import { createBlog } from "~/models/blog.server";
import invariant from "tiny-invariant";


export const links = () => [{ rel: "stylesheet", href: draftCSS }];

export const loader = async ({ request, params }: LoaderArgs) => {
  const user = await requireUser(request)
  if (!user) return redirect("/login");
  return { user };
};
export default function NewPostRoute() {
  const newPostFetcher = useFetcher();
  const { quill, quillRef } = useQuill();
  const [content, setContent] = useState<string>("")
  useEffect(() => {
    quill?.on('text-change', () => {
      setContent(quill?.root.innerHTML)
    })
  }, [quill])
  return (
    <section>
      <section className="pt-28 pb-20 w-full relative" style={{ background: "url('/assets/svg/surf-background.svg') no-repeat center center / cover" }}>
        <div className="flex justify-center items-center">
          <h1 className="text-white font-bold text-4xl">New Post</h1>
        </div>
      </section>
      <section className="">
        <div className="grid grid-cols-[2fr_1fr]">
          <newPostFetcher.Form method="POST" encType="mulipart/form-data">
            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4 px-4 py-4 bg-blue-100 justify-center items-center">
                <label className="font-bold" htmlFor="image">Blog Image</label>
                <div className="flex item-center justify-center">
                  <input type="file" name="image" id="image" />
                </div>
              </div>
              <div className="flex flex-col gap-4 px-4 py-4 bg-blue-100 justify-center items-center">
                <label htmlFor="title">Title</label>
                <input placeholder="Enter title here" className="w-full max-w-sm px-4 py-3" type="text" name="title" id="title" />
              </div>
              <div className="flex flex-col gap-4 px-4 py-4 bg-blue-100 justify-center items-center">
                <label className="flex item-center justify-center" htmlFor="slug">Slug</label>
                <input placeholder="Enter slug here" className="w-full max-w-sm px-4 py-3" type="text" name="slug" id="slug" />
              </div>
              <div className="flex flex-col bg-blue-200">
                <label htmlFor="content">Content</label>
                <div className="my-8">
                  <div className="w-full h-[500px] bg-slate-300">
                    <div ref={quillRef} className="bg-white"></div>
                    <input type="hidden" name="content" value={content} />
                  </div>

                </div>
              </div>
              <div className="flex">
                <button className="bg-blue-200 px-8 py-3 w-full my-8" type="submit">Submit</button>
              </div>
            </div>
          </newPostFetcher.Form>
        </div >
        <div className="flex flex-col">
        </div>
      </section >
    </section >
  );
};

interface Image {
  filepath: string;
  type: string;
  name: string;
}

export const action = async ({ request, params }: DataFunctionArgs) => {
  const user = await requireUser(request)
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      directory: "./public/uploads",
      avoidFileConflicts: true,
      file: ({ filename }) => filename,
    }),
    // parse everything else into memory
    unstable_createMemoryUploadHandler()
  );
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const image = formData.get("image") as unknown as Image;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const content = formData.get("content") as string;
  const publicIndex = image.filepath.indexOf("uploads")

  const url = image.filepath.slice(publicIndex)

  invariant(image, "Image is required")
  invariant(title, "Title is required")
  invariant(slug, "Slug is required")
  invariant(content, "Content is required")

  invariant(image.filepath.includes("/uploads"), "Image must be uploaded")
  invariant(title.length > 0, "Title must be longer than 0")
  invariant(slug.length > 0, "Slug must be longer than 0")
  invariant(content.length > 0, "Content must be longer than 0")

  invariant(url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg") || url.endsWith(".jfif") || url.endsWith("webp"), "Image must be a png, jpg, or jpeg")
  invariant(slug.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), "Slug must be a valid slug")
  invariant(title.length < 100, "Title must be less than 100 characters")
  invariant(content.length < 10000, "Content must be less than 10000 characters")
  invariant(content.length > 100, "Content must be more than 100 characters")

  await createBlog({
    image: url,
    title,
    slug,
    blogBody: content,
    userId: user.id
  })
  return redirect("/blog")
};
