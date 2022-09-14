import Container from 'components/Container';


const Header = ({ children }) => {
  return (
    <header className="py-20 bg-orange-50 dark:bg-gray-800">
      <Container>
          {children}
      </Container>
    </header>
  );
};

export default Header;
