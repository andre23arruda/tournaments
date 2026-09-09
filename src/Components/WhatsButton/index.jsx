import React from 'react'
import { openWhats } from '../../utils';

import './styles.css'

export default function WhatsButton() {
	return (
		<>
			<button
				className="whatsButton"
				onClick={openWhats}
				title="Entre em contato pelo WhatsApp"
				aria-label="Entre em contato pelo WhatsApp"
			>
                <img src="whatsapp.svg" alt="Whatsapp logo" with="32" height="32" />
			</button>
		</>
	)
}
