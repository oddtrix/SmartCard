import React from "react";
import { fetchCards } from "../../redux/slices/cards";
import CardContainer from "./CardContainer";
import jwt_decode from "jwt-decode";
import { selectorIsAuth } from "../../redux/slices/auth";
import { Navigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { DecodedToken, ICardId } from "../../types/global.typing";

const Dictionary = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards);

  const token = window.localStorage.getItem("token");
  const decoded: DecodedToken | null = token ? jwt_decode(token) : null;
  const idClaim =
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
  const userId: ICardId = decoded ? { id: decoded[idClaim] } : { id: null };

  const updateInfo = () => {
    dispatch(fetchCards(userId));
  };

  React.useEffect(() => {
    dispatch(fetchCards(userId));
  }, []);
  return (
    <div>
      {cards.cards.status === "Loaded" ? (
        <CardContainer myCards={cards.cards.items} />
      ) : (
        <div className="flex justify-center mt-28">
          <TailSpin
            height="60"
            width="60"
            color="#51E5FF"
            ariaLabel="tail-spin-loading"
            radius="1"
            visible={true}
          />
        </div>
      )}
      {userId.id !== null ? true : <Navigate to="/signin" />}
    </div>
  );
};

export default Dictionary;
