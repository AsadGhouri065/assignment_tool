import React from 'react';
import { Card } from 'react-bootstrap';

const VideoPlayer = ({ videoUrl }) => {
    // Fix for local videos if served by backend
    const src = videoUrl.startsWith('/') ? `http://localhost:5000${videoUrl}` : videoUrl;

    return (
        <Card className="mb-4 shadow-lg">
            <Card.Body className="p-0" style={{ background: '#000' }}>
                <video
                    width="100%"
                    height="auto"
                    controls
                    autoPlay
                    loop
                    src={src}
                    style={{ maxHeight: '500px', display: 'block' }}
                >
                    Your browser does not support the video tag.
                </video>
            </Card.Body>
        </Card>
    );
};

export default VideoPlayer;
