import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HorizontalLine } from "../components/HorizoantalLine/HorizontalLine";
import { SectionWrapper } from "../components/SectionWrapper/SectionWrapper";
import { UserContext } from "../context/UserContext";
import { LoginForm } from "../components/LoginForm/LoginForm";

export const LoginPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  return (
    <>
    <HorizontalLine />
    <SectionWrapper>
      {!user ? <LoginForm  /> : null} 
    </SectionWrapper>
    
    </>
  );
};
