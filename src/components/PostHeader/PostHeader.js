import Container from 'components/Container';


const PostHeader = ({ children }) => {
  return (
    <header className="mt-8 z-40 relative">
      {children}
    </header>
  );
};

export default PostHeader;