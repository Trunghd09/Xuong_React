import { getAllProducts, getById } from "@/services/product"
import { useQuery } from "@tanstack/react-query"



const useProductQuerry = (id: string) => {
    const { data } = useQuery({
        queryKey: ["PRODUCTS", id],
        queryFn: async () => {
            return id ? await getById(id) : await getAllProducts()
        }
    })
    console.log(data);

    return { data }
}

export default useProductQuerry