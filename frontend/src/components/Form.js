import React from "react";

const Form = ({ submitInfo, newName, nameChange, newNumber, numberChange, }) => {
    return (
        <div>
            <form onSubmit={submitInfo}>
                <div>
                    name: <input value={newName} onChange={nameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={numberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default Form;