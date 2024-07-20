import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import useStore from "../store";
import { useNavigate } from "react-router-dom";

const useApp = () => {
  const navigate = useNavigate();
  const {
    currentUser: { uid },
  } = getAuth();

  const { boards, addBoard, setBoards, setToastr } = useStore();
  const boardsColRef = collection(db, `users/${uid}/boards`);

  const createBoard = async ({ name, color }) => {
    try {
      const doc = await addDoc(boardsColRef, {
        name,
        color,
        createdAt: serverTimestamp(),
      });
      addBoard({
        name,
        color,
        createdAt: new Date().toLocaleString("en-Us"),
        id: doc.id,
      });
    } catch (error) {
      setToastr("Error while creating board");
      throw error;
    }
  };

  const fetchBoards = async (setLoading) => {
    try {
      const q = query(boardsColRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const boards = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate().toLocaleString("en-Us"),
      }));
      setBoards(boards);
    } catch (error) {
      setToastr("Error while fetching boards");
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  const fetchBoard = async (boardId) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      const doc = await getDoc(docRef);
      if (doc.exists) {
        return doc.data();
      }
    } catch (error) {
      setToastr("Error while fetching board");
      throw error;
    }
  };

  const updateBoardData = async (boardId, tabs) => {
    const docRef = doc(db, `users/${uid}/boardsData/${boardId}`);
    try {
      await updateDoc(docRef, { tabs, lastUpdated: serverTimestamp() });
    } catch (error) {
      setToastr("Error while updating board");
      throw error;
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      //delete the doc from the db
      const docRef = doc(db, `users/${uid}/boards/${boardId}`);
      await deleteDoc(docRef);

      // update the boards in store
      const tempBoards = boards.filter((board) => board.id !== boardId);
      setBoards(tempBoards);

      // navigate to the board screen
      navigate("/boards");
    } catch (error) {
      setToastr("Error deleting board");
      throw error;
    }
  };

  return { createBoard, fetchBoards, fetchBoard, updateBoardData, deleteBoard };
};

export default useApp;
