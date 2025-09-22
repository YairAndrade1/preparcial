import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthorForm from '../authorForm';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

const mockCreateAuthor = jest.fn();
const mockUpdateAuthor = jest.fn();
jest.mock('@/lib/context/AuthorsContext', () => ({
    useAuthorsContext: () => ({
        createAuthor: mockCreateAuthor,
        updateAuthor: mockUpdateAuthor,
    }),
}));

describe('AuthorForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    // Render del formulario 
    test('should render all form fields correctly with appropriate selectors', () => {
        render(<AuthorForm />);

        const nameInput = screen.getByLabelText(/author's name/i);
        const imageInput = screen.getByLabelText(/photo url/i);
        const birthDateInput = screen.getByLabelText(/birth date/i);
        const descriptionInput = screen.getByLabelText(/short bio/i);

        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toBeEnabled();
        expect(nameInput).toHaveAttribute('type', 'text');

        expect(imageInput).toBeInTheDocument();
        expect(imageInput).toBeEnabled();
        expect(imageInput).toHaveAttribute('type', 'url');

        expect(birthDateInput).toBeInTheDocument();
        expect(birthDateInput).toBeEnabled();
        expect(birthDateInput).toHaveAttribute('type', 'date');

        expect(descriptionInput).toBeInTheDocument();
        expect(descriptionInput).toBeEnabled();
        expect(descriptionInput.tagName.toLowerCase()).toBe('textarea');

        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        const submitButton = screen.getByRole('button', { name: /create author/i });

        expect(cancelButton).toBeInTheDocument();
        expect(cancelButton).toBeEnabled();
        expect(submitButton).toBeInTheDocument();
    });

    // 5% – Validación de envío
    test('should prevent form submission with empty required fields and disable submit button', async () => {
        render(<AuthorForm />);

        const nameInput = screen.getByLabelText(/author's name/i);
        const submitButton = screen.getByRole('button', { name: /create author/i });

        expect(submitButton).toBeDisabled();

        // Simular intento de envío con valores vacíos
        const form = screen.getByRole('form');
        fireEvent.submit(form);

        await waitFor(() => {
            expect(screen.getByText("Please enter the author's name.")).toBeInTheDocument();
        });

        expect(mockCreateAuthor).not.toHaveBeenCalled();

        // Verificar que el botón sigue deshabilitado
        expect(submitButton).toBeDisabled();

        fireEvent.change(nameInput, { target: { value: 'Test Author' } });
        expect(submitButton).toBeEnabled();
    });
});