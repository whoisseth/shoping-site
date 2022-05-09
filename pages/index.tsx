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
