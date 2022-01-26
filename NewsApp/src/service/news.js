import { API_URL, API_KEY} from "../config/rest_configuration";

export async function getGenArticlesIN(countryCode='in', category='general'){
    try{
        let articles = await fetch(`${API_URL}?country=${countryCode}&category=${category}`,{
            headers:{
                'X-API-KEY': API_KEY
            }
        })
        let result = await articles.json();
        articles=null;
        return result.articles;
    }
    catch(error){
        throw error;
    }
}