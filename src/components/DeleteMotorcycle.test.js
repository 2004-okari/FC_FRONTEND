import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import DeleteMotorcycle from './DeleteMotorcycle';

// Mock Redux store
const initialState = {
  bikes: {
    message: {
      bikes: [
        {
          id: 1,
          name: 'Bike 1',
          image: 'bike1.jpg',
        },
        {
          id: 2,
          name: 'Bike 2',
          image: 'bike2.jpg',
        },
      ],
    },
    isLoading: false,
    error: null,
  },
};

const reducer = (state = initialState) => state;
const store = createStore(reducer);

describe('DeleteMotorcycle', () => {
  it('renders a list of bikes', () => {
    render(
      <Provider store={store}>
        <DeleteMotorcycle />
      </Provider>
    );

    const bike1 = screen.getByText('Bike 1');
    const bike2 = screen.getByText('Bike 2');

    expect(bike1).toBeInTheDocument();
    expect(bike2).toBeInTheDocument();
  });

  it('calls deleteBike action when delete button is clicked', () => {
    const mockDispatch = jest.fn();
    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
      useSelector: () => initialState.bikes,
    }));

    render(
      <Provider store={store}>
        <DeleteMotorcycle />
      </Provider>
    );

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledTimes(1);
    expect(mockDispatch).toHaveBeenCalledWith(deleteBike(1)); // Assuming the delete button is for bike with ID 1
  });
});