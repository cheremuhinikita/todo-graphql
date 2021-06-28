import React from 'react';

interface IProps {
	children?: React.ReactNode;
}

export const Block: React.FC<IProps> = ({ children }) => <div>{children}</div>;
