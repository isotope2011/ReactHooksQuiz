import React from 'react';
import { render } from '@testing-library/react';

import HelloWorld from '../views/HelloWorld';

describe('HelloWorld View Component', () => {
    test('Show Hello World text', () => {
        const { getByText } = render(<HelloWorld />);
        expect(getByText('Hello World!!')).toMatchSnapshot();
    })
});
