import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Trash, Trash2 } from "react-feather";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { BACKEND_URL } from "../../backend/constants";

import * as boardActions from "../../Redux/slices/board/boardActions";
import Board from "../Board/Board";
import CardInfo from "../Card/CardInfo/CardInfo";
import ConfirmModal from "../Modals/Confirm/Confirm";
import "./Dashboard.css";

// const bds = [
//   {
//     id: "Backlog",
//     title: "Backlog",
//     stage: 0,
//     cards: [],
//   },
//   {
//     id: "To Do",
//     title: "To Do",
//     stage: 1,
//     cards: [],
//   },
//   {
//     id: "Ongoing",
//     title: "Ongoing",
//     stage: 2,
//     cards: [],
//   },
//   {
//     id: "Done",
//     title: "Done",
//     stage: 3,
//     cards: [],
//   },
// ];

function Dashboard() {
  const [showModal, setShowModal] = useState({ show: false, data: "" });
  const [dragData, setDragData] = useState({
    source: { bId: "", cId: "" },
    target: { bId: "", cId: "" },
  });

  const [showTrashIcon, setShowTrashIcon] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { user } = useSelector(({ auth }) => auth);
  const { boards } = useSelector(({ board }) => board);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) history.push("/login");
  }, []);

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = () => {
    dispatch(boardActions.fetchBoard());
  };

  const handleDragStart = (e, s_bid, s_cid) => {
    setShowTrashIcon(true);
    if (dragData?.source?.id === "" || dragData.source.cId === s_cid) return;
    setDragData({
      source: { bId: s_bid, cId: s_cid },
      target: { bId: "", cId: "" },
    });
  };

  const handleOnDrop = (e, t_bid) => {
    const bds = JSON.parse(JSON.stringify(boards));

    const {
      source: { bId: s_bId, cId: s_cId },
      target: { bId: t_bId, cId: t_cId },
    } = dragData;

    const sBoardIndex = bds.findIndex((b) => b.id === s_bId);
    const tBoardIndex = bds.findIndex((b) => b.id === t_bid);

    const sCardIndex = bds[sBoardIndex].cards.findIndex((c) => c.id === s_cId);
    const tCardIndex = bds[tBoardIndex].cards.findIndex((c) => c.id === t_cId);

    if (t_cId) {
      const tCardIndex = bds[tBoardIndex].cards.findIndex(
        (c) => c.id === t_cId
      );
      if (
        sBoardIndex === tBoardIndex &&
        Math.abs(sCardIndex - tCardIndex) == 1
      ) {
        const temp = bds[tBoardIndex].cards[tCardIndex];
        bds[tBoardIndex].cards[tCardIndex] = bds[tBoardIndex].cards[sCardIndex];
        bds[tBoardIndex].cards[sCardIndex] = temp;
      } else {
        const cardToBeMove = bds[sBoardIndex].cards.splice(sCardIndex, 1);
        bds[tBoardIndex].cards.splice(tCardIndex, 0, {
          ...cardToBeMove[0],
          stage: tBoardIndex,
        });
      }
    } else {
      const cardToBeMove = bds[sBoardIndex].cards.splice(sCardIndex, 1);
      bds[tBoardIndex].cards.push(cardToBeMove[0]);
    }

    setDragData({
      source: { bId: "", cId: "" },
      target: { bId: "", cId: "" },
    });
    dispatch(boardActions.updateBoard(bds));
    setShowTrashIcon(false);
  };

  const handleDragEnter = (e, t_bid, t_cid) => {
    setDragData((prev) => {
      return {
        source: {
          ...prev.source,
        },
        target: { bId: t_bid, cId: t_cid },
      };
    });
  };

  const removeTask = () => {
    console.log("dragData", dragData);

    let bds = JSON.parse(JSON.stringify(boards));
    const boardIndex = bds.findIndex(
      (board) => board.id === dragData.source.bId
    );
    bds[boardIndex].cards = bds[boardIndex].cards.filter(
      (c) => c.id !== dragData.source.cId
    );
    dispatch(boardActions.updateBoard(bds));
    setShowTrashIcon(false);
    setDragData({
      source: { bId: "", cId: "" },
      target: { bId: "", cId: "" },
    });
  };

  return (
    <Container style={{ minWidth: "100%" }}>
      {showConfirmModal && (
        <ConfirmModal
          show={showConfirmModal}
          onClose={() => {
            setShowConfirmModal(false);
            setShowTrashIcon(false);
          }}
          onSubmit={removeTask}
        />
      )}
      <div className="dashboard">
        <div className="app_nav">
          <div className="w-100 d-flex justify-content-between align-items-center">
            {" "}
            <div></div>
            <Button
              variant="primary"
              onClick={() => setShowModal({ show: true, data: "" })}
            >
              Create Task
            </Button>
          </div>
          <Row>
            {showModal?.show && (
              <CardInfo
                isEditMode={false}
                title="Add New Task"
                show={showModal?.show}
                onClose={() => setShowModal({ show: false, data: "" })}
                boardId="Backlog"
              />
            )}
          </Row>
        </div>
        <Row>
          {boards?.map((item) => (
            <Board
              key={item.id}
              board={item}
              handleDragStart={handleDragStart}
              handleOnDrop={handleOnDrop}
              handleDragEnter={handleDragEnter}
            />
          ))}
        </Row>
        <div className="trash_area_bottom">
          <div></div>
          {showTrashIcon && (
            <div
              onDrop={(e) => {
                // removeTask(e);
                setShowConfirmModal(true);
              }}
              onDragOver={(e) => {
                e.preventDefault();
                // console.log("e", e);
              }}
              className="trash_icon_bottom"
            >
              <Trash2 />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Dashboard;
