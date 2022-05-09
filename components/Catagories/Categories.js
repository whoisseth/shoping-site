import CategoryCart from './../CatagoryCart/CategoryCart'
export default function Categories() {
  return (
    <div className="flex gap-4 px-2 overflow-x-auto scrollbar-hide md:scrollbar-default py-2  bg-white shadow mb-2">
      {Array.from(Array(15), (index) => index + 1).map(() => (
        <CategoryCart />
      ))}
    </div>
  )
}
