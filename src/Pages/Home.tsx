import BookCarousel from "../components/cart/BookCarousel"
import CategoryAmountsCart from "../components/category-amounts/CategoryAmountsCart"
import LibraryMaterials from "../components/category-amounts/LibraryMaterials"
import AdCarousel from "../components/HeroSection/AdCarousel"



const Home = () => {
 
  return (
    <div>
      <AdCarousel/>
      <CategoryAmountsCart/>
      <BookCarousel/>
      <LibraryMaterials/>
    </div>
  )
}

export default Home
