import { getAllAuthors, getUserByNameSlug, userSlugByName } from 'lib/users';
import { getPostsByAuthorSlug } from 'lib/posts';
import { AuthorJsonLd } from 'lib/json-ld';
import usePageMetadata from 'hooks/use-page-metadata';

import TemplateArchive from 'templates/archive';
import Title from 'components/Title';

export default function Author({ user, posts }) {
  const { title, name, avatar, description, slug } = user;

  const { metadata } = usePageMetadata({
    metadata: {
      ...user,
      title,
      description: description || user.og?.description || `Top ${posts.length} bài viết nổi bật từ ${name}`,
    },
  });

  const postOptions = {
    excludeMetadata: ['author'],
  };

  return (
    <>
      <AuthorJsonLd author={user} />
      <div>
      <TemplateArchive
        title={name}
        Title={<Title title={name} thumbnail={avatar} />}
        posts={posts}
        postOptions={postOptions}
        slug={slug}
        metadata={metadata}
      />
      </div>
    </>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { user } = await getUserByNameSlug(params?.slug);
  const { posts } = await getPostsByAuthorSlug({
    slug: user?.slug,
    queryIncludes: 'all',
  });
  return {
    props: {
      user,
      posts,
    },
  };
}

export async function getStaticPaths() {
  const { authors } = await getAllAuthors();

  const paths = authors.map((author) => {
    const { name } = author;
    return {
      params: {
        slug: userSlugByName(name),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
