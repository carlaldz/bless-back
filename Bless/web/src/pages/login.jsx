import LoginForm from "../components/login-form/login-form";
import RegisterForm from "../components/register-form/register-form";
import "./login.css"

const Login = () => {
    return(
        <div className="forms">
            <RegisterForm/>
            <LoginForm/>
        </div>
    )
}

export default Login; 