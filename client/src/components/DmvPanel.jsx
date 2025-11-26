import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Table, Badge } from 'react-bootstrap';
import { lookupPlate } from '../services/backend-apis.js';

const DmvPanel = ({ onDmvData, onPlateNumberChange }) => {
    const [plateNumber, setPlateNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [dmvInfo, setDmvInfo] = useState(null);

    const handleLookup = async () => {
        if (!plateNumber) return;
        setLoading(true);
        try {
            const data = await lookupPlate(plateNumber);
            setDmvInfo(data);
            onDmvData(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLookup();
        }
    };

    return (
        <Card className="mb-4 shadow-lg">
            <Card.Header className="d-flex align-items-center justify-content-between">
                <span>🔍 DMV Verification</span>
                <small className="text-muted">Check vehicle details</small>
            </Card.Header>
            <Card.Body>
                <Row className="mb-3 align-items-center">
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Enter License Plate Number"
                            value={plateNumber}
                            onChange={(e) => {
                                const value = e.target.value.toUpperCase();
                                setPlateNumber(value);
                                if (onPlateNumberChange) onPlateNumberChange(value);
                            }}
                            onKeyPress={handleKeyPress}
                            style={{
                                fontSize: '1.1rem',
                                fontWeight: '600',
                                letterSpacing: '1px',
                                textAlign: 'center'
                            }}
                        />
                    </Col>
                    <Col xs="auto">
                        <Button
                            onClick={handleLookup}
                            disabled={loading || !plateNumber}
                            variant="primary"
                            size="lg"
                        >
                            {loading ? '⏳ Checking...' : '🔍 Check DMV'}
                        </Button>
                    </Col>
                </Row>

                {dmvInfo && (
                    <div className="mt-4 fade-in">
                        <div className="d-flex align-items-center mb-3">
                            <Badge bg="success" className="me-2">✓ Found</Badge>
                            <strong>Vehicle Information</strong>
                        </div>
                        <Table striped bordered hover size="sm" className="mb-0">
                            <tbody>
                                <tr>
                                    <td style={{ width: '40%', fontWeight: '600' }}>
                                        <span style={{ marginRight: '8px' }}>🏭</span>
                                        Make
                                    </td>
                                    <td style={{ fontSize: '1.05rem' }}>{dmvInfo.make}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: '600' }}>
                                        <span style={{ marginRight: '8px' }}>🚙</span>
                                        Model
                                    </td>
                                    <td style={{ fontSize: '1.05rem' }}>{dmvInfo.model}</td>
                                </tr>
                                <tr>
                                    <td style={{ fontWeight: '600' }}>
                                        <span style={{ marginRight: '8px' }}>🎨</span>
                                        Color
                                    </td>
                                    <td style={{ fontSize: '1.05rem' }}>{dmvInfo.color}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default DmvPanel;
