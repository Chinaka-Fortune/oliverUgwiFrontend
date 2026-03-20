import { render, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

// Mock window.scrollTo
window.scrollTo = vi.fn();

const NavigationWrapper = () => {
    const navigate = useNavigate();
    return (
        <div>
            <ScrollToTop />
            <button onClick={() => navigate('/about')}>Go to About</button>
        </div>
    );
};

describe('ScrollToTop Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls window.scrollTo(0, 0) when the component renders', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <ScrollToTop />
            </MemoryRouter>
        );

        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    });

    it('calls window.scrollTo(0, 0) when the route changes', async () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="*" element={<NavigationWrapper />} />
                </Routes>
            </MemoryRouter>
        );

        // First call on initial render
        expect(window.scrollTo).toHaveBeenCalledTimes(1);

        // Trigger navigation
        const button = getByText('Go to About');
        await act(async () => {
            button.click();
        });

        // Second call on navigation
        expect(window.scrollTo).toHaveBeenCalledTimes(2);
        expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
    });
});
