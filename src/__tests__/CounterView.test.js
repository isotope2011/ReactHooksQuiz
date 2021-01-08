import React from 'react';
import { render, fireEvent, cleanup, act } from '../test-utils';

import CounterView from '../views/CounterView';
import { StoreContext, StoreProvider } from "../context/store/storeContext";

const renderWithContext = component => {
    return {
        ...render(  
            <StoreProvider value={StoreContext}>
                {component}
            </StoreProvider>
        )
    }
}

describe('CounterView Component', () => {
    afterEach(cleanup);
    
    test('render counter', () => {
        const { getByText } = renderWithContext(<CounterView />);
        expect(getByText('Counter')).toBeInTheDocument();
    })

    test('increment counter', () => {
        const { getByTestId  } = renderWithContext(<CounterView />);
        act(() => {
            fireEvent.click(getByTestId('increment'));
        });
        expect(getByTestId('counter')).toHaveTextContent('1');
    })

    test('decrement counter', () => {
        const { getByText, getByTestId  } = renderWithContext(<CounterView />);
        act(() => {
            fireEvent.click(getByText('DECREMENT'));
        });
        expect(getByTestId('counter')).toHaveTextContent('-1');
    })

    test('set counter to random value', () => {
        const { getByTestId  } = renderWithContext(<CounterView />);
        act(() => {
            fireEvent.click(getByTestId('random'));
        });
        expect(getByTestId('counter')).not.toEqual('0');
    }) 

    test('set counter to random value then reset', () => {
        const { getByTestId  } = renderWithContext(<CounterView />);
        // set to random value, not 0
        act(() => {
            fireEvent.click(getByTestId('random'));
        });
        expect(getByTestId('counter')).not.toEqual('0');
        // reset value and test again
        act(() => {
            fireEvent.click(getByTestId('reset'));
        });
        expect(getByTestId('counter')).toHaveTextContent('0');
    }) 
});
