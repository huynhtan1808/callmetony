import useSite from 'hooks/use-site';
import { getPaginatedPosts } from 'lib/posts';
import { WebsiteJsonLd } from 'lib/json-ld';
import Image from 'components/Image';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import PostCard from 'components/PostCard';
import PostList from 'components/PostList';
import PostRow from 'components/PostRow';
import Pagination from 'components/Pagination';


export default function Home({ posts, pagination }) {
  const { metadata = {} } = useSite();
  const { title, description } = metadata;

  const featuredArticlescount = Math.ceil(posts.length / 5)
  const featuredArticle = posts.slice(1, featuredArticlescount)
  const rowArticles = posts.slice(featuredArticlescount, 5)
  const listArticles = posts.slice(5, posts.length)


  return (
    <Layout>
      <WebsiteJsonLd siteTitle={title} />
        <div className="sr-only">
        <h1
        className="text-white text-6xl my-5"
          dangerouslySetInnerHTML={{
            __html: title,
          }}
        />

        <p
          className="text-white"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        </div>
      <Container>
      <Section className="max-w-6xl mx-auto">
            <div className="flex flex-col-reverse sm:flex-row items-start pt-12 md:px-4">
              <div className="flex flex-col pr-8">
                <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-2 text-gray-800 dark:text-gray-200">
                  Tony Huynh
                </h1>
                <h2 className="text-gray-700 dark:text-gray-300 mb-4">
                  Front-End Web Developer tại{' '}
                  <span className="font-semibold">One Pixel Media</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-16">
                  Giúp mọi người xây dựng website nhanh hơn. Viết về
                  phát triển web, Wordpress và React / Next.js.
                </p>
              </div>
              <div className="w-[176px] relative mb-8 sm:mb-0 mr-auto avatar filter grayscale">
                <Image
                  alt="Tony Huynh"
                  src="/avatar.png"
                />
              </div>
            </div>
            
            <h2 className="font-bold text-2xl md:text-4xl tracking-tight mb-6 text-gray-800 dark:text-gray-200 md:px-4 ">
              Bài viết nổi bật
            </h2>
            <ul className="section-0 md:px-4 w-full my-8">
            {featuredArticle.map((post) => {
              return (
                <li key={post.slug}>
                  <PostCard post={post} />
                </li>
              );
            })}
          </ul>
          <ul className="md:flex">
            {rowArticles.map((post) => {
              return (
                <li className="w-full md:w-1/3 md:px-4 mb-8" key={post.slug}>
                  <PostRow post={post} />
                </li>
              );
            })}
          </ul>
          
          {pagination && (
            <Pagination
              addCanonical={false}
              currentPage={pagination?.currentPage}
              pagesCount={pagination?.pagesCount}
              basePath={pagination?.basePath}
            />
          )}
        
      </Section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const { posts, pagination } = await getPaginatedPosts({
    queryIncludes: 'all',
  });
  return {
    props: {
      posts,
      pagination: {
        ...pagination,
        basePath: '/post',
      },
    },
  };
}
