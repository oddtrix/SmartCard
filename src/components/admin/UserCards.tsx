import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { IAdminUser } from "../../types/admin.typing";
import Pagination from "../dictionary/Pagination";
import { ICard } from "../../types/card.typing";
import CardItem from "../dictionary/CardItem";

const UserCards = (props: {
  selectedUser: IAdminUser | undefined;
  pageSize: number;
}) => {
  const cards = useAppSelector((state) => state.cards.cards.items);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(cards.length / props.pageSize);

  return (
    <div className="border border-black rounded-lg mt-4 flex flex-col  h-[380px]">
      <table>
        <tbody>
          {cards
            .slice(
              (currentPage - 1) * props.pageSize,
              (currentPage - 1) * props.pageSize + props.pageSize
            )
            .map((card: ICard) => (
              <CardItem card={card} key={card.id} admin={true} />
            ))}
        </tbody>
      </table>
      {cards.length > 0 ? (
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ) : (
        <p className="flex justify-center items-center h-3/4 text-red-600">
          No Cards
        </p>
      )}
    </div>
  );
};

export default UserCards;
