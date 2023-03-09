import React from "react";
import { Col } from "react-bootstrap";

import Card from "../Card/Card";
import "./Board.css";

function Board(props) {
  const { board, card, handleOnDrop, handleDragStart, handleDragEnter } = props;
  return (
    <Col sm="6" md="4" lg="3" xl="3" className="board-container">
      <div className="board">
        <div className="board_header">
          <p className="board_header_title">
            {board?.title}
            <span>{board?.cards?.length || 0}</span>
          </p>
        </div>
        <div
          className="board_cards custom-scroll"
          onDrop={(e) => {
            handleOnDrop(e, board?.id, card?.id);
          }}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          {board?.cards?.map((item) => (
            <Card
              key={item.id}
              card={item}
              boardId={board.id}
              cardId={item.id}
              handleDragStart={handleDragStart}
              handleDragEnter={handleDragEnter}
            />
          ))}
        </div>
      </div>
    </Col>
  );
}

export default Board;
