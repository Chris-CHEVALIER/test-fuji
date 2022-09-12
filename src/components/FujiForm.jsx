import React, { useEffect, useState } from 'react'
import { useForm, Resolver } from 'react-hook-form'
import { ethers } from 'ethers'
import SimpleStorage_abi from './ContractAbi.json'

/* type FormValues = {
  message: string
} */

const contractAddress = "0xd054e5724d7d595b72abbb0c460e0221cd859c8f";

const resolver = async values => {
  return {
    values: values.message ? values : {},
    errors: !values.message
      ? {
        message: {
          type: 'required',
          message: 'Meow message is required.'
        }
      }
      : {}
  }
}

export default function FujiForm() {
  const [meows, setMeows] = useState([]);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver })

  useEffect(() => {
    fetchMeows()
  }, []);

  async function fetchMeows() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        contractAddress,
        SimpleStorage_abi,
        provider
      )
      try {
        const meows = await contract.getAllMeows();
        setMeows(meows);
        const provider = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161");
        provider.lookupAddress(contractAddress).then(resolvedName => {
          console.log(resolvedName);
        })
      }
      catch (error) {
        console.log(error);
        setError(error);
      }
    } else {
      setError("Please install MetaMask");
    }
  }

  const onSubmit = (data) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(
        contractAddress,
        SimpleStorage_abi,
        provider.getSigner()
      )
      try {
        contract.sayMeow(data.message);
      }
      catch (error) {
        setError(error);
      }
    }
    else {
      setError("Please install MetaMask");
    }
  }

  return (
    <>
      <form className='col s12' onSubmit={handleSubmit(onSubmit)}>
        <div className='row'>
          <div className='input-field'>
            <textarea
              id='message'
              className='materialize-textarea white-text'
              {...register('message')}
            />
            <label htmlFor='message'>Meow message</label>
          </div>
        </div>
        <button className='waves-effect waves-light btn'>Send meow</button>
        {errors?.message && <p>{errors.message.message}</p>}
      </form>
      <ul>
        {meows.length > 0 && meows.map(meow => (
          <li key={meow.timestamp}>{meow[0]}</li>
        ))}
      </ul>
    </>
  )
}
