import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ business, services, projects, children }: any) {
  return (
    <>
      <Header business={business} services={services} projects={projects} />
      <main>
        {children}
      </main>
      <Footer business={business} />
    </>


  );
};