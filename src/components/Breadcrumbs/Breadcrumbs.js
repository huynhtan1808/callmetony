import Link from 'next/link';

const Breadcrumbs = ({ breadcrumbs }) => {

  return (
    <ul className="">
      {breadcrumbs.map(({ id, title, uri }) => {
        return (
          <li key={id}>
            {!uri && title}
            {uri && (
              <Link href={uri}>
                <a>{title}</a>
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
