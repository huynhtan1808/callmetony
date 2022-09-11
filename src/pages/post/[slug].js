import { RefObject, useEffect, useState } from 'react'
import Link from 'next/link';
import { Helmet } from 'react-helmet';

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
        if (node.tagName === 'h3' ) {
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
  .toString();


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
      <Container>
      <Helmet {...helmetSettings} />

      <ArticleJsonLd post={post} siteTitle={siteMetadata.title} />
      <Content>
      <div className="lg:flex">
        <div className="min-h-screen w-full lg:static lg:max-h-full lg:overflow-visible">
          <div className="flex">
            <div className="pb-8 w-full">
              <div className="flex flex-col xl:flex-row xl:flex-relative">
                <aside id="sidebar2" class="sidebar2 block w-full hidden xxl:block font-4 mt-8">
                  
                </aside>
          <Section className="w-full min-w-0 md:max-w-2xl lg:max-w-none lg:pr-6 xxl:px-6 mx-auto lg:ml-0 lg:mr-auto xl:mx-0 link-decor single-post porse prose-lg"> 
          <PostHeader>
            <span className="font-semibold text-secondary uppercase">
              <Link href={relatedPostsTitle.link}>
                <a className="border-none">{relatedPostsTitle.name}</a>
              </Link>
            </span>
            <h1
                className="my-4 title leading-normal"
                dangerouslySetInnerHTML={{
                  __html: title,
                }}
              />
              {excerpt && (
                <div
                className="text-base text-gray-500 leading-normal"
                dangerouslySetInnerHTML={{
                  __html: sanitizeExcerpt(excerpt),
                }}
              />
            )}
            <Metadata
                className="text-sm"
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
                dangerouslySetInnerHTML={featuredImage.caption}
              />
            )}
            </div>
            
            <div className="toc bg-gray-100 p-3 mb-5">
              <p className="uppercase text-xs font-semibold m-0 tracking-tight text-gray-800">
              WHAT'S IN THIS GUIDE</p>
                <ul className="list-decimal text-gray-500 px-3">
                  {toc.map(({ id, title }) => {
                  return (
                    <li  className="mb-3 cursor-pointer hover:text-secondary" key={id}>
                    <a className="border-none" href={`#${id}`}>
                    { title }
                    </a>
                    </li>
                    )
                  })}
                </ul>
            </div>
            <InArticleAds />
            <p className="mx-auto font-4 text-gray-500">Last updated on {formatDate(modified)}.</p>
            <div
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
            <InArticleAds />
            
          </Section>
      </div>
      </div>
      </div>
      </div>
      <div id="sidebar" className="sidebar grow hidden absolute top-16 w-full mt-8 -mb-16 lg:-mb-0 lg:static lg:pt-0 lg:block">
        <div className="lg:block lg:top-16 flex flex-col pt-12 -mt-12">
          <FixedAds />
        </div>
        <div className="lg:block lg:top-16 flex flex-col pt-12 -mt-12">
          <FixedAds />
        </div>
        <div className="lg:block lg:top-16 flex flex-col pt-12 -mt-12">
          <FixedAds />
        </div>
        <div className="lg:block lg:top-16 flex flex-col pt-12 -mt-12">
          <FixedAds />
        </div>
        <div className="lg:block lg:relative lg:sticky lg:top-16 flex flex-col pt-12 -mt-12">
          <FloatSideBarAd />
        </div>
      </div>
      </div>
      </Content>
      
      <Section className="md:max-w-3xl mx-auto md:px-2">
        <Subscribe />
        {Array.isArray(relatedPostsList) && relatedPostsList.length > 0 && (            
          <div className="border-t border-gray-300 py-10">
            {relatedPostsTitle.name ? (
              <span className="text-2xl font-semibold">
                More from{' '}
                <Link href={relatedPostsTitle.link}>
                  <a className="hover:underline">{relatedPostsTitle.name}</a>
                </Link>
                </span>
              ) : (
                <span>More Posts</span>
              )}
              <ul className="blogList pl-0 pt-5">
                {relatedPostsList.map((post) => (
                  <li className="list-none bg-white cursor-pointer dropShadow" key={post.title}>
                    <Link href={postPathBySlug(post.slug)}>
                    <div className="relatedPostsImage">
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
          <GridAd />
      </Section>
      </Container>
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
