import React from "react"

export default function UnderConstr() {
    const containerStyle = {
        padding: '1rem',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    };

    return (
        <div style={containerStyle} className="under-constr-container">
            <h2>Page Under Construction</h2>
            <p>We're working on something awesome. Please check back later.</p>
        </div>
    );
}