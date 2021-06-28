import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import { CssBaseline, ThemeProvider } from '@material-ui/core';

import client from '@core/apollo';
import { theme } from '@core/theme';
import { NotifyContainer } from '@containers';
import { RootProvider } from '@providers';

import App from './App';

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<ThemeProvider theme={theme}>
				<NotifyContainer />
				<CssBaseline />
				<Router>
					<RootProvider>
						<App />
					</RootProvider>
				</Router>
			</ThemeProvider>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root'),
);
