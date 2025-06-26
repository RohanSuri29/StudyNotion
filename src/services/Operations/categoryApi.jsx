import apiConnector from "../apiconnector";
import { catalogData } from "../apis";

export async function getCategoryDetails(categoryId) {
    let result = null;
    
    try {
     
        const response = await apiConnector("POST" , catalogData.CATALOGPAGEDATA_API , {categoryId});
        
        if(!response?.data?.success) {
            throw new Error(response?.data?.message)
        }

        result = response?.data?.data;
    }
    catch(error) {
        console.error(error);  
    }

    return result
}