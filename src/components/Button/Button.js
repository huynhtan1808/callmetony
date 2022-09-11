const Button = ({ children, className, ...rest }) => {

  return (
    <button {...rest} className="">
      {children}
    </button>
  );
};

export default Button;
