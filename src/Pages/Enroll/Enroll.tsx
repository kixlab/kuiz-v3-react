import React, { useState } from 'react';
import "./Enroll.scss";

function Enroll() {
    return (
        <div id="CodeInputBox">
            <strong>Class code</strong>
            <input type="text" id="ClassCodeInput" placeholder='Enter code'></input>
            <button>Enter</button>
        </div>
    )
}

export default Enroll;