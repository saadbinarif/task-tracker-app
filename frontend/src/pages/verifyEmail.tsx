import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../common/services/axiosInstance'



const VerifyEmail:React.FC = ()=>{
    const {linkToken} = useParams();
    const navigate = useNavigate()
    const [isVerified, setIsVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(()=>{
        const verifyToken = async () => {
            try {
            
              const response = await axiosInstance.post(`/auth/verify-email/${linkToken}`);
          
              if (response.data.message) {
                setIsVerified(response.data.message)
                console.log(isVerified)     
                } 
                // else {
            //     setVerificationStatus('expired');
            //   }
            } catch (error:any) {
              console.error('Error verifying token:', error);
              setError(error)
            }
          };
      
          verifyToken();

    }, [] )
console.log('fe linkToken',linkToken)
    return(
        <div>
            <p>verifyemail</p>
            <p>{isVerified}</p>
            <p>{}</p>
        </div>

    );
}

export default VerifyEmail;