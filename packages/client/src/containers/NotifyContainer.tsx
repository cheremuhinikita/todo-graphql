import React from 'react';
import { ToastContainer } from 'react-toastify';

import { notifyConfig } from '@core/configs';

import 'react-toastify/dist/ReactToastify.css';

export const NotifyContainer: React.FC = () => <ToastContainer {...notifyConfig} />;
