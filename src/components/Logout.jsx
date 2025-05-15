import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router";

const Logout = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      // (1) Appel API pour notifier la déconnexion
      await fetch("https://offers-api.digistos.com/api/auth/logout", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // (2) Suppression du token côté frontend
      dispatch(logout(token));
      // (3) Redirection vers la page de login
      navigate("/connexion");
    };

    handleLogout();
  }, [token, navigate]);

  return null; // Pas besoin d'afficher quoi que ce soit
};

export default Logout;
