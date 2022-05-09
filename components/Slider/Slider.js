import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Image from 'next/image'
import Link from 'next/link'
import DefaultImage from '../Assets/Images/Default/default-loading-image.png'

export default function Slider() {
  return (
    <Carousel autoPlay infiniteLoop className="-mb-8">
      {Array.from(Array(5), (index) => index + 1).map(() => (
        <Slide />
      ))}
    </Carousel>
  )
}

const Slide = () => (
  <Link href={'#'}>
    <div className="w-full h-52  relative cursor-pointer ">
      <Image src={DefaultImage} layout="fill" objectFit="cover" />
    </div>
  </Link>
)
