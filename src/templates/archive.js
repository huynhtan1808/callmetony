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
  title = 'Archive',
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
          <div className="max-w-6xl md:px-6 mx-auto">
          <h1 className="title">{Title || title}</h1>
          {metadata.description && (
            <p
              className=""
              dangerouslySetInnerHTML={{
                __html: metadata.description,
              }}
            />
          )}
          </div>
      </Header>

      <Section className="max-w-6xl mx-auto -mt-12">
        <Container>
          {Array.isArray(posts) && (
            <>
            <div>
              <ul className="blogList">
                {posts.map((post) => {
                  return (
                    <li key={post.slug} className="bg-white dropShadow pb-2 md:pt-0">
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
