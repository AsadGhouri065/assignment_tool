import React, {useState} from 'react';
import {Card, Form, Button} from 'react-bootstrap';

const ActionPanel = ({onDecision}) => {
    const [selectedIssue, setSelectedIssue] = useState('');

    const issues = [
        'False Positive Event',
        'Main Camera Issue',
        'License Plate Issue',
        'DMV Information Issue'
    ];

    const handleAccept = () => {
        onDecision('accepted', null);
        setSelectedIssue('');
    };

    const handleReject = () => {
        if (!selectedIssue) {
            alert('Please select an issue reason to reject.');
            return;
        }
        onDecision('rejected', selectedIssue);
        setSelectedIssue('');
    };

    return (
        <Card className="mb-3">
            <Card.Header>Decision</Card.Header>
            <Card.Body>
                <Form.Group className="mb-3">
                    <Form.Label>Select Issue (if rejecting)</Form.Label>
                    {issues.map((issue) => (
                        <Form.Check
                            key={issue}
                            type="radio"
                            label={issue}
                            name="issueGroup"
                            id={issue}
                            checked={selectedIssue === issue}
                            onChange={(e) => setSelectedIssue(e.target.value)}
                        />
                    ))}
                </Form.Group>

                <div className="d-flex gap-2">
                    <Button variant="success" className="flex-grow-1" onClick={handleAccept}>
                        Accept Event
                    </Button>
                    <Button variant="danger" className="flex-grow-1" onClick={handleReject}>
                        Reject Event
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
};

export default ActionPanel;
