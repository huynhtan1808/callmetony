import Link from 'next/link';

import useSite from 'hooks/use-site';
import { postPathBySlug } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';

import Section from 'components/Section';
import Container from 'components/Container';

import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const { metadata = {}, recentPosts = [], categories = [] } = useSite();
  const { title } = metadata;

  const hasRecentPosts = Array.isArray(recentPosts) && recentPosts.length > 0;
  const hasRecentCategories = Array.isArray(categories) && categories.length > 0;
  const hasMenu = hasRecentPosts || hasRecentCategories;

  return (
    <footer className="mt-20 py-16 md:px-4 font-4 text-gray-800 dark:text-gray-200">
      <Container>
      {hasMenu && (
        <Section className="max-w-7xl mx-auto">
            <ul className="flex flex-col items-top lg:flex-row lg:justify-between">
            <div className="py-2 leading-5 logo-wrap text-xl">
            <Link href="/">
              <a className="fill-black dark:fill-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="hover:drop-shadow-logo" width="auto" height="25px" viewBox="0 0 204.41 53.21">
                <g data-name="Layer 2">
                  <g data-name="Layer 1">
                    <path d="M27.07 12v40.13H15.7V12H0V1.08h42.84V12ZM72.22 0c14.33 0 26.5 10.44 26.5 26.64s-12.17 26.57-26.5 26.57-26.57-10.44-26.57-26.57S57.82 0 72.22 0Zm0 42c7.06 0 14.69-4.75 14.69-15.41s-7.63-15.5-14.69-15.5-14.76 4.82-14.76 15.48S65.09 42 72.22 42ZM139.18 52.13l-21-33.55v33.55h-11.3V1.08h13.82l19.16 31v-31h11.34v51.05ZM157.39 1.08h13.32L181.15 20l10.59-18.92h12.67l-17.93 29.74v21.31H175.1V30.82Z"/>
                  </g>
                </g>
              </svg>
              </a>
            </Link>
            <span className="flex flex-row space-x-5 py-8">
              <a className="text-gray-500 hover:text-gray-700 transition" href="https://www.facebook.com/#">
              <FaFacebookF className="h-5 w-5"/>
              </a>
              <a className="text-gray-500 hover:text-gray-700 transition" href="https://www.instagram.com/#">
              <FaInstagram className="h-5 w-5"/>
              </a>
              <a className="text-gray-500 hover:text-gray-700 transition" href="https://www.twitter.com/#">
              <FaTwitter className="h-5 w-5"/>
              </a>
            </span>
          </div>
              {hasRecentPosts && (
                <li>
                  <Link href="/post">
                    <a className="font-medium">
                      Recent Posts
                    </a>
                  </Link>
                  <ul className="block my-4 text-sm">
                    {recentPosts.map((post) => {
                      const { id, slug, title } = post;
                      return (
                        <li className="mb-4 text-gray-400 dark:text-gray-300" key={id}>
                          <Link href={postPathBySlug(slug)}>
                            <a className="hover:text-orange-500">{title}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )}
              {hasRecentCategories && (
                <li className="mb-4">
                  <Link href="/categories/">
                    <a className="font-medium">
                      Categories
                    </a>
                  </Link>
                  <ul className="block my-4 text-sm">
                    {categories.map((category) => {
                      const { id, slug, name } = category;
                      return (
                        <li className="mb-4 text-gray-400 dark:text-gray-300" key={id}>
                          <Link href={categoryPathBySlug(slug)}>
                            <a className="hover:text-orange-500">{name}</a>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              )}
              <li>
                <p className="font-medium">
                  About
                </p>
                <ul className="block my-4 text-sm text-gray-400 dark:text-gray-300">
                  <li className="mb-4 ">
                    <a className="hover:text-orange-500" href="/about">About us</a>
                  </li>
                  <li className="mb-4">
                    <a className="hover:text-orange-500" href="mailto:info@businesshilite.com">Contact us</a>
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-medium">
                  More
                </p>
                <ul className="block my-4 text-sm text-gray-400 dark:text-gray-300">
                  <li className="mb-4">
                    <a className="hover:text-orange-500" href="/feed.xml">RSS</a>
                  </li>
                  <li className="mb-4">
                    <a className="hover:text-orange-500" href="/sitemap.xml">Sitemap</a>
                  </li>
                </ul>
              </li>
            </ul>
          
        </Section>
      )}

      <Section className="max-w-7xl mx-auto">
        <div className="font-4 text-sm pt-16 text-gray-400 dark:text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} {title}
          </p>
          <p className="">Registration on or use of this site constitutes acceptance of our  
          <a href="/terms" className="hover:text-blue-500">
          &nbsp;Terms of Service
          </a>
          , 
          <a href="/privacy-policy" className="hover:text-blue-500">
          &nbsp;Privacy Policy
          </a>
          &nbsp;and
          <a href="/privacy-policy#cookies" className="hover:text-blue-500">
          &nbsp;Cookies Policy
          </a>
          .</p>
        </div>
      </Section>
      </Container>
    </footer>
  );
};

export default Footer;
