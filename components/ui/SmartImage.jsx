import Image from 'next/image';

const OPTIMIZED_HOSTS = ['res.cloudinary.com'];

export default function SmartImage({ src, alt = '', ...props }) {
  let optimized = false;
  try {
    optimized = OPTIMIZED_HOSTS.includes(new URL(src).hostname);
  } catch {
    optimized = typeof src === 'string' && src.startsWith('/');
  }
  return <Image src={src} alt={alt} unoptimized={!optimized} {...props} />;
}
