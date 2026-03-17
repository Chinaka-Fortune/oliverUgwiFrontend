import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
    it('renders the brand title', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        expect(screen.getByText('OLIVER-UGWI')).toBeInTheDocument();
    });

    it('renders the contact info', () => {
        render(
            <BrowserRouter>
                <Navbar />
            </BrowserRouter>
        );
        expect(screen.getByText('info@oliverugwi.com')).toBeInTheDocument();
    });
});
