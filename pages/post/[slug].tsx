import { GetStaticProps } from 'next';
import { sanityClient, urlFor } from '../../sanity'
import { Post } from '../../typings'
import PortableText from 'react-portable-text';
import  Image  from 'next/image';
import { url } from 'inspector';

interface Props {
  post: Post
}
function Post({ post }: Props) {
  console.log(post)
  return (
    <main>

      <body className='max-w-3xl mx-auto px-4 my-6'>
        <h1 className='text-2xl font-bold '>{ post.title}</h1>
        <p className='text-sm text-gray-400'>{post.description}</p>
        <div className=' mt-2 flex  gap-2 items-center'> 
          <img src={urlFor(post.author.image).url()!} className='h-8 w-8 rounded-full' />
          <p className='text-sm font-thin text-gray-600'>Blog post by {post.author.name} - Published at {new Date(post._createdAt).toLocaleString() }</p>
        </div>
      <PortableText
          className='mt-8'
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
        content={post.body}
        serializers={{
          h1: (props: any) => (
            <h1 className='text-2xl font-bold my-5'  {...props} />
          ), h2: (props: any) => (
            <h1 className='text-xl font-bold my-5'  {...props} />
          ),
          li: ({ children }: any) => (
            <li className='ml-4 list-disc' > {children}</li>
          ),
          link: ({ children, href }: any) => (
            <a href={href} className='text-blue-500 hover:underline' > {children}</a>
          ),
          // image: ({src} : any) =>
          // (
          // // <sectuin className='relative md:w-5 h-auto'>
          //     <img src={src}   className='border-4 h-96 w-full'/>
          // // </sectuin>

          // ),
        }}
      />
      </body>

      
    </main>
  )
}

export default Post

export const getStaticPaths = async () => {
  const query = `*[_type == 'post']{
    _id,
   slug{
    current
  },  
  }`
  const posts = await sanityClient.fetch(query);
  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current, }
  }))

  return {
    paths,
    fallback: 'blocking',
  }
};
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type =='post' && slug.current == $slug][0]{
  _id,
  _createdAt,
  title,
  author->{
  name,
  image,
},
description,
mainImage,
slug,
body,
}`
  const post = await sanityClient.fetch(query, { slug: params?.slug },)
  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post,
    },
    revalidate: 1,
  }

}
