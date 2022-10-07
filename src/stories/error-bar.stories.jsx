import React from 'react';
import ErrorBar from '../components/error-bar/error-bar.jsx';

export default {
  title: 'Example/ErrorBar',
  component: ErrorBar
};

const Template = (args) => <ErrorBar {...args} />;

export const ErrDisplay = Template.bind({});

ErrDisplay.args = {
  errorMessage:"Error message"
};

export const ErrDisplayNone = Template.bind({});

ErrDisplay.args = {
  errorMessage: ""
};