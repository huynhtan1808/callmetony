
const Title = ({ title, thumbnail }) => {

  return (
    <div className="">
      {thumbnail && <img src={thumbnail.url} alt="" aria-hidden="true" />}
      <span>{title}</span>
    </div>
  );
};

export default Title;
