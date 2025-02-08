import {getCachedProducts} from "@/lib/productCache";
import SearchResult from "@/components/SearchResult";

interface Product {
    name: string;
    description?: string;
    price: number;
    stock: number;
    size?: string[];
    color?: string[];
    images?: string[];
    slug: string;
}

const SearchPage = async () => {
    let Products: Product[] = [];
  
    try {
      // Fetch products
      Products = await getCachedProducts();
    } catch (error) {
      console.error("Error fetching products:", error);
      // Set Products to empty array if an error occurs
      Products = [];
    }
    const formattedProducts = Products.map(product => ({
        name: product.name,
        description: product.description || "",
        price: product.price,
        stock: product.stock,
        size: product.size || [],
        color: product.color || [],
        images: product.images || [],
        slug: product.slug,
    }));

    return (
        <div>
            <SearchResult products={formattedProducts}/>
        </div>
    );
};

export default SearchPage;
