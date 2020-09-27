import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from './Utils/Common';
function SignUp(props) {
    const [loading, setLoading] = useState(false);
    const name = useFormInput('');
    const username = useFormInput('');
    const password = useFormInput('');
    const confirmpassword = useFormInput('');
    const [error, setError] = useState(null);

    // handle button click of login form
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        if (username.value === "" || password.value === "" || confirmpassword.value === "" || name.value === "") {
            setError("All feilds are required..");
            return
        }
        const model = {
            Name: name.value,
            Email: username.value,
            Password: password.value
        }
        axios.post('https://localhost:44399/user/saveuser', model)
            .then(function (response) {
                setLoading(false);
                props.history.push('/dashboard');
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return (
        <div>
            SignUp<br /><br />
            <div>
                Name<br />
                <input type="text" {...name} autoComplete="new-password" />
            </div>
            <div>
                Email<br />
                <input type="text" {...username} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Confirm Password<br />
                <input type="password" {...confirmpassword} autoComplete="new-password" />
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

export default SignUp;