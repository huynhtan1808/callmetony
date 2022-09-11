import Link from 'next/link';
import FeaturedImage from 'components/FeaturedImage';
import { postPathBySlug, sanitizeExcerpt } from 'lib/posts';
import Metadata from 'components/Metadata';


const PostArchive = ({ post, options = {} }) => {
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
    <div className="">
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
          <div className="px-5 py-4">
          <h2
            className="text-2xl font-semibold font-title postTitle"
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

export default PostArchive;
