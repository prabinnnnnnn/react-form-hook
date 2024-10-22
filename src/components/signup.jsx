import { useForm } from "react-hook-form"
import { DevTool } from '@hookform/devtools'
import { useEffect } from "react"
import SucessfulMessage from "./sucessful"

let renderCount = 0
const SignUp = ({handleAdd}) => {

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      channel: '',
      social: {
        facebook: '',
        instagram:''
      },
      contact: [],
      dob:''
    },
    mode:'all'
  })
  const { register, control, handleSubmit, formState, watch, setValue, getValues, reset } = form;

  // reset is used to make form value default and it is a function

  const { errors, isDirty, dirtyFields, isValid, disabled, isSubmitted, isSubmitting, isSubmitSuccessful,submitCount } = formState;
  
  // isSubmitting first value is false when form submit the form it will be true and when isSubmitting is complete it became false
  // isSubmitted first value is false when form submit the form it will be true
  // isSubmitSuccessful first value is false when form submited it will become true
  // submitCount track the how time form has been sucessfully submited initial value is 0 
  console.log('isSubmitted',isSubmitted)
  console.log('isSubmitSuccessful', isSubmitSuccessful)
  
  renderCount++

  const onSubmit = (data) => {
    handleAdd(getValues())
/*     setValue('username', '')
    setValue('email','')
    setValue('channel','')
    setValue('social.facebook','')
    setValue('social.instagram','')
    setValue('contact.0', '')
    setValue('contact.1','')
    setValue('dob','')
 */  }

  const onError = (errors) => {
    console.log('form errors',errors)
  }

  // prevent from rerendering the form
  useEffect(() => {
    const subscription = watch((value) => {
      return value
    })
    return ()=> subscription.unsubscribe()
  }, [watch])
  
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset()
    }
  },[isSubmitSuccessful,reset])
  
  return (
    <>
      <form className=' w-[30%] max-md:w-full max-md:h-full flex flex-col items-center bg-[rgba(11,12,12,0.49)] p-4 rounded-md'
      onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <h1 className='text-[20px]'>create new account ({renderCount / 2}) </h1>
        {/* form */}
        <div className='flex flex-col w-full h-full gap-4 py-2' >
          
          <div className='flex flex-col gap-1'>
            <div className="flex justify-between">
              <label htmlFor="username">username</label>
              <span className="text-[#ff0000] text-[14px]">{errors.username?.message}</span>
            </div>
            <input type="text" id='username' placeholder="username"
              className='p-2 rounded-md outline-1 outline-sky-500 invalid:outline-red-500'  {...register('username', {
              required: {
                value: true,
                message: '*please enter your user name'
              }
            })}autoComplete="true" />
          </div>
          
          <div className='flex flex-col gap-1'>
            <div className="flex justify-between">
              <label htmlFor="email">email</label>
              <span className="text-[#ff0000] text-[14px]">{errors.email?.message }</span>
            </div>

            <input type="email" id="email" placeholder='example@gmail.com' className=' p-2 rounded-md outline-1 outline-sky-500 invalid:outline-[#ff0000]' {...register('email', {
              required: {
                value: true,
                message: '*please enter your email address'
              },
              pattern: {
                value: /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,
                message: 'emali is invalid'
              },
              validate: ((value) => {
                return (
                  value !== 'example@gmail.com' || 'enter different email it is for the examle purpose'
                )
              })
            })} autoComplete="true" />
          </div>

          <div className='flex flex-col gap-1'>
            <div className="flex justify-between">
              <label htmlFor="channel">channel</label>
              <span className="text-[#ff0000] text-[14px]">{errors.channel?.message}</span>
            </div>
            <input type="text" id="channel" placeholder='channel name' className='p-2 rounded-md' {...register('channel', {
              required: {
                value: true,
                message: '*please enter the channel name'
              },
            })}autoComplete="true"  />
          </div>

          <div className='flex flex-col gap-1'>
            <div className="flex justify-between">
              <label htmlFor="facebook" >facebook</label>
              <span className="text-[#ff0000] text-[14px]">{errors.social?.facebook?.message}</span>
            </div>
            <input type="text" id="facebook" placeholder='facebook' className='p-2 rounded-md' {...register('social.facebook', {
              required: {
                value: true,
                message: '*please enter the facebook name'
              }
            })} autoComplete="true" />
          </div>

          <div className='flex flex-col gap-1'>
            <div className="flex justify-between">
              <label htmlFor="primaryNumber" >primaryNumber</label>
              <span className="text-[#ff0000] text-[14px]">{errors.contact?.message}</span>
            </div>
            <input type="number" id="primaryNumber" placeholder='primaryNumber' className='p-2 rounded-md number-to-text' {...register('contact.0', {
              required: {
                value: false,
                message: '*please enter the primaryNumber name'
              },
              valueAsNumber: true,
            })} autoComplete="true" />
          </div>

          <div className='flex flex-col gap-1'>
            <div className="flex justify-between">
              <label htmlFor="dob" >date of birth</label>
              <span className="text-[#ff0000] text-[14px]">{errors.dob?.message}</span>
            </div>
            <input type="date" id="dob" placeholder='sconderyNumber' className='p-2 rounded-md' {...register('dob', {
              required: {
                value: true,
                message: '*please enter your date of birth'
              },
              minLength: 8
              ,
              /* valueAsNumber is used to make number */
              valueAsDate:true,
            })} autoComplete="true" />
          </div>
        </div>
        <div className="flex gap-x-4">
            <button className='px-8 py-2 rounded-md disable text-stone-100 bg-sky-500' >submit</button>
          <button onClick={()=> reset()} type="button" className='px-8 py-2 rounded-md disable text-stone-100 bg-lime-500' >reset</button>
        </div>
        
        {/*         <button className='px-8 py-2 rounded-md disable text-stone-100 bg-sky-500' disabled={!isDirty || !isValid}>submit</button> */}
        <DevTool control={control}></DevTool>
      </form>
    </>

  )
}

export default SignUp