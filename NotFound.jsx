// NotFound.jsx
import React from 'react';
import styled from 'styled-components';

const NotFound = () => {
    return (
        <NotFoundContainer>
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
        </NotFoundContainer>
    );
};

export default NotFound;

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
    background-color: #f8f8f8;

    h1 {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.5rem;
    }
`;
