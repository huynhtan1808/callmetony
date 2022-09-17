import Link from 'next/link';
import FeaturedImage from 'components/FeaturedImage';
import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';
import Metadata from 'components/Metadata';

import { FaMapPin } from 'react-icons/fa';

const PostCard = ({ post, options = {} }) => {
  const { title, excerpt, slug, date, categories, featuredImage, isSticky = false } = post;
  const { excludeMetadata = [] } = options;

  const metadata = {};

  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }


  return (
    <div>
      {isSticky && <FaMapPin className="absolute top-1 right-1" aria-label="Sticky Post" />}
      <Link href={postPathBySlug(slug)}>
        <a className="cursor-pointer">
          <div className="h-full md:flex">
          <div className="md:w-1/2 bg-cover overflow-hidden h-72 featuredImage"> 
          {featuredImage && (
          <FeaturedImage
            {...featuredImage}
            src={featuredImage.sourceUrl}
            dangerouslySetInnerHTML={featuredImage.alt}
          />
        )}
          </div>
          <div className="md:w-1/2 pt-4 md:pt-0 md:pl-6 flex flex-col justify-start leading-normal"> 
          <h2
            className="text-2xl font-semibold"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
          {excerpt && (
            <div
              className="py-2 text-gray-600 dark:text-gray-400"
              dangerouslySetInnerHTML={{
                __html: sanitizeExcerpt(excerpt),
              }}
            />
            )}
            <Metadata
              date={date}
            />
      </div>
      </div>
      </a>
      </Link>
      </div>
  );
};

export default PostCard;
