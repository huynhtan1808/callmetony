import Link from 'next/link';
import { Helmet } from 'react-helmet';

import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';


export default function Custom404() {
  return (
    <Layout>
      <Helmet>
        <title>404 | Page not found</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Section>
        <Container>
          <div className="text-center">
          <h1 className="title pt-20 pb-5">Page Not Found</h1>
          <span>The page you were looking for could not be found.</span>
          <p className="py-10">
            <Link href="/">
              <a className="bg-secondary py-4 px-10 rounded-lg text-white font-5">Go back home</a>
            </Link>
          </p>
          </div>
        </Container>
      </Section>
    </Layout>
  );
}

// Next.js method to ensure a static page gets rendered
export async function getStaticProps() {
  return {
    props: {},
  };
}
