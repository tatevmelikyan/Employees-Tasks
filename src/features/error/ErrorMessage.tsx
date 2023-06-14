import React from 'react'

const ErrorMessage = ({message}: {message: string}) => {
  return (
    <div className='error'>
        {message}
    </div>
  )
}

export default ErrorMessage