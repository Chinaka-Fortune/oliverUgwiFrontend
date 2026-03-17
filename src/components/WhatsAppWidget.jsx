import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppWidget = () => {
    const phoneNumber = "2348132112909";
    const message = "Hello OLIVER-UGWI GLOBAL SERVICES LTD., I would like to inquire about your services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-float"
            title="Chat with us on WhatsApp"
        >
            <FaWhatsapp />
        </a>
    );
};

export default WhatsAppWidget;
