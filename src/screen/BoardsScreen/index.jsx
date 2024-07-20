import { useState, useEffect } from "react";
import CreateBoardModal from "./CreateBoardModal";
import TopBar from "./TopBar";
import NoBoards from "./NoBoards";
import { Grid, Stack } from "@mui/material";
import BoardCard from "./BoardCard";
import useApp from "../../hooks/useApp";
import AppLoader from "../../components/layout/AppLoader";
import useStore from "../../store";

const BoardsScreen = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { fetchBoards } = useApp();
  const { boards, areBoardsFetched } = useStore();

  useEffect(() => {
    if (!areBoardsFetched) {
      fetchBoards(setLoading);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  return (
    <>
      <TopBar openModal={() => setShowModal(true)} />
      {showModal && <CreateBoardModal closeModal={() => setShowModal(false)} />}
      {/* <NoBoards /> */}
      {!boards.length ? (
        <NoBoards />
      ) : (
        <Stack mt={5} px={3}>
          <Grid container spacing={{xs: 2, sm: 4}}>
            {boards.map((board) => (
              <BoardCard key={board.id} {...board} />
            ))}
          </Grid>
        </Stack>
      )}
    </>
  );
};

export default BoardsScreen;
