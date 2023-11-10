import React from 'react';
import { useParams } from 'react-router-dom';

export default function ProductDetail() {
    const { id } = useParams();

    return (
        <div>
            <h2>Product Detail Page</h2>
            <p>Product ID: {id}</p>
        </div>
    );
}
