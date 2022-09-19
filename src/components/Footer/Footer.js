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
    <footer className="max-w-6xl mx-auto md:px-4 mt-10 py-16 text-gray-800 dark:text-gray-200">
      <Container>
      {hasMenu && (
        <Section>
            <ul className="flex flex-col pt-10 items-top lg:flex-row lg:justify-between border-t border-gray-200 dark:border-gray-800">
            {/*
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
          */}
              {hasRecentPosts && (
                <li>
                  <Link href="/post">
                    <a className="font-medium">
                      Bài viết mới nhất
                    </a>
                  </Link>
                  <ul className="block my-4 text-sm md:pr-2">
                    {recentPosts.map((post) => {
                      const { id, slug, title } = post;
                      return (
                        <li className="mb-4 text-gray-400 dark:text-gray-300" key={id}>
                          <Link href={postPathBySlug(slug)}>
                            <a className="hover:text-emerald-500">{title}</a>
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
                      Danh mục
                    </a>
                  </Link>
                  <ul className="block my-4 text-sm">
                    {categories.map((category) => {
                      const { id, slug, name } = category;
                      return (
                        <li className="mb-4 text-gray-400 dark:text-gray-300" key={id}>
                          <Link href={categoryPathBySlug(slug)}>
                            <a className="hover:text-emerald-500">{name}</a>
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
                    <a className="hover:text-emerald-500" href="/about">About me</a>
                  </li>
                  <li className="mb-4">
                    <a className="hover:text-emerald-500" href="mailto:tanhuynh1808@gmail.com">Contact me</a>
                  </li>
                </ul>
              </li>
            </ul>
          
        </Section>
      )}

      <Section className="flex flex-row items-end justify-between pt-16">
        <div className="font-4 text-sm text-gray-300 dark:text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} {title}
          </p>
          <p className="">Việc đăng ký hoặc sử dụng trang web này cấu thành sự chấp nhận
          <a href="/dieu-khoan-su-dung" className="hover:text-blue-500">
          {' '} Điều khoản Dịch vụ 
          </a>
          , 
          <a href="/chinh-sach-bao-mat" className="hover:text-blue-500">
          {' '} Chính sách Bảo mật
          </a>
          {' '} của tôi.</p>
        </div>
        <div>
        <ul className="flex text-sm text-gray-300 dark:text-gray-500">
          <li className="mx-3">
            <a className="hover:text-emerald-500" href="/feed.xml">RSS</a>
          </li>
          <li className="">
            <a className="hover:text-emerald-500" href="/sitemap.xml">Sitemap</a>
          </li>
        </ul>
              
        </div>
      </Section>
      </Container>
    </footer>
  );
};

export default Footer;
