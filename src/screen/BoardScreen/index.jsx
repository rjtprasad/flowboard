import BoardInterface from "./BoardInterface";
import BoardTopbar from "./BoardTopbar";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../../store";
import { useCallback, useEffect, useMemo, useState } from "react";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import BoardNotReady from "./BoardNotReady";

const BoardScreen = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [loading, setLoading] = useState(true);
  const { boardId } = useParams();
  const { fetchBoard, deleteBoard } = useApp();
  const { boards, areBoardsFetched } = useStore();

  const board = useMemo(() => boards.find((b) => b.id === boardId), []);
  const boardData = useMemo(() => data, [data]);

  const handleUpdateLastUpdated = useCallback(
    () => setLastUpdated(new Date().toLocaleString("en-Us")),
    []
  );

  const handleFetchBoard = async () => {
    try {
      const boardData = await fetchBoard(boardId);
      if (boardData) {
        const { tabs, lastUpdated } = boardData;
        setData(tabs);
        setLastUpdated(lastUpdated.toDate().toLocaleString("en-Us"));
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteBoard = useCallback(async () => {
    if (!window.confirm("Do you want to delete this board?")) {
      return;
    } else {
      try {
        setLoading(true);
        await deleteBoard(boardId);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!areBoardsFetched || !board) {
      navigate("/boards");
    } else {
      handleFetchBoard();
    }
  }, []);

  if (!board) return null;
  if (loading) return <AppLoader />;
  if (!data) return <BoardNotReady />;

  return (
    <>
      <BoardTopbar
        name={board.name}
        color={board.color}
        lastUpdated={lastUpdated}
        deleteBoard={handleDeleteBoard}
      />
      <BoardInterface
        boardData={boardData}
        boardId={boardId}
        updateLastUpdated={handleUpdateLastUpdated}
      />
    </>
  );
};

export default BoardScreen;
