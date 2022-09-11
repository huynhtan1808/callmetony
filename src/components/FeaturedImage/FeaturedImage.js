import Image from 'components/Image';


const FeaturedImage = ({ alt, ...rest }) => {

  return <Image alt={alt} {...rest} />;
};

export default FeaturedImage;
