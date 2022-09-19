const Section = ({ children, ...rest }) => {

  return (
    <section {...rest}>
      {children}
    </section>
  );
};

export default Section;
