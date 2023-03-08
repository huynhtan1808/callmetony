import Container from 'components/Container';


const Header = ({ children }) => {
  return (
    <header className="pt-28 pb-10">
      <Container>
          {children}
      </Container>
    </header>
  );
};

export default Header;
