import React, { useState } from 'react';

function ContactForm() {
    // Form ki fields ke liye state banayein
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const [loading, setLoading] = useState(false);

    // Input changes ko handle karne ke liye function
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form submit hone par chalne wala function
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Message successfully bhej diya gaya hai!");
                // Form submit hone ke baad fields clear kar dein
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                alert(data.message || "Kuch error aa gayi hai, fir se try karein.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server se connection establish nahi ho paya. Check karein ki backend chal raha hai ya nahi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="name" 
                placeholder="Name" 
                value={formData.name} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="email" 
                name="email" 
                placeholder="Email address" 
                value={formData.email} 
                onChange={handleChange} 
                required 
            />
            <input 
                type="text" 
                name="subject" 
                placeholder="Subject" 
                value={formData.subject} 
                onChange={handleChange} 
                required 
            />
            <textarea 
                name="message" 
                placeholder="Write your message..." 
                value={formData.message} 
                onChange={handleChange} 
                required 
            />
            <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send message"}
            </button>
        </form>
    );
}

export default ContactForm;