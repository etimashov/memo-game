import "./ModalMessage.css"
import React from "react";

export function ModalMessage({ score, message, closeHandler }) {
    return (
        <div className="modal" onClick={closeHandler}>
            <div className="win-message">
                <h4>Your score:</h4>
                <h1>{score} turns</h1>
                <p className="modal-text">{message}</p>
            </div>
        </div>
    )
}