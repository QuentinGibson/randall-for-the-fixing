import type { V2_MetaFunction } from "@remix-run/node";
import Header from "~/components/Header";
import Hero from "~/components/Hero";

export const meta: V2_MetaFunction = () => [{ title: "Randall's for the Fixing" }];

export default function Index() {
  return (
    <>
      <Header />
      <Hero />
    </>
  );
}
