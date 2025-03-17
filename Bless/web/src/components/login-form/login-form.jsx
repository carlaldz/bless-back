import "./login-form.css";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch("http://localhost:5000/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include", 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.email || "Credenciales incorrectas");
      }

      const user = await response.json();
      console.log("Usuario logueado:", user);
      // Aquí puedes redirigir al usuario a otra página, como su perfil
      setError(""); 
    } catch (error) {
      console.error("Error en login:", error.message);
      setError(error.message); 
    }
  };

  return (
     
    <form onSubmit={handleSubmit}>
      <h2>Inicia Sesión:</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="****"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>} {/* Mostrar el error si existe */}
    </form>
    
  );
};

export default LoginForm;
