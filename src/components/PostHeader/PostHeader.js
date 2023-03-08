import Container from 'components/Container';


const PostHeader = ({ children }) => {
  return (
    <header className="pt-28">
      {children}
    </header>
  );
};

export default PostHeader;