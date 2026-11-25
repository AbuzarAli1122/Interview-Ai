
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import "../auth.form.scss";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../services/auth.api";
import { toast } from "react-toastify";

const Register = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
   const { isLoading } = useSelector( state => state.auth)

  const [showPassword, setShowPassword] = useState(false);
  const [ formData, setFormData ] = useState({
    username:'',
    email:'',
    password:''
  })

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e)=>{
    e.preventDefault()
    try{
     const response =  await dispatch(registerUser(formData)).unwrap();
      toast.success(
        response?.message || "Account created successfully!"
      );
 setFormData({
        username: "",
        email: "",
        password: ""
      });
      navigate('/login');

    }catch(err){
     const errorMessage =
        typeof err === "string"
          ? err
          : err?.message || "Registration failed";

      toast.error(errorMessage);

      console.error("Register Error:", err);
    }
  }

  return (
    <main className="auth-page">
      <div className="form-container">

        <div className="form-header">
          <h1>Create Account 🚀</h1>
          <p>Join us today and get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

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
                placeholder="Create a password"
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


          <button type="submit" className="button primary-button">
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="register-text">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>
    </main>
  );
};

export default Register;
