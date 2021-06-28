import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { RecoveryPassword, ResetPassword } from './steps';
import useStyles from './styled';

const stepLabels = ['Восстановление', 'Сброс'];

const getStepContent = (step: number, handleNext: () => void, handlePrev: () => void) => {
	switch (step) {
		case 0:
			return <RecoveryPassword handleNext={handleNext} />;
		case 1:
			return <ResetPassword handleNext={handleNext} handlePrev={handlePrev} />;
		default:
			throw new Error('Unknown step');
	}
};

export const RecoveryPasswordPage: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState<number>(0);

	const handleNext = (): void => {
		setActiveStep(activeStep + 1);
	};

	const handlePrev = (): void => {
		setActiveStep(activeStep - 1);
	};

	return (
		<Container component="main" maxWidth="xs">
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Восстановление пароля
				</Typography>
				<Stepper activeStep={activeStep} className={classes.stepper}>
					{stepLabels.map((label) => (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					))}
				</Stepper>
				{activeStep < stepLabels.length &&
					getStepContent(activeStep, handleNext, handlePrev)}
			</div>
		</Container>
	);
};
