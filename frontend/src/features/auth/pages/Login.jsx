
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import "../auth.form.scss";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../services/auth.api.js";
import { toast } from "react-toastify";


const Login = () => {

    const dispatch = useDispatch()
    const navigate= useNavigate()
    const { isLoading } = useSelector( state => state.auth)

    // states
  const [showPassword, setShowPassword] = useState(false);
  const [ formData, setFormData ] = useState({
    email:'',
    password:''
  })

  const handleChange = (e)=>{
    setFormData({
        ...formData,
        [e.target.name] : e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
      const response =  await dispatch(loginUser(formData)).unwrap();
      toast.success(
        response?.message || "Login successfully!"
      );
        navigate('/')

    }catch(error){
         const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Login failed";

      toast.error(errorMessage);

      console.error("Login Error:", error);
    }
  }

  return (
    <main className="auth-page">
      <div className="form-container">

        <div className="form-header">
          <h1>Welcome Back 👋</h1>
          <p>Login to continue to your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>


          <button type="submit" className="button primary-button " disabled={isLoading}>
           {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="register-text">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

      </div>
    </main>
  );
};

export default Login;
