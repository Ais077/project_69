import axios from 'axios';

export default class PostService {
    static async getAll(){
        try{
            const response = await axios.get('https://test2-50146-default-rtdb.firebaseio.com/recipes.json');
            return response.data;
        } catch(e){
            console.log(e)

        }
    }
    static async POST_ORDER(e){
        try{
            const response = await axios.post('https://test2-50146-default-rtdb.firebaseio.com/recipes/order.json', e);
        } catch(e){
           console.log(e)
        }
    }
}

// import axios from "axios";

// const instance = axios.create({
//     baseURL:'https://test2-50146-default-rtdb.firebaseio.com/'
// })

// export default instance;