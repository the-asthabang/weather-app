import React from 'react'

const Forecast = ({title, data}) => {
    
  return (
    <div>
        <div className='flex items-center justify-start mt-6'>
            <p className='lg:font-medium font-light text-sm lg:text-base uppercase'>{title}</p>
        </div>

        <hr className='my-2'/>
        <div className='flex items-center justify-between overflow-hidden'>
           {data.map((data,index)=>(
            <div key={index} className='flex flex-col items-center justify-center w-36 m-1'>
                <p className='font-light lg:text-base text-sm'>{data.title}</p>
                <img src={data.icon} alt="weather icon" className='lg:w-12 my-1 w-8'/>
                <p className='font-medium '>{`${data.temp}°`}</p>

            </div>
           ))}
        </div>
      

        
    </div>
  )
}

export default Forecast
