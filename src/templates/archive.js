import { Helmet } from 'react-helmet';

import { WebpageJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Pagination from 'components/Pagination';
import PostArchive from 'components/PostArchive';


const DEFAULT_POST_OPTIONS = {};

export default function TemplateArchive({
  title = 'Chuyên mục',
  Title,
  posts,
  postOptions = DEFAULT_POST_OPTIONS,
  slug,
  metadata,
  pagination,
}) {
  const { metadata: siteMetadata = {} } = useSite();

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      <Helmet {...helmetSettings} />

      <WebpageJsonLd title={title} description={metadata.description} siteTitle={siteMetadata.title} slug={slug} />

      <Header>
          <div className="max-w-6xl md:px-6 mx-auto prose text-gray-900 dark:text-gray-200">
          <h1 className="mb-2 dark:text-white">{title || Title}</h1>
          {metadata.description && (
            <p
              dangerouslySetInnerHTML={{
                __html: metadata.description,
              }}
            />
          )}
          </div>
      </Header>

      <Section className="max-w-6xl mx-auto contentSection">
        <Container>
          {Array.isArray(posts) && (
            <>
            <div>
              <ul className="grid md:grid-cols-3 gap-6">
                {posts.map((post) => {
                  return (
                    <li key={post.slug} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 pb-2 md:pt-0 rounded-lg transform hover:scale-[1.01] transition-all">
                      <PostArchive post={post} options={postOptions} />
                    </li>
                  );
                })}
              </ul>
              </div>
              {pagination && (
                <Pagination
                  currentPage={pagination?.currentPage}
                  pagesCount={pagination?.pagesCount}
                  basePath={pagination?.basePath}
                />
              )}
            </>
          )}
        </Container>
      </Section>
    </Layout>
  );
}
