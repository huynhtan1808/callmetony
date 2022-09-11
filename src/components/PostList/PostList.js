import Link from 'next/link';
import FeaturedImage from 'components/FeaturedImage';
import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';
import Metadata from 'components/Metadata';


const PostList = ({ post, options = {} }) => {
  const { title, excerpt, slug, date, author, categories, featuredImage, isSticky = false } = post;
  const { excludeMetadata = [] } = options;

  const metadata = {};


  if (!excludeMetadata.includes('date')) {
    metadata.date = date;
  }

  if (!excludeMetadata.includes('categories')) {
    metadata.categories = categories;
  }


  return (
    <div className="pt-8 pb-8 border-b border-gray-200">
      <Link href={postPathBySlug(slug)}>
        <a>
          <div className="md:flex">
          <div className="md:w-4/5 pt-4 md:pt-0 flex flex-col justify-start leading-normal">
          <h2
            className="text-2xl font-semibold font-title"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
          {excerpt && (
            <div
              className="py-2 text-gray-600"
              dangerouslySetInnerHTML={{
                __html: sanitizeExcerpt(excerpt),
              }}
            />
            )}
            <Metadata
              date={date}
            />
          </div>  
          <div className="imgThumbnail md:w-1/5">
          {featuredImage && (
          <FeaturedImage
            {...featuredImage}
            src={featuredImage.sourceUrl}
            dangerouslySetInnerHTML={featuredImage.alt}
          />
        )}
          </div>
          </div>
          
        </a>
      </Link>
    </div>
  );
};

export default PostList;
