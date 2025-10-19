import logo from '../assets/2.png';
import { Link } from 'react-router';

const footerItems = [
  {
    title: 'Theo dõi chúng tôi',
    links: [
      {
        label: 'Facebook',
        href: 'https://www.facebook.com/profile.php?id=61580628163581'
      },
      {
        label: 'Tiktok',
        href: 'https://www.tiktok.com/@ribbonbox.daily'
      }
    ],
    type: 'external'
  }
];

function Footer() {
  return (
    <div>
      <footer className='bg-[#FAE8D7]'>
        <div className='mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8'>
          <div className='md:flex md:justify-between'>
            <div className='mb-5 md:mb-0'>
              <a href='/' className='flex items-center'>
                <img src={logo} className='h-40 me-3' alt='RibbonBox Logo' />
                <span className='self-center text-2xl font-semibold whitespace-nowrap text-[#AD3542]'>
                  Ribbon Box
                </span>
              </a>
            </div>

            <div className='grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4'>
              {footerItems.map(section => (
                <div key={section.title}>
                  <h2 className='mb-6 text-sm font-semibold text-[#AD3542] uppercase'>
                    {section.title}
                  </h2>
                  <ul className='text-[#AD3542] font-medium space-y-2'>
                    {section.links.map((item, index) =>
                      section.type === 'internal' ? (
                        <li key={item?.to}>
                          <Link
                            to={item?.to}
                            className='hover:text-[#C25C61] transition'
                          >
                            {item.label}
                          </Link>
                        </li>
                      ) : (
                        <li key={`${item.label}-${index}`}>
                          <a
                            href={item.href}
                            className='hover:text-[#C25C61] transition'
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            {item.label}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />

          <div className='sm:flex sm:items-center sm:justify-between'>
            <span className='text-sm text-[#AD3542] sm:text-center'>
              © 2025{' '}
              <a href='/' className='hover:text-[#C25C61]'>
                Ribbon Box™
              </a>
              . Mọi quyền được bảo lưu.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
