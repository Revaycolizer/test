import { supabase } from "@/app/libs/supabase";


 export async function Session(){

    const data = await supabase.auth.getSession()
}

 export async function User(){
    const data = await supabase.auth.getUser()
}

export default{Session, User}