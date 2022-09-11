import useSite from 'hooks/use-site';
import { getPaginatedPosts } from 'lib/posts';
import { WebsiteJsonLd } from 'lib/json-ld';

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
          <h2 className="sr-only">Posts</h2>
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
          <ul className="md:px-4 w-full py-10 border-t border-gray-200">
            {listArticles.map((post) => {
              return (
                <li key={post.slug}>
                  <PostList post={post} />
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
