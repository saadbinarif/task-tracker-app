import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../common/services/axiosInstance'
import { toast } from "react-toastify";
// import { setToken } from "../common/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions, verifyEmailRequest } from "../common/actions/AuthActions";



const VerifyEmail:React.FC = ()=>{
    const {linkToken} = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const [verifiedState, setVerifiedState] = useState(false);
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(false);
    const token = localStorage.getItem('token')


//     useEffect(()=>{
        
//         const verifyToken = async () => {
//             try {
            
//               const response = await axiosInstance.post(`/auth/verify-email/${linkToken}`);
          
//               if (response.data.message) {
//                 if(!token){
//                     localStorage.setItem('token', response.data.token)
//                     // dispatch(setToken(response.data.token))
//                     setVerifiedState(response.data.message)
                    
//                 }
//                 else{
//                     setVerifiedState(response.data.message)
                    
//                     console.log(verifiedState) 
//                 }
                    
//                 } 
//                 // else {
//             //     setVerificationStatus('expired');
//             //   }
//             } catch (error:any) {
//               console.log('Error verifying token:', error.response.data.message);
//               setError(error.response.data.message)
//             }
//           };
      
//           verifyToken();

//     }, [] )
// console.log('fe linkToken',linkToken)

const auth = useSelector((s:any)=>s.auth.AuthToken)
const isloading = useSelector((s:any)=>s.auth.loading)
const error = useSelector((s:any)=>s.auth.error)

useEffect(()=>{
dispatch(verifyEmailRequest(linkToken))
}, [linkToken])

// if(error == false){
//     navigate('/resendemail')
// }
console.log(
    'verifyemail - auth:', auth,
    '\nverifyemail-iserror:', error
)

return(
        <>
           {
            error == false && navigate('/resendemail')
           }
                <div className="container h-screen flex justify-center items-center">
                    <p>Email is already verified</p>
                </div>
            
           
        
        </>

    );
}

export default VerifyEmail;