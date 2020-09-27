import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('test@yopmail.com');
  const password = useFormInput('123456');
  const [error, setError] = useState(null);

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);

    if (username.value === "" || password.value === "") {
      setError("All feilds are required..");
      return
    }



    axios.get(`https://localhost:44399/user/getuser?email=${username.value}&password=${password.value}`)
      .then(function (response) {
        var result = response["data"]
        if(result.data===null){
          setError("InValid Credentials");
          return
        }else
        {
          setLoading(false);
          setUserSession("user", result.data);
          props.history.push('/dashboard');
        }
      })
      .catch(function (error) {
        setError("Something went wrong. Please try again later.");
      })



    // if (username.value == "ekta" && password.value == "123456") {
    //   setLoading(false);
    //   setUserSession("gsdhgssjf", username.value);
    //   props.history.push('/dashboard');
    // } else {
    //   setError("Something went wrong. Please try again later.");
    // }
  }

  return (
    <div>
      Login<br /><br />
      <div>
        Email<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;