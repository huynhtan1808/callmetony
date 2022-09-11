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
    <footer className="mt-20 py-16 md:px-4 bg-gray-100 font-4 text-gray-700">
      <Container>
      {hasMenu && (
        <Section className="max-w-7xl mx-auto">
            <ul className="flex flex-col items-top lg:flex-row lg:justify-between">
            <div className="py-2 leading-5 logo-wrap text-xl">
            <Link href="/">
              <a className="fill-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="190px" height="20px" viewBox="0 0 512.39 42.9">
                <g data-name="Layer 2">
                  <g data-name="Layer 1">
                  <path d="M16.23.45a26.78 26.78 0 0 1 6 .62A14.89 14.89 0 0 1 26.91 3 8.51 8.51 0 0 1 30 6.36a10.88 10.88 0 0 1 1.08 5 9.51 9.51 0 0 1-1.93 6.12 10 10 0 0 1-5.3 3.36 10.89 10.89 0 0 1 5.92 3.53A10 10 0 0 1 32 31q0 5.85-4 8.66t-11.07 2.8H0V.45ZM3.66 3.9v15.45h12.48A23.69 23.69 0 0 0 20.6 19a11.7 11.7 0 0 0 3.48-1.25 6 6 0 0 0 2.36-2.4 7.75 7.75 0 0 0 .83-3.72 7.68 7.68 0 0 0-.83-3.69 5.82 5.82 0 0 0-2.36-2.38 12.2 12.2 0 0 0-3.5-1.25 23 23 0 0 0-4.47-.39Zm0 18.87V39h13.11q5.46 0 8.4-1.89t2.94-6.24a8.51 8.51 0 0 0-.8-3.84 6 6 0 0 0-2.31-2.5 11.38 11.38 0 0 0-3.54-1.34 23.09 23.09 0 0 0-4.68-.42ZM75.33 26.1A19.25 19.25 0 0 1 74 33.42a13.89 13.89 0 0 1-3.66 5.3A15.93 15.93 0 0 1 65 41.83a21.08 21.08 0 0 1-13.26 0 15.8 15.8 0 0 1-5.39-3.11 14 14 0 0 1-3.64-5.3 19.25 19.25 0 0 1-1.32-7.32V.45H45v25.38a16.77 16.77 0 0 0 1 6 10.67 10.67 0 0 0 2.82 4.24A12.44 12.44 0 0 0 53 38.55a17 17 0 0 0 10.56 0 12.39 12.39 0 0 0 4.21-2.46 10.67 10.67 0 0 0 2.82-4.24 16.77 16.77 0 0 0 1-6V.45h3.69ZM114.6 7.59a22.23 22.23 0 0 0-13.14-4.11A14.57 14.57 0 0 0 93 5.73a7.06 7.06 0 0 0-3.27 6.12 6 6 0 0 0 2.49 5.06q2.49 1.88 7.77 2.47l4.59.51q12.9 1.5 12.9 10.77A10.89 10.89 0 0 1 116.2 36a10.64 10.64 0 0 1-3.57 3.85 17.37 17.37 0 0 1-5.23 2.27 25.09 25.09 0 0 1-6.39.78 28.18 28.18 0 0 1-9-1.47 23.35 23.35 0 0 1-7.27-3.78l2-2.91a22.64 22.64 0 0 0 6.3 3.3 23.25 23.25 0 0 0 7.96 1.38 17.23 17.23 0 0 0 9.16-2.19A7 7 0 0 0 113.7 31a5.84 5.84 0 0 0-2.64-5.13q-2.64-1.8-8-2.43l-4.77-.54q-5.91-.66-9.12-3.34A9.17 9.17 0 0 1 86 12.09a10.54 10.54 0 0 1 2.1-6.55 12.7 12.7 0 0 1 5.58-4.16A21.18 21.18 0 0 1 101.49 0a25.26 25.26 0 0 1 15 4.62ZM131.22 42.45h-3.66v-42h3.66ZM178.29 42.45H175l-27.52-35.7v35.7h-3.66v-42h3.3l27.54 35.7V.45h3.66ZM219.78 42.45h-28.92v-42h28.71V3.9h-25v15.69h24.33V23h-24.38v16h25.26ZM258.42 7.59a22.23 22.23 0 0 0-13.14-4.11 14.57 14.57 0 0 0-8.43 2.25 7.06 7.06 0 0 0-3.27 6.12 6 6 0 0 0 2.49 5.06q2.49 1.88 7.77 2.47l4.59.51q12.9 1.5 12.9 10.77A10.89 10.89 0 0 1 260 36a10.64 10.64 0 0 1-3.57 3.85 17.37 17.37 0 0 1-5.23 2.27 25.09 25.09 0 0 1-6.39.78 28.18 28.18 0 0 1-9-1.47 23.35 23.35 0 0 1-7.27-3.78l2-2.91a22.64 22.64 0 0 0 6.3 3.3 23.25 23.25 0 0 0 7.92 1.38 17.23 17.23 0 0 0 9.24-2.19 7 7 0 0 0 3.52-6.23 5.84 5.84 0 0 0-2.64-5.13q-2.64-1.8-8-2.43l-4.77-.54q-5.91-.66-9.12-3.34a9.17 9.17 0 0 1-3.21-7.43 10.54 10.54 0 0 1 2.1-6.55 12.7 12.7 0 0 1 5.58-4.16A21.18 21.18 0 0 1 245.31 0a25.26 25.26 0 0 1 15 4.62ZM298.71 7.59a22.23 22.23 0 0 0-13.14-4.11 14.57 14.57 0 0 0-8.43 2.25 7.06 7.06 0 0 0-3.27 6.12 6 6 0 0 0 2.49 5.06q2.49 1.88 7.77 2.47l4.59.51q12.9 1.5 12.9 10.77a10.89 10.89 0 0 1-1.31 5.34 10.64 10.64 0 0 1-3.57 3.85 17.37 17.37 0 0 1-5.23 2.27 25.09 25.09 0 0 1-6.39.78 28.18 28.18 0 0 1-9-1.47 23.35 23.35 0 0 1-7.27-3.78l2-2.91a22.64 22.64 0 0 0 6.3 3.3 23.25 23.25 0 0 0 7.92 1.38 17.23 17.23 0 0 0 9.16-2.19 7 7 0 0 0 3.58-6.23 5.84 5.84 0 0 0-2.64-5.13q-2.64-1.8-8-2.43l-4.77-.54q-5.91-.66-9.12-3.34a9.17 9.17 0 0 1-3.21-7.43 10.54 10.54 0 0 1 2.1-6.55 12.7 12.7 0 0 1 5.58-4.16A21.18 21.18 0 0 1 285.6 0a25.26 25.26 0 0 1 15 4.62ZM334.44 17.37h20.22V.45H363v42h-8.37V25.17h-20.19v17.28h-8.38v-42h8.38ZM380.94 42.45h-8.38v-42h8.38ZM421 42.45h-30.53v-42h8.37v34.17H421ZM435.14 42.45h-8.37v-42h8.37ZM475.28 8.28h-13v34.17h-8.37V8.28h-13V.45h34.41ZM512.39 42.45H481v-42h31.14v7.68h-22.76v9.3h21.72v7.68h-21.72v9.66h23Z"/>
                  </g>
                  </g>
                  </svg> 
              </a>
            </Link>
            <span className="flex flex-row space-x-5 py-8">
              <a className="text-gray-500 hover:text-gray-700 transition" href="https://www.facebook.com/morninghilite/">
              <FaFacebookF className="h-5 w-5"/>
              </a>
              <a className="text-gray-500 hover:text-gray-700 transition" href="https://www.instagram.com/businesshilite/">
              <FaInstagram className="h-5 w-5"/>
              </a>
              <a className="text-gray-500 hover:text-gray-700 transition" href="https://www.twitter.com/business_hilite/">
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
                        <li className="mb-4 text-gray-500 hover:text-gray-800" key={id}>
                          <Link href={postPathBySlug(slug)}>
                            <a>{title}</a>
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
                        <li className="mb-4 text-gray-500 hover:text-gray-800" key={id}>
                          <Link href={categoryPathBySlug(slug)}>
                            <a>{name}</a>
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
                <ul className="block my-4 text-sm">
                  <li className="mb-4 text-sm text-gray-500 hover:text-gray-800">
                    <a href="/about">About us</a>
                  </li>
                  <li className="mb-4 text-gray-500 hover:text-gray-800">
                    <a href="mailto:info@businesshilite.com">Contact us</a>
                  </li>
                </ul>
              </li>
              <li>
                <p className="font-medium">
                  More
                </p>
                <ul className="block my-4">
                  <li className="mb-4 text-sm text-gray-500 hover:text-gray-800">
                    <a href="/feed.xml">RSS</a>
                  </li>
                  <li className="mb-4 text-sm text-gray-500 hover:text-gray-800">
                    <a href="/sitemap.xml">Sitemap</a>
                  </li>
                </ul>
              </li>
            </ul>
          
        </Section>
      )}

      <Section className="max-w-7xl mx-auto">
        <div className="font-4 text-sm pt-16 text-gray-500">
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
