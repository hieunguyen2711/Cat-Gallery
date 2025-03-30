import React from "react";


const BanNav = ({banAttribute, handleChange}) => {
    return (
        <div className="sideNav">
            <h2>Ban List</h2>
            <h4>Select an attribute in your listing to ban it</h4>
            <div className="banned-list">
                {Object.entries(banAttribute).map(([key, value]) =>
                    Array.from(value).map((value) => (
                        <li>
                            <button key={`${key} - ${value}`} className="banned-attribute-btn" onClick={handleChange}>{value}</button>
                        </li>
                        
                    ))
                )}
            </div>
        </div>
    )

}
export default BanNav;