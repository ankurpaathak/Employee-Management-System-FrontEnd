import Cookies from "universal-cookie";

export function getToken(){
    return new Cookies().get('token');

}
export function deleteToken(){
    console.log("delete called")
    new Cookies().remove('token');
}