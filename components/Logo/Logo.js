import Link from 'next/link'
import { BsStars } from 'react-icons/bs'
export default function Logo() {
  return (
    <Link href="/">
      <a className="italic text-white  font-poppins ">
        <p className="font-mono text-white text-2xl font-semibold  ">
          Shopkart
        </p>
        <p className="text-sm   capitalize -mt-2 text-right w-full flex justify-end ">
          <span>explore</span>
          <span className="text-yellow-400  pr flex">
            <span>plus</span> <BsStars />
          </span>
        </p>
      </a>
    </Link>
  )
}
