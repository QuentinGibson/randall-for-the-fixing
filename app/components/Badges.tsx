interface Badge {
  url: string,
  altText: string
}
export default function Badges() {
  const badges: Badge[] = [
    {
      url: 'assets/img/brand/home-2/img-1.webp',
      altText: 'Award for best in Atlanta Georgia'
    }, {
      url: 'assets/img/brand/home-2/img-2.webp',
      altText: 'Angie List\'s Super Service Award'
    }, {
      url: 'assets/img/brand/home-2/img-3.webp',
      altText: 'Neighboorhood favorite Award'
    }, {
      url: 'assets/img/brand/home-2/img-4.webp',
      altText: 'IIRC Award'
    }, {
      url: 'assets/img/brand/home-2/img-5.webp',
      altText: 'BBB Award'
    }, {
      url: 'assets/img/brand/home-2/img-6.webp',
      altText: 'Winner Award'
    }, {
      url: 'assets/img/brand/home-2/img-7.webp',
      altText: 'CleanTrust Certified Award'
    }
  ]
  return (
    <section className="mt-12">
      <div className="flex flex-col items-center justify-center gap-8">
        <div className="flex">
          <div className="bg-gradient-to-r from-yellow-400 to-transparent text-sm py-2 pl-6 pr-6 blue-block relative">
            <p className="">Trusted Service's</p>
          </div>
        </div>
        <h3 className="text-5xl font-bold text-center">Award Winning Service</h3>
        <div className="flex flex-wrap gap-8 justify-center">
          {badges.map(badge => (
            <div className="relative">
              <img src={badge.url} alt={badge.altText} className="w-full h-auto filter grayscale transition duration-500 ease-in-out hover:grayscale-0" width={50} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};