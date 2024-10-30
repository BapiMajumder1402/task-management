import React, { useState } from 'react';
import { Accordion, Container } from 'react-bootstrap';

const FAQ = () => {
    const [activeKey, setActiveKey] = useState(null);

    const faqs = [
        {
            question: "How can I create a new task?",
            answer: "To create a new task, click the 'Add Task' button, fill in the task details such as title, description, and due date, then click 'Save'."
        },
        {
            question: "Can I set reminders for my tasks?",
            answer: "Yes, you can set reminders for each task. You will receive notifications based on your selected reminder settings."
        },
        {
            question: "How do I edit or delete a task?",
            answer: "To edit a task, click on the task you want to change, modify the details, and click 'Save'. To delete a task, click the 'Delete' button next to the task."
        },
        {
            question: "Can I organize tasks into different categories?",
            answer: "Absolutely! You can create categories to organize your tasks and easily filter them based on your preferences."
        },
        {
            question: "Is it possible to share tasks with other users?",
            answer: "Yes, you can share tasks with other users by assigning them as collaborators. They will be notified and can help manage the task."
        },
        {
            question: "How do I track my task progress?",
            answer: "You can track your task progress using the status updates provided (Pending, In Progress, Completed). Additionally, you can view your overall progress on the dashboard."
        }
    ];

    return (
        <Container className='mt-5 mb-5'>
            <h2 className="text-center mb-4">Frequently Asked Questions</h2>
            <Accordion activeKey={activeKey} onSelect={(key) => setActiveKey(key)}>
                {faqs?.map((faq, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{faq.question}</Accordion.Header>
                        <Accordion.Body>{faq.answer}</Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
};

export default FAQ;
