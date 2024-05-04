import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
function Home() {
    useEffect(() => {
        axios.get('http://localhost:8000/api/v1/user/test').then((res) => console.log(res))
    })
    return (
        <>
        <h1>This is Home</h1>
        </>
    )
}

export default Home
