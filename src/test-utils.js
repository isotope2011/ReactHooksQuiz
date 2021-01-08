import React from 'react';

import { render } from '@testing-library/react'
import { act as hookAct, renderHook } from '@testing-library/react-hooks'
import { StoreContext } from "./context/store/storeContext";
import makeServer from "./mock/server";

makeServer();

const wrapper = ({ children, providerProps }) => {
    return (
        <StoreContext.Provider {...providerProps}>
            {children}
        </StoreContext.Provider>
    );
};

const customRender = (component, options) => render(component, { wrapper, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render, hookAct, renderHook };
