import React from "react";

function CustomCheckbox({ value, onChange, trueIcon, falseIcon }) {
    return (
        <div onClick={() => onChange()}>
            {value ? (
                <i className={`fas fa-${trueIcon}`} />
            ) : (
                <i className={`fas fa-${falseIcon}`} />
            )}
        </div>
    );
}

export default CustomCheckbox;
