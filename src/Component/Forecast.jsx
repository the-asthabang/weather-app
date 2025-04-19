import React from 'react'

const Forecast = ({title, data}) => {

  const convertTo24Hour = (timeStr) => {
    const [time, modifier] = timeStr.trim().split(' ');
    let [hours, minutes] = time.split(':');
  
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    if (!modifier) return timeStr; // assumes it's already in 24-hour

  
    if (modifier.toUpperCase() === 'PM' && hours !== 12) {
      hours += 12;
    }
    if (modifier.toUpperCase() === 'AM' && hours === 12) {
      hours = 0;
    }
  
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  };
  return (
    <div>
        <div className='flex items-center justify-start mt-6'>
            <p className='lg:font-medium font-light text-sm lg:text-base uppercase'>{title}</p>
        </div>

        <hr className='my-2'/>
        <div className='flex items-center justify-between overflow-hidden'>
           {data.map((data,index)=>(
            <div key={index} className='flex flex-col items-center justify-center w-36 m-1'>
                <p className='font-light lg:text-base text-sm'>{convertTo24Hour(data.title)}</p>
                <img src={data.icon} alt="weather icon" className='lg:w-12 my-1 w-8'/>
                <p className='font-medium '>{`${data.temp}°`}</p>

            </div>
           ))}
        </div>   
    </div>
  )
}

export default Forecast
