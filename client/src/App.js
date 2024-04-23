import React, {useEffect, useState} from 'react'
import nodemailer from 'nodemailer';
function App() {
	
    const [backEndData, setBackEndData] = useState([{}])

    useEffect(() => {
	fetch("/api").then( // can just do "/api" since we set proxy in package.json
	    response => response.json()
	).then(
	    data => {
		setBackEndData(data)
	    }
	)
    }, [])
    
    return (
	<div>

	</div>
    )
} // App

export default App
