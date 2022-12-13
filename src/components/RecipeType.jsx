import { Link } from "react-router-dom"

export default function RecipeType() {
    return(
        <div className="recipeType-container">
            <Link className="text-link" to={'/dairy'}>
            <button className="button-recipe-type" type="primary" htmlType="button">
                Dairy
            </button>
            </Link>
            <Link className="text-link" to={'/salads'}>
            <button className="button-recipe-type" type="link" htmlType="button">
                Salads
            </button>
            </Link>
            <Link className="text-link" to={'/seafood'}>
            <button className="button-recipe-type" type="link" htmlType="button">
            Seafood
            </button>
            </Link>
            <Link className="text-link" to={'/poultry'}>
            <button className="button-recipe-type" type="link" htmlType="button">
            Poultry
            </button>
            </Link>
            <Link className="text-link" to={'/meat'}>
            <button className="button-recipe-type" type="link" htmlType="button">
            Meat
            </button>
            </Link>
            <Link className="text-link" to={'/desserts'}>
            <button className="button-recipe-type" type="link" htmlType="button">
            Desserts
            </button>
            </Link>
       
    </div>
    )
}

