import { useState } from "react";
import { useForm } from "react-hook-form";
import  BlessApi from "../../services/api-service";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth-context";
import "./register-form.css";

function RegisterForm() {
  const { register, handleSubmit, formState, setError } = useForm();
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const errors = formState.errors;
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async (user) => {
    const formData = new FormData();

    formData.append("nombre", user.nombre);
    formData.append("apellidos", user.apellidos);
    formData.append("email", user.email);
    formData.append("password", user.password);

    try {
      await BlessApi.register(formData);
      const data = await BlessApi.login(user);

      login(data);
      setSuccessMessage("Usuario creado correctamente");
      navigate("/");
    } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const { errors } = error.response.data;
          Object.keys(errors).forEach((inputName) => 
            setError(inputName, { message: errors[inputName] })
          );
        } else {
          console.error("Error inesperado:", error);
          // Aquí podrías setear un error general en el formulario o mostrar un mensaje genérico
        }
      }
      
  };

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <h2>Regístrate:</h2>

      <input
        type="text"
        className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
        placeholder="Introduce tu nombre"
        {...register("nombre", { required: "Campo obligatorio" })}
        required
      />
      {errors.nombre && <p className="error">{errors.nombre.message}</p>}

      <input
        type="text"
        className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
        placeholder="Introduce tus apellidos"
        {...register("apellidos", { required: "Campo obligatorio" })}
        required
      />
      {errors.apellidos && <p className="error">{errors.apellidos.message}</p>}

      <input
        type="email"
        className={`form-control ${errors.email ? "is-invalid" : ""}`}
        placeholder="Introduce tu email"
        {...register("email", { required: "Campo obligatorio" })}
        required
      />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <span className="input-group-text">
        <i className="fa fa-lock fa-fw"></i>
      </span>
      <input
        type="password"
        className={`form-control ${errors.password ? "is-invalid" : ""}`}
        placeholder="****"
        {...register("password", { required: "Campo obligatorio" })}
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit" disabled={Object.keys(errors).length > 0}>
        Registrarse
      </button>

      {/* Mostrar el mensaje de éxito si existe */}
      {successMessage && <p className="success">{successMessage}</p>}
    </form>
  );
}

export default RegisterForm;
