import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ business, services, projects, children }: any) {
  return (
    <main>
      <Header business={business} services={services} projects={projects} />
      {children}
      <Footer business={business} />
    </main>


  );
};