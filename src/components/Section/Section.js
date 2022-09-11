const Section = ({ children, ...rest }) => {

  return (
    <section className="mx-auto" {...rest}>
      {children}
    </section>
  );
};

export default Section;
