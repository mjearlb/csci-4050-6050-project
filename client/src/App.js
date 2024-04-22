import React, {useEffect, useState} from 'react'

function App() {
/*

=======
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Please sign in
        </p>
        <a
          className="App-link"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Log In
        </a>
      </header>
    </div>
  );
}
*/

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
