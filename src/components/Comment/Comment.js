import { postPathBySlug } from 'lib/posts';



const Comment = ({ post = {} }) => {
  const { title, slug } = post;

  return (
    <div id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id="72ffb259-38ea-4244-8df5-7237c8514203"
        data-page-url={{ slug }}
        data-page-title={{ title }}
    >
    </div>
  );
};

export default Comment;
