import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function Home() {
    const tryingfunc = async () => {
        const res = await axios.get('http://localhost:8000');
        console.log(res)
    }
    useEffect(() => {
         tryingfunc();
    })
    return (
        <>
        <h1>This is Home</h1>
        </>
    )
}

export default Home
