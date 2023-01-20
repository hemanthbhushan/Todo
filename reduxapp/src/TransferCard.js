import React,{useState} from 'react';
import {useFormik} from 'formik'
import * as Yup from "yup";
import { ethers } from 'ethers';



const TransferCard = ({active}) => {
  const [accAddress,setAccAddress] = useState('')
  const [error, seterror] = useState("")
  const [tx, settx] = useState("")
  // const [tx, settx] = useState("")
  const [connect,setConnect] = useState("")


    const formik = useFormik({
        initialValues:{
            accountAddress:"",
            amount:""
        },
        validationSchema: Yup.object({
          accountAddress: Yup.string().required("Required"),
          amount: Yup.string().required("Required")
        }),
        onSubmit:async (values,{resetForm})=>{
         try {

          if(active)
          {
          const provider= new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          ethers.utils.getAddress(values.accountAddress)
          const tx = await signer.sendTransaction({
            to:values.accountAddress,
            value:ethers.utils.parseEther(values.amount)
          });
          settx(tx)
        }else{
        
          setConnect("first connect to metamask")
        }
         
         
       
        }catch(err){
          seterror(err)

        }
         

        } 
    })

  return (
    <>
    <h3>Do your transaction Here</h3>
    <div >
      <form onSubmit={formik.handleSubmit}>
      <label htmlFor="accAddress">Account address</label>
        <input
          id="accAddress"
          className="form-control"
          type="text"
          {...formik.getFieldProps("accountAddress")}
        />
        <label htmlFor="amount">Enter amount </label>
        <input
          id="amount"
          className="form-control"
          type="text"
          {...formik.getFieldProps("amount")}
        />
        <button type='submit' className="btn btn-primary">Submit transaction</button>

      </form>
      <div>
        

        {active?
        <>
          <h3>From:{tx.from}</h3>
        <h3>to:{tx.to}</h3>
        {/* <h3>Amount:{ethers.utils.formatEther(tx.amount)}</h3> */}
        <h3>TxHash:{tx.hash}</h3>
        </>:<h3>{connect}</h3>
        }
        
        {error}
      </div>

    </div>
    </>
  )
}

export default TransferCard