import {FC} from 'react'
import './style.css'

const HomePage: FC = () => {
  return (
    <div className='home__page'>
     <h1>Welcome!</h1>
     <p>You can get information about employees and tasks in the 'Employees' and 'Tasks' pages.</p>
     <p>You can also create, update or delete any employee or task.</p>
    </div>
  )
}

export default HomePage