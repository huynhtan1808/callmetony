import Link from 'next/link';
import { Helmet } from 'react-helmet';

import useSite from 'hooks/use-site';
import { getAllCategories, categoryPathBySlug } from 'lib/categories';
import { WebpageJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import SectionTitle from 'components/SectionTitle';


export default function Categories({ categories }) {
  const { metadata = {} } = useSite();
  const { title: siteTitle } = metadata;
  const title = 'Categories';
  const slug = 'categories';
  let metaDescription = `Read ${categories.length} categories at ${siteTitle}.`;

  return (
    <Layout>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      <WebpageJsonLd title={title} description={metaDescription} siteTitle={siteTitle} slug={slug} />

      <Header>
        <Container>
          <h1 className="title">Categories</h1>
        </Container>
      </Header>

      <Section>
        <Container>
          <div className="max-w-6xl mx-auto text-center">
          <SectionTitle>Select a topic you are most interested to explore</SectionTitle>
          <ul className="py-10 font-5 flex flex-wrap justify-center">
            {categories.map((category) => {
              return (
                <li className="my-4 mx-6 p-4 border border-gray-200 rounded-lg" key={category.slug}>
                  <Link href={categoryPathBySlug(category.slug)}>
                    <a>{category.name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { categories } = await getAllCategories();

  return {
    props: {
      categories,
    },
  };
}
