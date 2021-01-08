import React from 'react';
import { render, screen } from '@testing-library/react';
import snapshotDiff from 'snapshot-diff';

import Error from '../views/Error';

describe('Error View Component', () => {
    test('Display Error Message', () => {
        const { getByText } = render(<Error {...{ errors: 'Error Message' }} />);
        expect(getByText('Error Message')).toMatchSnapshot();
    })

    test('Test using asFragment for first render check', () => {
        const { asFragment } = render(<Error {...{ errors: 'Error Message' }} />);
        const firstRender = asFragment();
        // expect(firstRender).toMatchDiffSnapshot(asFragment());
        // using snapshotDiff
        expect(
            snapshotDiff(firstRender, asFragment())
        ).toMatchSnapshot();
    })

    test('Show Something went wrong... as default', () => {
        render(<Error />);
        expect(screen.getByText('Something went wrong...')).toMatchSnapshot();
    })
});

