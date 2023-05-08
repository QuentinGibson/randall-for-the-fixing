import { DataFunctionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { requireUser } from "~/session.server";
import { useQuill } from 'react-quilljs';
import draftCSS from "quill/dist/quill.snow.css";
import { useEffect, useState } from "react";


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
              <div className="flex flex-col bg-blue-200">
                <button type="submit">Submit</button>
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

export const action = async ({ request, params }: DataFunctionArgs) => {
  const formData = await request.m();
  const { image, title, slug, content } = Object.fromEntries(formData);

};
