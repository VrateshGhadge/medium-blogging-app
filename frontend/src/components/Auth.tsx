import type { ChangeEvent } from "react"
import { Link } from "react-router-dom"
export const Auth = ({type} : {type: "signin | signup"})=>{
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div>
                <div className="text-3xl font-extrabold">
                Create an account
            </div>
            <div className="text-slate-400">
                Already have an account?
                <Link className="pl-2 underline" to={"/signin"}>Login</Link>
            </div>
            </div>
        </div>
    </div>
}

interface LabelledInputType{
    label : string
    placeholder : string
    onChange : (e: ChangeEvent<HTMLInputElement>) => void
}

function LabelledInput ({label, placeholder, onChange} : LabelledInputType){
    return
    <div>
        <label className="first_name" htmlFor="block mb-2.5 text-sm font-medium text-heading">{label}</label>
        <input onChange={onChange}type="text" id="first_name" className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder={placeholder} required />
    </div>
}