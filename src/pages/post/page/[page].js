import { getAllPosts, getPagesCount, getPaginatedPosts } from 'lib/posts';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';

export default function Posts({ posts, pagination }) {
  const title = `Tất cả bài viết`;
  const slug = 'post';

  const { metadata } = usePageMetadata({
    metadata: {
      title,
      description: `Trang ${pagination.currentPage}`,
    },
  });

  return <TemplateArchive title={title} posts={posts} slug={slug} pagination={pagination} metadata={metadata} />;
}

export async function getStaticProps({ params = {} } = {}) {
  const { posts, pagination } = await getPaginatedPosts({
    currentPage: params?.page,
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

export async function getStaticPaths() {
  const { posts } = await getAllPosts({
    queryIncludes: 'index',
  });
  const pagesCount = await getPagesCount(posts);
  const paths = [...new Array(pagesCount)].map((_, i) => {
    return { params: { page: String(i + 1) } };
  });
  return {
    paths,
    fallback: false,
  };
}
