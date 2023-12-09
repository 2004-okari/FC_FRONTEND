import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ShowBike from './ShowBike';
import store from '../redux/store';

// Mock Redux store
const initialState = {
  bikes: {
    message: {
      selectedBike: {
        id: 1,
        name: 'Bike 1',
        image: 'bike1.jpg',
        description: 'Description 1',
        deposit: 100,
        finance_fee: 10,
        option_to_purchase_fee: 20,
      },
    },
  },
};

const reducer = (state = initialState) => state;
const store = store(reducer);

describe('ShowBike', () => {
  it('renders the bike details correctly', () => {
    render(
      <Provider store={store}>
        <ShowBike />
      </Provider>
    );

    const bikeName = screen.getByText('Bike 1');
    const bikeImage = screen.getByAltText('Bike');

    expect(bikeName).toBeInTheDocument();
    expect(bikeImage).toBeInTheDocument();
  });
});
