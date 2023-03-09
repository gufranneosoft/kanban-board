import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Edit,
  Trash,
  Trash2,
} from "react-feather";

import * as boardActions from "../../Redux/slices/board/boardActions";
import { formatDate } from "../../helpers/common";
import ConfirmModal from "../Modals/Confirm/Confirm";
import CardInfo from "./CardInfo/CardInfo";
import "./Card.css";

function Card(props) {
  const { card, boardId, cardId, handleDragStart, handleDragEnter } = props;
  const { stage, id, name, priority, deadline } = card;

  const dispatch = useDispatch();
  const { boards } = useSelector(({ board }) => board);

  const [showModal, setShowModal] = useState({ show: false, data: "" });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const removeTask = () => {
    let bds = JSON.parse(JSON.stringify(boards));
    const boardIndex = bds.findIndex((board) => board.id === boardId);
    bds[boardIndex].cards = bds[boardIndex].cards.filter(
      (c) => c.id !== cardId
    );
    dispatch(boardActions.updateBoard(bds));
  };

  const moveTaskForward = () => {
    let bds = JSON.parse(JSON.stringify(boards));
    const s_boardIndex = bds.findIndex((board) => board.id === boardId);
    if (s_boardIndex >= 3) return;
    const s_cardIndex = bds[s_boardIndex].cards.findIndex(
      (c) => c.id === cardId
    );
    const removedItem = bds[s_boardIndex].cards.splice(s_cardIndex, 1);
    bds[s_boardIndex + 1].cards.push({
      ...removedItem[0],
      stage: s_boardIndex + 1,
    });
    dispatch(boardActions.updateBoard(bds));
  };

  const moveTaskBackward = () => {
    let bds = JSON.parse(JSON.stringify(boards));
    const s_boardIndex = bds.findIndex((board) => board.id === boardId);
    if (s_boardIndex <= 0) return;
    const s_cardIndex = bds[s_boardIndex].cards.findIndex(
      (c) => c.id === cardId
    );
    const removedItem = bds[s_boardIndex].cards.splice(s_cardIndex, 1);
    bds[s_boardIndex - 1].cards.push({
      ...removedItem[0],
      stage: s_boardIndex - 1,
    });
    dispatch(boardActions.updateBoard(bds));
  };

  return (
    <>
      {showConfirmModal && (
        <ConfirmModal
          show={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onSubmit={removeTask}
        />
      )}
      {showModal?.show && (
        <CardInfo
          isEditMode={true}
          title="Edit Task"
          show={showModal?.show}
          onClose={() => setShowModal({ show: false, data: "" })}
          boardId={boardId}
          data={card}
        />
      )}

      <div
        name="card"
        id={id}
        className="card"
        draggable
        onDragStart={(e) => {
          handleDragStart(e, boardId, id);
        }}
        onDragEnter={(e) => {
          handleDragEnter(e, boardId, id);
        }}
      >
        <div className="card_top">
          <div className="card_top_labels">
            <label style={{ backgroundColor: priority?.color }}>
              {priority?.title}
            </label>
          </div>

          <div className="card_top_right">
            <ArrowLeft
              onClick={moveTaskBackward}
              style={{
                cursor: stage == 0 ? "not-allowed" : "pointer",
                color: stage == 0 ? "#bbb4b4" : "inherit",
              }}
            />
            <Edit
              onClick={() => {
                setShowModal({ show: true, data: card });
              }}
            />
            <Trash2 onClick={() => setShowConfirmModal(true)} />
            <ArrowRight
              onClick={moveTaskForward}
              style={{
                cursor: stage == 3 ? "not-allowed" : "pointer",
                color: stage == 3 ? "#bbb4b4" : "inherit",
              }}
            />
          </div>
        </div>
        <div className="card_title">{name}</div>
        <div className="card_footer">
          {deadline && (
            <p className="card_footer_item">
              <Clock className="card_footer_icon" />
              {formatDate(deadline)}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
