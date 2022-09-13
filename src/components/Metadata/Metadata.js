import Link from 'next/link';

import { categoryPathBySlug } from 'lib/categories';
import { authorPathByName } from 'lib/users';
import { formatDate } from 'lib/datetime';


const DEFAULT_METADATA_OPTIONS = {
  compactCategories: true,
};

const Metadata = ({ author, date, categories, options = DEFAULT_METADATA_OPTIONS, isSticky = false }) => {
  
  const { compactCategories } = options;

  return (
    <ul className="flex text-sm items-center p-0">
      
      {author && (
        <li className="flex list-none h-12 pl-0">
          <address className="flex items-center not-italic">
            {author.avatar && (
              <img
                className="h-8 w-8 z-0 filter grayscale rounded-full mr-2 object-cover"
                width={author.avatar.width}
                height={author.avatar.height}
                src={author.avatar.url}
                alt="Author Avatar"
              />
            )}
            <Link href={authorPathByName(author.name)}>
              <a className="font-normal ml-1 border-none" rel="author">{author.name}</a>
            </Link>
            <span className="mx-2 text-gray-500">|</span>
          </address>
        </li> 
      )}
      {date && (
        <li className="block pl-0 text-gray-500">
          <time pubdate="pubdate" dateTime={date}>
            {formatDate(date)}
          </time>
        </li>
      )}
      {Array.isArray(categories) && categories[0] && (
        <li className="ml-5 text-secondary uppercase">
          {compactCategories && (
            <p title={categories.map(({ name }) => name).join(', ')}>
              <Link href={categoryPathBySlug(categories[0].slug)}>
                <a>{categories[0].name}</a>
              </Link>
              {categories.length > 1 && ' and more'}
            </p>
          )}
          {!compactCategories && (
            <ul>
              {categories.map((category) => {
                return (
                  <li key={category.slug}>
                    <Link href={categoryPathBySlug(category.slug)}>
                      <a>{category.name}</a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      )}
    </ul>
  );
};

export default Metadata;
