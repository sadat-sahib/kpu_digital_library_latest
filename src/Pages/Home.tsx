
import CategoryAmountsCart from "../components/category-amounts/CategoryAmountsCart"
import LibraryMaterials from "../components/category-amounts/LibraryMaterials"
import AdCarousel from "../components/HeroSection/AdCarousel"
import LibraryInfo from "../components/library-info/LibraryInfo"
import CoursesCards from "../components/books-section/BookCategoryCarousel"



const Home = () => {
 
  return (
    <div>
      <AdCarousel/>
      <CategoryAmountsCart/>
      {/* <BookCarousel/> */}
      <CoursesCards/>
      <LibraryInfo/>
      <LibraryMaterials/>
    </div>
  )
}

export default Home
