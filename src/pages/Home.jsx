
import PicsCarousel from "../components/Carousel";
import Hero from "../components/Hero";
import RecipeType from "../components/RecipeType";

export default function Home() {
    return (
        <div className="container" >
        <Hero />
        <RecipeType />
        <PicsCarousel />
        </div>
    )
}