import React from 'react';

import { useConfirmDialogContext } from '@providers';

interface IProps
	extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	isDisabled: boolean;
	confirmSubmit?: boolean;
	confirmQuestion?: string;
	onSubmit: () => Promise<void>;
}

export const Form: React.FC<IProps> = ({
	children,
	isDisabled,
	confirmQuestion,
	confirmSubmit = false,
	noValidate = true,
	onSubmit,
	...props
}) => {
	const confirmDialog = useConfirmDialogContext();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (isDisabled) return;

		if (confirmSubmit && confirmQuestion) {
			confirmDialog(confirmQuestion, {
				onAgree: onSubmit,
			});
		} else {
			onSubmit();
		}
	};

	return (
		<form {...props} noValidate={noValidate} onSubmit={handleSubmit}>
			{children}
		</form>
	);
};
