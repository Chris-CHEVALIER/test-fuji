import React from 'react';
import { useForm, Resolver } from 'react-hook-form'
import { verifyMessage } from 'ethers/lib/utils'

type FormValues = {
  message: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.message ? values : {},
    errors: !values.message
      ? {
          message: {
            type: 'required',
            message: 'Meow message is required.',
          },
        }
      : {},
  };
};

export default function FujiForm () {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });

  const onSubmit = (data: FormValues) => {
    console.log(data.message);
    //const address = verifyMessage(data.message, );
  }

  return (
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
  )
}
