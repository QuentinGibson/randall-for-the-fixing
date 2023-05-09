import { Link } from "@remix-run/react";

export default function Adimn() {
  return (
    <section>
      <section className="mt-[100px] pt-28 pb-20 w-full relative" style={{ background: "url('/assets/svg/surf-background.svg') no-repeat center center / cover" }}>
        <div className="flex justify-center items-center">
          <h1 className="text-white font-bold text-4xl">Admin</h1>
        </div>
      </section>
      <section>
        <ul>
          <li>
            <Link to="/blog/newpost">New Post</Link>
          </li>
          <li>
            <Link to="/blog/edit">Edit Posts</Link>
          </li>
          <li>
            <Link to="/projects/newproject">New Project</Link>
          </li>
          <li>
            <Link to="/projects/edit">Edit Projects</Link>
          </li>
          <li>
            <Link to="/services/new">New Service</Link>
          </li>
          <li>
            <Link to="/services/edit">Edit Service</Link>
          </li>
        </ul>


      </section>
    </section>

  );
};