import axios from 'axios'
import { useEffect, useState } from 'react'

const Test = () => {
    const [message, setMessage] = useState()
    useEffect(() => {
        async function getMessage() {
            let res = await axios.get("http://localhost:7000/home");
            let message = res.data
            // setMessage({
            //   ...message,
            //   date: message.date,
            // });
            setMessage(message)
        }

        getMessage()
    }, [])
  return (
    <div className='flex my-10 justify-center'>
      Message from Backend : {message}
    </div>
  )
}

export default Test
