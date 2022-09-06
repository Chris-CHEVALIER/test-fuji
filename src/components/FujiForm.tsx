import React from 'react'
import './FujiForm.css'
import { useForm } from 'react-hook-form'

export default function FujiForm () {
  const { register, handleSubmit } = useForm()

  const onSubmit = (data: object) => {
    console.log(data)
  }

  return (
    <form className='col s12' onSubmit={handleSubmit(onSubmit)}>
      <div className='row'>
        <div className='input-field'>
          <input
            id='username'
            type='text'
            className='validate'
            {...register('username')}
          />
          <label htmlFor='usern ame'>Username</label>
        </div>
      </div>

      <div className='row'>
        <div className='input-field'>
          <input
            id='email'
            type='email'
            className='validate'
            {...register('email')}
          />
          <label htmlFor='email'>Email</label>
        </div>
      </div>

      <button className="waves-effect waves-light btn">Submit</button>
    </form>
  )
}
