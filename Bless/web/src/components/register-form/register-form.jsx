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
        const serverErrors = error.response.data.errors;
        if (serverErrors.email) {
          // Si existe un error en email, establecemos el mensaje "Email ya registrado"
          setError("email", { message: "Email ya registrado" });
        } else {
          // Para otros errores, recorremos y asignamos el mensaje que venga del servidor
          Object.keys(serverErrors).forEach((inputName) =>
            setError(inputName, { message: serverErrors[inputName] })
          );
        }
      } else {
          console.error("Error inesperado:", error);
          // Aquí podrías establecer un error general en el formulario o mostrar un mensaje genérico
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
        style={{ width: "85%" }}
        required
      />
      {errors.nombre && <p className="error">{errors.nombre.message}</p>}

      <input
        type="text"
        className={`form-control ${errors.apellidos ? "is-invalid" : ""}`}
        placeholder="Introduce tus apellidos"
        {...register("apellidos", { required: "Campo obligatorio" })}
        style={{ width: "85%" }}
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
