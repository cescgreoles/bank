// pages/profile.tsx
import { auth } from "@/lib/firebaseConfig"; // Importar la configuración de Firebase
import { useAuthState } from "react-firebase-hooks/auth"; // Hook para controlar el estado de autenticación
import { useRouter } from "next/router"; // Para redirigir
import { useEffect } from "react";

const Profile = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // Redirigir si no hay usuario autenticado
  useEffect(() => {
    if (loading) return; // Espera a que la autenticación esté lista
    if (!user) router.push("/"); // Redirigir a la página principal si no hay usuario
  }, [user, loading, router]);

  if (loading) {
    return <div>Cargando...</div>; // Puedes agregar un spinner o mensaje de carga aquí
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Perfil del Usuario</h1>
      <p>Nombre: {user?.displayName}</p>
      <p>Email: {user?.email}</p>
      <p>ID: {user?.uid}</p>
      {/* Aquí puedes agregar más información que desees mostrar */}
    </div>
  );
};

export default Profile;
