import React from "react";
import { fetchCards } from "../../redux/slices/cards";
import CardContainer from "./CardContainer";
import { Navigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import { getUserId } from "../../helpers/additionFunction";
import { IUserId } from "../../types/user.typing";
import { Loading } from "../../types/global.typing";

const Dictionary = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => state.cards.cards);

  const userId: IUserId = getUserId();

  React.useEffect(() => {
    dispatch(fetchCards({ userId }));
  }, []);
  return (
    <div>
      {cards.status === Loading.Loaded ? (
        <CardContainer />
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
      {userId.id !== undefined ? true : <Navigate to="/signin" />}
    </div>
  );
};

export default Dictionary;
