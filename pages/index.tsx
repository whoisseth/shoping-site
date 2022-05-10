import Head from 'next/head'
import { sanityClient, urlFor } from '../sanity'
import Image from 'next/image'
// import { Post } from '../typings'
import Link from 'next/link'
import { Post } from './../typings.d'
import { Layout } from './../components/Layout'
import Categories from './../components/Catagories/Categories'
import Slider from './../components/Slider/Slider'
import DealsOfTheDay from './../components/DealsOfTheDay/DealsOfTheDay'
import Products from './../components/Products/Products'
interface Props {
  posts: [Post]
}
// console.log(urlFor)

export default function Home({ posts }: Props) {
  console.log(posts)
  return (
    <Layout>
      <Categories />
      <div className="mx-2">
        <Slider />
        <DealsOfTheDay />
        <Products />
        {/* <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-2 md:p-6  gap-3 md:gap-6">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <a className="rounded-lg  border-2   overflow-hidden group">
                <div className="relative h-60 w-full bg-gray-300 overflow-hidden group-hover:scale-105 transition-transform duration-200 ease-in-out ">
                  <Image
                    objectFit="cover"
                    layout="fill"
                    src={urlFor(post.mainImage).url()!}
                  />
                </div>
                <div className="flex justify-between p-4 gap-2 bg-white ">
                  <div className=" ">
                    <p className="text-lg font-bold ">{post.title} </p>
                    <p className="text-sm mr-2 ">
                      {post.description} by {post.author.name}
                    </p>
                  </div>
                  <div className="  h-10 w-10 relative rounded-full bg-gray-300  overflow-hidden ">
                    <Image
                      objectFit="cover"
                      layout="fill"
                      src={urlFor(post.author.image).url()!}
                    />
                  </div>
                </div>
              </a>
            </Link>
          ))}
        </main> */}
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == 'post']{
    _id,
    title,
    author ->{
    name,
    image,
  },
  description,
  mainImage,
    slug,
  }`
  const posts = await sanityClient.fetch(query)
  return {
    props: {
      posts,
    },
  }
}
