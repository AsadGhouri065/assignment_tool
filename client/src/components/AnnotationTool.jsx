import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Alert, Spinner, Button, ProgressBar, Form, Badge} from 'react-bootstrap';
import VideoPlayer from './VideoPlayer';
import PlateDisplay from './PlateDisplay';
import DmvPanel from './DmvPanel';
import {getNextEvent} from '../services/backend-apis.js';

const AnnotationTool = ({user}) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [step, setStep] = useState(1);
    const [dmvData, setDmvData] = useState(null);
    const [selectedIssue, setSelectedIssue] = useState('');
    const [, setPlateNumber] = useState('');
    const [, setStartTime] = useState(null);

    const issues = [
        'False Positive Event',
        'Main Camera Issue',
        'License Plate Issue',
        'DMV Information Issue'
    ];

    const fetchEvent = async () => {
        setLoading(true);
        setError('');
        setStep(1);
        setDmvData(null);
        setSelectedIssue('');
        setPlateNumber('');
        setStartTime(Date.now());
        try {
            const data = await getNextEvent();
            setEvent(data);
        } catch (err) {
            setError('Failed to load event. No pending events?');
            setEvent(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvent();
    }, []);

    const handleReject = async () => {
        if (!selectedIssue) {
            alert('Please select an issue reason before rejecting.');
            return;
        }
        if (!event) return;
        try {
            fetchEvent(); // Load next event
        } catch (err) {
            alert('Failed to submit annotation');
        }
    };

    const handleAccept = async () => {
        if (!event) return;
        try {
            fetchEvent(); // Load next event
        } catch (err) {
            alert('Failed to submit annotation');
        }
    };

    if (loading) {
        return (
            <Container className="d-flex flex-column justify-content-center align-items-center"
                       style={{minHeight: '100vh'}}>
                <Spinner animation="border" style={{width: '3rem', height: '3rem'}}/>
                <p className="mt-3 text-muted">Loading next event...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-5">
                <Alert variant="info">{error}</Alert>
            </Container>
        );
    }

    if (!event) return null;

    return (
        <Container className="py-4" style={{maxWidth: '1200px'}}>
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-3"
                 style={{borderBottom: '2px solid #334155'}}>
                <div>
                    <h2 className="mb-1" style={{fontWeight: '700', letterSpacing: '-0.5px'}}>
                        🎯 Traffic Event Annotation
                    </h2>
                </div>
                <div style={{minWidth: '250px'}}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <small className="text-muted">Progress</small>
                        <Badge bg={step === 3 ? 'success' : 'primary'}>Step {step} of 3</Badge>
                    </div>
                    <ProgressBar now={(step / 3) * 100} variant={step === 3 ? 'success' : 'info'}
                                 style={{height: '8px'}}/>
                </div>
            </div>

            <Row className="justify-content-center">
                <Col lg={10} xl={9}>

                    {/* Step 1: Video Review */}
                    {step === 1 && (
                        <div className="fade-in">
                            <div className="text-center mb-4">
                                <h4 className="mb-2" style={{fontWeight: '600'}}>
                                    <Badge bg="primary" className="me-2">1</Badge>
                                    Video Review
                                </h4>
                                <p className="text-muted">Watch the video and determine if this is a valid traffic
                                    event</p>
                            </div>

                            <VideoPlayer videoUrl={event.videoId}/>

                            <div className="mt-4 p-4" style={{
                                background: 'rgba(59, 130, 246, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid #334155'
                            }}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{fontWeight: '600'}}>
                                        <span className="me-2">⚠️</span>
                                        If rejecting, select issue:
                                    </Form.Label>
                                    <Form.Select
                                        value={selectedIssue}
                                        onChange={(e) => setSelectedIssue(e.target.value)}
                                        size="lg"
                                    >
                                        <option value="">-- Select Issue (Optional) --</option>
                                        {issues.map((issue) => (
                                            <option key={issue} value={issue}>{issue}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="d-flex gap-3 justify-content-center mt-4">
                                <Button
                                    variant="success"
                                    size="lg"
                                    style={{minWidth: '220px'}}
                                    onClick={() => setStep(2)}
                                >
                                    ✓ Valid Event (Next)
                                </Button>
                                <Button
                                    variant="danger"
                                    size="lg"
                                    style={{minWidth: '220px'}}
                                    onClick={handleReject}
                                >
                                    ✗ Reject Event
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Plate Verification */}
                    {step === 2 && (
                        <div className="fade-in">
                            <div className="text-center mb-4">
                                <h4 className="mb-2" style={{fontWeight: '600'}}>
                                    <Badge bg="primary" className="me-2">2</Badge>
                                    License Plate Verification
                                </h4>
                                <p className="text-muted">Verify that the license plate image is clear and readable</p>
                            </div>

                            <div className="d-flex justify-content-center mb-4">
                                <div style={{maxWidth: '700px', width: '100%'}}>
                                    <PlateDisplay imageUrl={event.plateImageId}/>
                                </div>
                            </div>

                            <div className="mt-4 p-4" style={{
                                background: 'rgba(59, 130, 246, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid #334155'
                            }}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{fontWeight: '600'}}>
                                        <span className="me-2">⚠️</span>
                                        If rejecting, select issue:
                                    </Form.Label>
                                    <Form.Select
                                        value={selectedIssue}
                                        onChange={(e) => setSelectedIssue(e.target.value)}
                                        size="lg"
                                    >
                                        <option value="">-- Select Issue (Optional) --</option>
                                        {issues.map((issue) => (
                                            <option key={issue} value={issue}>{issue}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="d-flex gap-3 justify-content-center flex-wrap mt-4">
                                <Button
                                    variant="success"
                                    size="lg"
                                    style={{minWidth: '220px'}}
                                    onClick={() => setStep(3)}
                                >
                                    ✓ Plate Clear (Next)
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    style={{minWidth: '140px'}}
                                    onClick={() => setStep(1)}
                                >
                                    ← Back
                                </Button>
                                <Button
                                    variant="danger"
                                    size="lg"
                                    style={{minWidth: '220px'}}
                                    onClick={handleReject}
                                >
                                    ✗ Reject Event
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: DMV Lookup */}
                    {step === 3 && (
                        <div className="fade-in">
                            <div className="text-center mb-4">
                                <h4 className="mb-2" style={{fontWeight: '600'}}>
                                    <Badge bg="primary" className="me-2">3</Badge>
                                    DMV Verification
                                </h4>
                                <p className="text-muted">Enter the plate number and verify vehicle details match</p>
                            </div>

                            <Row className="justify-content-center">
                                <Col md={6} className="mb-3">
                                    <PlateDisplay imageUrl={event.plateImageId}/>
                                </Col>
                                <Col md={6} className="mb-3">
                                    <DmvPanel onDmvData={setDmvData} onPlateNumberChange={setPlateNumber}/>
                                </Col>
                            </Row>

                            <div className="mt-4 p-4" style={{
                                background: 'rgba(59, 130, 246, 0.05)',
                                borderRadius: '12px',
                                border: '1px solid #334155'
                            }}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{fontWeight: '600'}}>
                                        <span className="me-2">⚠️</span>
                                        If rejecting, select issue:
                                    </Form.Label>
                                    <Form.Select
                                        value={selectedIssue}
                                        onChange={(e) => setSelectedIssue(e.target.value)}
                                        size="lg"
                                    >
                                        <option value="">-- Select Issue (Optional) --</option>
                                        {issues.map((issue) => (
                                            <option key={issue} value={issue}>{issue}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </div>

                            <div className="d-flex gap-3 mt-4 justify-content-center flex-wrap">
                                <Button
                                    variant="success"
                                    size="lg"
                                    style={{minWidth: '220px'}}
                                    onClick={handleAccept}
                                    disabled={!dmvData}
                                >
                                    ✓ Accept Event
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    style={{minWidth: '140px'}}
                                    onClick={() => setStep(2)}
                                >
                                    ← Back
                                </Button>
                                <Button
                                    variant="danger"
                                    size="lg"
                                    style={{minWidth: '220px'}}
                                    onClick={handleReject}
                                >
                                    ✗ Reject Event
                                </Button>
                            </div>
                            {!dmvData && (
                                <div className="text-center mt-3 p-3"
                                     style={{background: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px'}}>
                                    <small className="text-muted">
                                        ⚠️ Please perform DMV lookup to proceed with acceptance.
                                    </small>
                                </div>
                            )}
                        </div>
                    )}

                </Col>
            </Row>

            <div className="mt-5 text-center text-muted pt-4" style={{borderTop: '1px solid #334155'}}>
                <small>Event ID: <code>{event._id}</code></small>
            </div>
        </Container>
    );
};

export default AnnotationTool;
