import React from 'react';
import {Card, Image} from 'react-bootstrap';

const PlateDisplay = ({imageUrl}) => {
    const src = imageUrl.startsWith('/') ? `http://localhost:5000${imageUrl}` : imageUrl;

    return (
        <Card className="mb-4 shadow-lg">
            <Card.Header className="d-flex align-items-center justify-content-between">
                <span>🚗 License Plate Image</span>
                <small className="text-muted">Verify plate number</small>
            </Card.Header>
            <Card.Body className="text-center p-4" style={{background: 'rgba(0,0,0,0.2)'}}>
                <Image
                    src={src}
                    fluid
                    thumbnail
                    style={{
                        maxHeight: '300px',
                        maxWidth: '100%',
                        objectFit: 'contain',
                        background: '#000',
                        border: '3px solid #334155'
                    }}
                />
            </Card.Body>
        </Card>
    );
};

export default PlateDisplay;
