import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="navbar">
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
        <img src={logo} className="App-logo" alt="bulldog-logo" />
        <a href="#" class="right">Account</a>
      </div>
      <header className="App-header">
        
        <p>
          Welcome!
          Please Sign In or Register
        </p>
        <p>
          Username:
          
        </p>
        <p>
          Password:
        </p>
        <p>
          Log In
        </p>
        <p>
          Don't have an account?
          
        </p>
        <p>
          Register Here
        </p>
      </header>
      
    </div>
    
  );
}

export default App;
