import { Alert } from "react-native";
import { API_URL, API_KEY} from "../config/rest_configuration";

export async function getGenArticlesIN(countryCode='in', category='general'){
    try{
        let articles = await fetch(`${API_URL}?country=${countryCode}&category=${category}`,{
            headers:{
                'X-API-KEY': API_KEY
            }
        })
        // let articles = await fetch(`${API_URL}`)
        let result = await articles.json();
        
        if(result.status !== 'ok'){
            return Alert.alert(`Error ➠ ${result.code}`, result.message)
        }
        articles=null;
        return result.articles;
    }
    catch(error){
        throw error;
    }
}