import { useState, type ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignupInput } from "medium-validn-common"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const Auth = ({ type } : {type: "signin" | "signup"})=>{
    const navigate = useNavigate()
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: "",
        password: "",
        name: "",
    })

    async function sendRequest(){
       try{
         const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
         const jwt = response.data;
         localStorage.setItem("token", jwt);
         navigate("/blog");
       }catch(e){
        alert("Error while signing up")
       }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="w-110">
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Create an account
                    </div>
                    <div className="text-slate-400">
                        {type === "signin"? "Don't have an account?" : "Already have an account?" }
                        <Link className="pl-2 underline" to={type === "signin" ? "/signup": "/signin"}>
                            {type === "signin" ? "Sign up" : "Sign in"}
                        </Link>
                    </div>
                </div>
                    <div className="pt-8">
                        {type === "signup"? <LabelledInput label="Name" placeholder="Jhon Doe" onChange={(e) =>{
                            setPostInputs({
                                ...postInputs,
                                name: e.target.value
                            })
                        }}/> : null }

                        <LabelledInput label="Username" placeholder="jhon.doe@gmail.com" onChange={(e) =>{
                            setPostInputs({
                                ...postInputs,
                                email: e.target.value
                            })
                        }}/>

                        <LabelledInput label="Password" type={"password"} placeholder="•••••••••"  onChange={(e) =>{
                            setPostInputs({
                                ...postInputs,
                                password: e.target.value
                            })
                        }}/>

                        <button onClick={sendRequest} type="button" className="mt-8 w-full bg-neutral-900 hover:bg-neutral-800 text-white font-medium rounded-md text-sm px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 transition-colors duration-200">
                            {type === "signup" ? "Sign up": "Sign in" }
                        </button>
                    </div>
                </div>
            </div>
        </div>
}

interface LabelledInputType{
    label : string
    placeholder : string
    onChange : (e: ChangeEvent<HTMLInputElement>) => void
    type? : string
}

function LabelledInput ({label, placeholder, onChange, type} : LabelledInputType){
    return <div>
        <label 
        htmlFor={label.replace(/\s+/g, '_').toLowerCase()} 
        className="block mb-2.5 text-sm font-semibold text-slate-900 pt-4"
    >
        {label}
    </label>
    <input 
        onChange={onChange} 
        type={type || "text"} 
        id={label.replace(/\s+/g, '_').toLowerCase()} 
        className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2.5 shadow-sm placeholder:text-slate-400 transition-colors duration-200" 
        placeholder={placeholder} 
        required 
    />
    </div>
}

