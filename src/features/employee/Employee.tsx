import React, {FC} from 'react'
import {useParams} from 'react-router-dom'

const Employee: FC = () => {
    const {id} = useParams()
    console.log(id);
    
  return (
    <div>Employee</div>
  )
}

export default Employee