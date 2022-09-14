import usePageMetadata from 'hooks/use-page-metadata';

import { getPaginatedPosts } from 'lib/posts';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts, pagination }) {
  const title = 'Tất cả bài viết';
  const slug = 'post';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: false,
    },
  });

  return <TemplateArchive title={title} posts={posts} slug={slug} pagination={pagination} metadata={metadata} />;
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
