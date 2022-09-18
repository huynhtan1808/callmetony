import { RefObject, useEffect, useState } from 'react'
import Link from 'next/link';
import { Helmet } from 'react-helmet';

import rehype from 'rehype'
import rehypePrism from 'rehype-prism-plus'
import rehypeParse from 'rehype-parse/lib';
import rehypeStringify from 'rehype-stringify/lib';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';

import { getPostBySlug, getAllPosts, getRelatedPosts, postPathBySlug, sanitizeExcerpt } from 'lib/posts';
import { categoryPathBySlug } from 'lib/categories';
import { formatDate } from 'lib/datetime';
import { ArticleJsonLd } from 'lib/json-ld';
import { helmetSettingsFromMetadata } from 'lib/site';
import useSite from 'hooks/use-site';
import usePageMetadata from 'hooks/use-page-metadata';

import Layout from 'components/Layout';
import PostHeader from 'components/PostHeader';
import Section from 'components/Section';
import Container from 'components/Container';
import Content from 'components/Content';
import Metadata from 'components/Metadata';
import FeaturedImage from 'components/FeaturedImage';
import Subscribe from 'components/Subscribe/Subscribe';
import InArticleAds from 'components/Ads/inarticleAds';
import GridAd from 'components/Ads/GridAd';
import FixedAds from 'components/Ads/FixedAds';
import FloatSideBarAd from 'components/Ads/FloatSideBarAd';

export default function Post({ post, socialImage, related }) {
  const {
    title,
    excerpt,
    metaTitle,
    description,
    date,
    author,
    categories,
    modified,
    featuredImage,
    isSticky = false,
  } = post;

  const toc =[];
  const content = unified()
  .use(rehypeParse, {
    fragment: true,
  })
  .use(() => {
    return (tree) => {
      visit(tree, 'element', (node) => {
        if (node.tagName === 'h3') {
          const id = parameterize(node.children[0].value);
          node.properties.id = id;
          
          toc.push({
            id,
            title: node.children[0].value
          });

          node.children.unshift({
            type: 'element',
            tagName: 'a',
            properties: {
            href: `#${id}`,
            }
          })
        }
      })
    }
  })
  .use(rehypeStringify)
  .processSync(post.content)
  .toString()

  const { metadata: siteMetadata = {}, homepage } = useSite();

  if (!post.og) {
    post.og = {};
  }

  post.og.imageUrl = `${homepage}${socialImage}`;
  post.og.imageSecureUrl = post.og.imageUrl;
  post.og.imageWidth = 2000;
  post.og.imageHeight = 1000;

  const { metadata } = usePageMetadata({
    metadata: {
      ...post,
      title: metaTitle,
      description: description || post.og?.description || `Read more about ${title}`,
    },
  });

  if (process.env.WORDPRESS_PLUGIN_SEO !== true) {
    metadata.title = `${title} - ${siteMetadata.title}`;
    metadata.og.title = metadata.title;
    metadata.twitter.title = metadata.title;
  }

  const metadataOptions = {
    compactCategories: false,
  };

  const { posts: relatedPostsList, title: relatedPostsTitle } = related || {};

  const helmetSettings = helmetSettingsFromMetadata(metadata);

  return (
    <Layout>
      
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />
      <Content>
        <Section>
          <Container>
            <div className="md:max-w-3xl link-decor prose dark:prose-dark mx-auto">
            <PostHeader>
              <span className="text-sm font-semibold uppercase">
              <Link href={relatedPostsTitle.link}>
                  <a className="no-underline text-emerald-500 dark:text-emerald-500 border-none">{relatedPostsTitle.name}</a>
              </Link>
              </span>
              <h1
                className="pt-4 text-3xl font-bold text-black md:text-5xl dark:text-white"
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
            {excerpt && (
            <div
              className="text-gray-500 dark:text-gray-400"
              dangerouslySetInnerHTML={{
                __html: sanitizeExcerpt(excerpt),
              }}
            />
            )}
            
            <Metadata
                date={date}
                author={author}
                category={categories}
                options={metadataOptions}
                isSticky={isSticky}
              />
              </PostHeader>
              
              <div className="featuredImage"> 
                {featuredImage && (
                <FeaturedImage
                  {...featuredImage}
                  src={featuredImage.sourceUrl}
                  dangerouslySetInnerHTML={featuredImage.alt}
                />
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300 m-0 text-sm">
                Cập nhật vào lúc {formatDate(modified)}.
              </p>
              <div className="pb-3">
                <p className="font-medium mb-2 uppercase tracking-tight">
                Mục lục
                </p>
                <ul className="list-none pl-0">
                  {toc.map(({ id, title }) => {
                  return (
                    <li key={id}>
                    <a className="no-underline" href={`#${id}`}>
                      { title }
                    </a>
                    </li>
                    )
                    })}
                </ul>
              </div>
              
              <div
                dangerouslySetInnerHTML={{
                  __html: content,
                }}
              />
            </div>
            </Container>
          </Section>
        </Content>

      <Section>
      <Container>
        <div className="md:max-w-3xl mx-auto">
        <Subscribe />
        {Array.isArray(relatedPostsList) && relatedPostsList.length > 0 && (            
          <div className="border-t border-gray-200 dark:border-gray-600 mt-10 py-10">
            {relatedPostsTitle.name ? (
              <span className="text-2xl font-semibold">
                Cùng chuyên mục{' '}
                <Link href={relatedPostsTitle.link}>
                  <a className="hover:underline">{relatedPostsTitle.name}</a>
                </Link>
                </span>
              ) : (
                <span>More Posts</span>
              )}
              <ul className="blogList pl-0 pt-5">
                {relatedPostsList.map((post) => (
                  <li className="list-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer rounded" key={post.title}>
                    <Link href={postPathBySlug(post.slug)}>
                    <div className="imgThumbnail">
                    {post.featuredImage && (
                      <FeaturedImage
                        {...post.featuredImage}
                        src={post.featuredImage.sourceUrl}
                      />
                    )}
                    </div>
                    </Link>
                    <div className="p-4 md:px-3 md:py-2 font-medium">
                    <Link href={postPathBySlug(post.slug)}>
                      <a className="postTitle">{post.title}</a>
                    </Link>
                    </div>
                    
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
      </Section>
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { post } = await getPostBySlug(params?.slug);
  const { categories, databaseId: postId } = post;

  const props = {
    post,
    socialImage: `${process.env.OG_IMAGE_DIRECTORY}/${params?.slug}.png`,
  };

  const { category: relatedCategory, posts: relatedPosts } = (await getRelatedPosts(categories, postId)) || {};
  const hasRelated = relatedCategory && Array.isArray(relatedPosts) && relatedPosts.length;

  if (hasRelated) {
    props.related = {
      posts: relatedPosts,
      title: {
        name: relatedCategory.name || null,
        link: categoryPathBySlug(relatedCategory.slug),
      },
    };
  }

  return {
    props,
  };
}

export async function getStaticPaths() {
  const { posts } = await getAllPosts({
    queryIncludes: 'all',
  });

  const paths = posts
    .filter(({ slug }) => typeof slug === 'string')
    .map(({ slug }) => ({
      params: {
        slug,
      },
    }));

  return {
    paths,
    fallback: false,
  };
}
