import { jsPDF } from 'jspdf';

/**
 * Unified PDF Generator for OLIVER-UGWI
 * Fixed Branding Frame (Header/Footer) + Dynamic Body Content
 */
export const generateBrandedPDF = async (data, filename = 'document.pdf', mode = 'download') => {
    // Standardize A4 format in millimeters
    const doc = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    
    // Normalize data fields
    const docId = data.invoice_id || data.id || 'N/A';
    const docName = data.name || data.type || 'OFFICIAL DOCUMENT';
    const docDate = data.date || (data.created_at ? new Date(data.created_at).toLocaleDateString() : new Date().toLocaleDateString());
    const docStatus = data.status || 'Verified';
    const docAmount = data.amount || 'N/A';
    const docCurrency = data.currency || '';
    const docUser = data.user || { name: 'Valued Customer', email: 'customer@oliverugwi.com' };
    const docDescription = data.description || 'General Logistics Services';
    const docTrackingId = data.tracking_id || (data.Shipment ? data.Shipment.tracking_id : null);

    const renderBody = () => {
        // --- 2. DYNAMIC BODY ---
        doc.setTextColor(93, 110, 23); // Theme Green
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        
        doc.text(docName.toUpperCase(), 20, 55);

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100);
        doc.text(`ID: ${docId}`, 20, 63);
        doc.text(`Date: ${docDate}`, 20, 68);
        doc.text(`Status: ${docStatus}`, 20, 73);

        if (docTrackingId) {
            doc.text(`Related Shipment: ${docTrackingId}`, 190, 63, { align: 'right' });
        }

        doc.setDrawColor(188, 154, 40); // Gold Horizontal Line
        doc.setLineWidth(0.4);
        doc.line(20, 77, 190, 77);

        // Bill To / Client Info
        doc.setTextColor(93, 110, 23); // Green
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('BILL TO:', 20, 88);
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(docUser.full_name || docUser.name || 'Valued Customer', 20, 95);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(100);
        doc.text(`Email: ${docUser.email || 'customer@oliverugwi.com'}`, 20, 100);
        if (docUser.phone) doc.text(`Phone: ${docUser.phone}`, 20, 105);
        if (docUser.address) doc.text(`Address: ${docUser.address}`, 20, 110);

        // Dynamic Table Area
        const tableY = 120;
        doc.setFillColor(93, 110, 23); // Green Header
        doc.rect(20, tableY, 170, 10, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        doc.text('Service Description', 25, tableY + 7);
        doc.text('Value', 165, tableY + 7);

        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        let currentY = tableY + 20;

        const itemList = data.items || [{ description: docDescription, value: docAmount }];
        
        itemList.forEach((item) => {
            doc.text(item.description, 25, currentY);
            doc.setFont('helvetica', 'bold');
            doc.text(`${docCurrency} ${item.value}`, 165, currentY);
            doc.setFont('helvetica', 'normal');
            doc.setDrawColor(240);
            doc.line(20, currentY + 6, 190, currentY + 6);
            currentY += 12;
        });

        // Totals
        if (docAmount !== 'N/A') {
            const totalY = Math.max(currentY + 5, tableY + 60);
            doc.setFontSize(11);
            doc.setTextColor(93, 110, 23); // Green
            doc.text('TOTAL DUE:', 120, totalY);
            doc.setFontSize(14);
            doc.setTextColor(188, 154, 40); // Gold
            doc.setFont('helvetica', 'bold');
            doc.text(`${docCurrency} ${docAmount}`, 165, totalY);
            currentY = totalY + 15;
        } else {
            currentY += 10;
        }

        // --- NEW: PAYMENT INSTRUCTIONS ---
        doc.setTextColor(93, 110, 23);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('PAYMENT INSTRUCTIONS:', 20, currentY);
        
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0);
        doc.text('Bank Name: OLIVER-UGWI SETTLEMENT BANK', 25, currentY + 6);
        doc.text('Account Name: OLIVER-UGWI GLOBAL SERVICES LTD', 25, currentY + 11);
        doc.text('Account Number: 0123456789 (USD / NGN)', 25, currentY + 16);
        doc.text('SWIFT/BIC: OUGWNGLA', 25, currentY + 21);
        doc.text('Ref: Please include Invoice ID as payment reference.', 25, currentY + 26);

        // --- NEW: TERMS & CONDITIONS ---
        const termsY = currentY + 40;
        doc.setTextColor(93, 110, 23);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('TERMS & CONDITIONS:', 20, termsY);

        doc.setFontSize(7.5);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(100);
        const termsText = [
            '1. All payments must be cleared before cargo release.',
            '2. Demurrage and storage charges may apply if cargo is not cleared within 48 hours.',
            '3. Oliver-Ugwi Global Services Ltd is not liable for structural defects of goods.',
            '4. Force Majeure applies to all logistics and shipping operations.'
        ];
        termsText.forEach((text, i) => doc.text(text, 25, termsY + 6 + (i * 5)));

        // Authentication Signing Area
        const authY = 250; 
        doc.setDrawColor(188, 154, 40); // Gold
        doc.setLineWidth(0.4);
        doc.line(130, authY, 190, authY);
        doc.setFontSize(8);
        doc.setTextColor(100);
        doc.text('Authorized Operations Dept', 142, authY + 5);
        doc.text('STAMP & SIGNATURE', 142, authY + 9);

        // --- 3. PROTECTED FOOTER ZONE ---
        const footerAnchor = 270; 
        doc.setDrawColor(188, 154, 40); // Gold Line Above
        doc.setLineWidth(0.2);
        doc.line(20, footerAnchor - 5, 190, footerAnchor - 5);
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(93, 110, 23);
        doc.text('“… Think Import/ Export, Think Us!”', 105, footerAnchor + 5, { align: 'center' });

        doc.setFontSize(7);
        doc.setTextColor(80);
        doc.text('NOTICE: This document is electronically generated and digitally verified for authenticity.', 105, footerAnchor + 12, { align: 'center' });
        doc.text('Thank you for choosing OLIVER-UGWI GLOBAL SERVICES LTD.', 105, footerAnchor + 17, { align: 'center' });

        // Bottom Brand accessory
        doc.setFillColor(188, 154, 40); // Gold
        doc.rect(0, 285, 210, 12, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.text('Visit us at WWW.OLIVERUGWI.COM | Global Logistics Solutions Since 2017', 105, 292, { align: 'center' });

        // Output based on mode
        if (mode === 'view') {
            window.open(doc.output('bloburl'), '_blank');
        } else {
            doc.save(filename);
        }
    };

    return new Promise((resolve) => {
        // --- 1. FIXED HEADER ---
        doc.setFillColor(93, 110, 23); // OLIVER-UGWI Green
        doc.rect(0, 0, 210, 40, 'F');
        doc.setDrawColor(188, 154, 40); // Theme Gold
        doc.setLineWidth(1);
        doc.line(0, 40, 210, 40);

        const img = new Image();
        img.src = '/oliver-ugwi-logo.jpeg';
        
        img.onload = () => {
            const badgeW = 55;
            const badgeH = 22;
            const badgeX = 18;
            const badgeY = 6;
            const radius = 4;

            doc.setFillColor(255, 255, 255);
            doc.roundedRect(badgeX, badgeY, badgeW, badgeH, radius, radius, 'F'); 

            doc.saveGraphicsState();
            doc.roundedRect(badgeX + 1, badgeY + 1, badgeW - 2, badgeH - 2, radius - 1, radius - 1, 'F');
            doc.clip();
            doc.addImage(img, 'JPEG', badgeX + 2, badgeY + 2, badgeW - 4, badgeH - 4); 
            doc.restoreGraphicsState();

            doc.setFontSize(9);
            doc.setTextColor(188, 154, 40);
            doc.setFont('helvetica', 'bold');
            doc.text('MARITIME | AIR CARGO | FREIGHT FORWARDING | LOGISTICS', 21, 36);

            doc.setTextColor(255, 255, 255);
            doc.setFontSize(8);
            doc.setFont('helvetica', 'normal');
            const rightAlignX = 190;
            doc.text('14 Erekusu Estate, Apapa-Oshodi Expressway,', rightAlignX, 12, { align: 'right' });
            doc.text('Ijesha, Lagos State, Nigeria', rightAlignX, 17, { align: 'right' });
            doc.text('PH: +234 813 211 2909 | +234 818 267 8808', rightAlignX, 22, { align: 'right' });
            doc.text('EMAIL: INFO@OLIVERUGWI.COM', rightAlignX, 27, { align: 'right' });

            renderBody();
            resolve();
        };

        img.onerror = () => {
            console.error('Failed to load branding logo');
            renderBody();
            resolve();
        };
    });
};
