import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { getUser } from "~/session.server";
import tailwindStylesheetUrl from "~/styles/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
];

export const loader = async ({ request }: LoaderArgs) => {
  return json({ user: await getUser(request) });
};

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script src="assets/js/vendor/jquery.js"></script>
        <script src="assets/js/vendor/waypoints.js"></script>
        <script src="assets/js/bootstrap-bundle.js"></script>
        <script src="assets/js/meanmenu.js"></script>
        <script src="assets/js/swiper-bundle.js"></script>
        <script src="assets/js/splide.js"></script>
        <script src="assets/js/slick.min.js"></script>
        <script src="assets/js/nouislider.js"></script>
        <script src="assets/js/magnific-popup.js"></script>
        <script src="assets/js/nice-select.js"></script>
        <script src="assets/js/wow.js"></script>
        <script src="assets/js/datepicker.js"></script>
        <script src="assets/js/isotope-pkgd.js"></script>
        <script src="assets/js/imagesloaded-pkgd.js"></script>
        <script src="assets/js/jquery.appear.js"></script>
        <script src="assets/js/jquery.knob.js"></script>
        <script src="assets/js/circularProgressBar.min.js"></script>
        <script src="assets/js/purecounter.js"></script>
        <script src="assets/js/ajax-form.js"></script>
        <script src="assets/js/main.js"></script>
      </body>
    </html>
  );
}
