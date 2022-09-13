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
    <div className="pb-6 mb-6">
      <Link href={postPathBySlug(slug)}>
        <a>
          <div >
          <div className="img-height">
          {featuredImage && (
          <FeaturedImage
            {...featuredImage}
            src={featuredImage.sourceUrl}
            dangerouslySetInnerHTML={featuredImage.alt}
          />
        )}
          </div>
          <div className="pt-4">
          <h2
            className="text-xl font-semibold font-title"
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
          </div>     
        </a>
      </Link>
    </div>
  );
};

export default PostList;
