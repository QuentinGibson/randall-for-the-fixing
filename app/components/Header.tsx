import { CgMenuLeftAlt } from 'react-icons/cg';

import cn from 'classnames'
import { BsEnvelope, BsMap, BsPhone, BsPlusSquare, BsX, BsCaretDown, BsCaretDownFill } from 'react-icons/bs';
import { Link } from '@remix-run/react';
import { useMediaQuery } from 'usehooks-ts';
import { useState, useCallback } from 'react';

interface Business {
  logo: string,
  address: string,
  phone: string,
  email: string,
  name: string,
}

interface Service {
  id: string,
  title: string,
  slug: string,
  serviceName: string
}

interface ServiceType {
  name: string,
}

interface Project {
  title: string,
  slug: string,
  service: Service,
}

export default function Header({ business, services, projects }: { business: Business, services: Service[], projects: Project[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);
  const [isDesktopProjectsOpen, setIsDesktopProjectsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const commercialServices = services.filter(service => service.serviceName.includes('Commercial'));
  const residentialServices = services.filter(service => service.serviceName.includes('Residential'));
  const commercialProject = projects.filter(project => project.service.serviceName.includes('Commercial'));
  const residentialProject = projects.filter(project => project.service.serviceName.includes('Residential'));

  const handleMenuClick = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, [setIsMenuOpen]);
  const closeNavigation = useCallback(() => {
    setIsMenuOpen(false)
  }, [setIsMenuOpen])
  const handleDesktopMenuOnHover = useCallback((setMenuState: any) => {
    if (isDesktopServicesOpen) {
      setIsDesktopServicesOpen(false)
    } else if (isDesktopProjectsOpen) {
      setIsDesktopProjectsOpen(false)
    }
    setMenuState(true)
  }, [isDesktopProjectsOpen, isDesktopServicesOpen, setIsDesktopProjectsOpen, setIsDesktopServicesOpen])
  const closeMenu = useCallback((setMenuState: any) => {
    setMenuState(false)
  }, [])
  return (
    <>
      <header onMouseLeave={() => {
        if (isDesktopServicesOpen) {
          closeMenu(setIsDesktopServicesOpen)
        } else if (isDesktopProjectsOpen) {
          closeMenu(setIsDesktopProjectsOpen)
        }
      }}>
        <div className="flex justify-between h-[100px] fixed w-full z-50 bg-white px-8 py-4">
          <div className="flex">
            <Link to="/">
              <img className="h-full object-contain" src={business.logo} alt="Randall's For The Fixing Offical Logo" />
            </Link>
          </div>
          {isDesktop ? (
            <>
              <ul className="flex gap-8 items-center uppercase font-bold">
                <li>
                  <Link prefetch='intent' to="/">Home</Link>
                </li>
                <li>
                  <Link prefetch='intent' to="/about">About</Link>
                </li>
                <li onMouseEnter={() => { handleDesktopMenuOnHover(setIsDesktopServicesOpen) }}>
                  <div className='relative inline-block'>
                    <div className='flex gap-1 items-center'>
                      <Link prefetch='intent' to="/services">Services</Link>
                      <BsCaretDownFill />
                    </div>
                    {isDesktopServicesOpen && (
                      <div className='absolute right-0 origin-top-left bg-white px-4 py-2 mt-2 w-[350px] border '>
                        <ul className='px-4 grid grid-cols-2 grid-rows-4 list-disc gap-x-10 py-2'>
                          {services.map((service) => (
                            <li className='py-2'>
                              <Link to={`/services/${service.slug}`}>{service.title}</Link>
                            </li>
                          ))}

                        </ul>
                      </div>
                    )}
                  </div>
                </li>
                <li onMouseEnter={() => { handleDesktopMenuOnHover(setIsDesktopProjectsOpen) }}>
                  <div className='relative inline-block'>
                    <div className='flex gap-1 items-center'>
                      <Link prefetch='intent' to="/projects">Projects</Link>
                      <BsCaretDownFill />
                    </div>
                    {isDesktopProjectsOpen && (
                      <div className='absolute right-0 origin-top-left bg-white px-4 py-2 mt-2 w-[350px] border '>
                        <ul className='px-4 grid grid-cols-2 grid-rows-4 list-disc gap-x-10 py-2'>
                          {projects.map((project) => (
                            <li className='py-2'>
                              <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </li>
                <li>
                  <Link prefetch='intent' to="/contact">Contact</Link>
                </li>
              </ul>
            </>
          ) : (
            <div className='flex grow-0 shrink-0 basis-16 rounded-md hover:cursor-pointer hover:scale-105'>
              <button className="menu-button appearance-none w-full h-full" onClick={handleMenuClick}>
                <CgMenuLeftAlt className='w-full h-full text-yellow-300' />
              </button>
            </div>
          )}
        </div>

        <nav className="mobile-nav-menu pb-10">
          <div
            className={cn(
              'menu-overlay',
              {
                'opacity-100': isMenuOpen,
                'opacity-0': !isMenuOpen,
                'right-0': isMenuOpen,
                '-right-full': !isMenuOpen,
                'transition-opacity': true,
                'transition-transform': true,
              },
              'fixed top-0 bottom-0 z-50 bg-white w-full overflow-scroll max-w-md'
            )}
          >
            <div className="flex flex-col gap-6">
              <div className="flex h-[100px] justify-between px-8 py-4">
                <div className='flex'>
                  <img className='w-full h-full' src={business.logo} alt="" />
                </div>
                <div className='flex grow-0 shrink-0 basis-16 rounded-md hover:cursor-pointer hover:scale-105'>
                  <button className="menu-button appearance-none w-full h-full" onClick={handleMenuClick}>
                    <BsX className='w-full h-full text-yellow-300' />
                  </button>
                </div>
              </div>
              <div className="px-8 w-full">
                <ul className="w-full uppercase">
                  <li className='border-b border-gray-200 py-2 hover:text-blue-800 transition duration-100'>
                    <Link prefetch='intent' to="/" className='w-full h-full flex font-bold' onClick={closeNavigation}>Home</Link>
                  </li>
                  <li className='border-b border-gray-200 py-2 hover:text-blue-800 transition duration-100'>
                    <Link prefetch='intent' to="/about" className='w-full h-full flex font-bold' onClick={closeNavigation}>About</Link>
                  </li>
                  <li className='border-b border-gray-200 py-2 flex flex-col justify-between cursor-pointer' onClick={() => setIsServicesOpen(!isServicesOpen)}>
                    <div className="flex justify-between items-center">
                      <Link prefetch='intent' className='h-full flex font-bold hover:text-blue-800 transition duration-100' to="/services" onClick={closeNavigation}>Services</Link>
                      <BsPlusSquare className='hover:text-blue-800 transition-colors duration-100' />
                    </div>
                    {isServicesOpen && (
                      <ul className=''>
                        <li className='pl-6 py-4 pointer-events-none'>
                          Residential Services
                        </li>
                        {residentialServices.map((service) => (
                          <li className='border-b border-gray-200 py-2 px-6 hover:text-blue-800 transition duration-100 nav-list-item' key={service.id}>
                            <Link prefetch="intent" to={`/services/${service.slug}`} className='w-full h-full flex font-bold' onClick={closeNavigation}>{service.title}</Link>
                          </li>
                        ))}
                        <li className='pl-6 py-4 pointer-events-none'>Commercial Services</li>
                        {commercialServices.map((service) => (
                          <li className='border-b border-gray-200 py-2 px-6 hover:text-blue-800 transition duration-100 nav-list-item' key={service.id}>
                            <Link prefetch="intent" to={`/services/${service.slug}`} className='w-full h-full flex font-bold' onClick={closeNavigation}>{service.title}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                  <li className='border-b border-gray-200 py-2 flex flex-col justify-between cursor-pointer' onClick={() => setIsProjectsOpen(!isProjectsOpen)}>
                    <div className="flex justify-between items-center">
                      <Link prefetch="intent" className='h-full flex font-bold hover:text-blue-800 transition duration-100' to="/projects/" onClick={closeNavigation}>Projects</Link>
                      <BsPlusSquare className='hover:text-blue-800 transition-colors duration-100' />
                    </div>
                    {isProjectsOpen && (
                      <ul className=''>
                        <li className='pl-6 py-4 pointer-events-none'>
                          Residential Projects
                        </li>
                        {residentialProject.map((project) => (
                          <li className='border-b border-gray-200 py-2 px-6 hover:text-blue-800 transition duration-100 nav-list-item'>
                            <Link prefetch="intent" to={project.slug} className='w-full h-full flex font-bold' onClick={closeNavigation}>{project.title}</Link>
                          </li>
                        ))}
                        <li className='pl-6 py-4 pointer-events-none'>Commercial Projects</li>
                        {commercialProject.map((project) => (
                          <li className='border-b border-gray-200 py-2 px-6 hover:text-blue-800 transition duration-100 nav-list-item'>
                            <Link prefetch="intent" to={`/projects/${project.slug}`} className='w-full h-full flex font-bold' onClick={closeNavigation}>{project.title}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>

                  <li className='border-b border-gray-200 py-2 hover:text-blue-800 transition duration-100'>
                    <Link prefetch="intent" to="/contact" className='w-full h-full flex font-bold' onClick={closeNavigation}>Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className='py-12 px-8'>
              <h4 className="font-bold uppercase text-gray-700">Contact Info</h4>
              <div className='pl-1 flex flex-col gap-2'>
                <div className="flex items-center"><BsMap className='mr-4 text-lg' /><p className='font-bold text-lg'>{business.address}</p></div>
                <div className="flex items-center"><BsPhone className='mr-4 text-lg' /><p className='font-bold text-lg'>{business.phone}</p></div>
                <div className="flex items-center"><BsEnvelope className='mr-4 text-lg' /><p className='text-lg font-bold'>{business.email}</p></div>
              </div>
            </div>
          </div>
        </nav>
      </header >

    </>

  );
};