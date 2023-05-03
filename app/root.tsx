import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import tailwindStylesheetUrl from "~/styles/tailwind.css";
import themeStylesheetUrl from "~/styles/theme.css"
import Layout from "./components/Layout";
import { getBusinessById, getIdForFirstBusiness } from "./models/business.server";
import { getAllServices } from "./models/service.server";
import { getProjects } from "./models/project.server";

export const links: LinksFunction = () => {
  return [
    ...(cssBundleHref
      ? [{ rel: "stylesheet", href: cssBundleHref }]
      : []),
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: themeStylesheetUrl }
  ]
};

export const loader = async ({ request }: LoaderArgs) => {
  const firstBusinessId = await getIdForFirstBusiness().then(res => res.businessID)
  const business = await getBusinessById(firstBusinessId).then(res => res.business)
  const services = await getAllServices();
  const projects = await getProjects()
  return json({ user: await getUser(request), business, services, projects });
};

export default function App() {
  const { business, services, projects } = useLoaderData<typeof loader>();
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Layout business={business} services={services} projects={projects}>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
