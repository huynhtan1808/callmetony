import Container from 'components/Container';


const Header = ({ children }) => {
  return (
    <header className="py-10">
      <Container>
          {children}
      </Container>
    </header>
  );
};

export default Header;
