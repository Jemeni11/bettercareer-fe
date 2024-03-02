import React, { useState, useRef, useEffect, DragEvent } from 'react';
import { Flex, Button, Box, Text } from '@radix-ui/themes';
import styles from './DragAndDrop.module.scss';
import Image from 'next/image';

interface DragAndDrop {
	multiple: boolean;
	accept: 'application/pdf';
	// | 'image/gif'
	// | 'image/jpeg'
	// | 'image/png'
	// | 'image/svg+xml'
	// | 'image/tiff'
	// | 'image/webp';
	onDrop: (files: File[]) => void;
	onDragOver: () => void;
	setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
}

export default function DragAndDrop({
	multiple,
	accept,
	onDrop,
	onDragOver,
	setFiles,
}: DragAndDrop) {
	const [dragIsOver, setDragIsOver] = useState(false);

	function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const files = Array.from(e.target.files!);
		setFiles(files);
	}

	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragIsOver(true);
	};

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragIsOver(false);
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragIsOver(false);

		let droppedFiles = Array.from(event.dataTransfer.files);

		if (!multiple) {
			droppedFiles = droppedFiles.slice(0, 1);
		}

		setFiles(droppedFiles);

		droppedFiles.forEach((file) => {
			const reader = new FileReader();

			reader.onloadend = () => {
				console.log(reader.result);
			};

			reader.onerror = () => {
				console.error('There was an issue reading the file: ', file.name, '.');
			};

			reader.readAsDataURL(file);
			return reader;
		});
	};
	return (
		<Flex
			grow="1"
			direction="column"
			align="center"
			gap="4"
			className={styles.ModalDragAndDrop}
			style={{
				backgroundColor: dragIsOver ? '#E7F3FE' : '#f9fcff',
			}}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
		>
			<Flex direction="column" align="center" grow="1">
				<Image
					src="/dragAndDrop.svg"
					alt="Drag-and-drop zone for file upload."
					width={70}
					height={44.75}
					style={{ scale: dragIsOver ? 1 : 1.4 }}
				/>
				<Box>
					{dragIsOver ? (
						<Text as="span">Drop your file here</Text>
					) : (
						<>
							<Text as="span">Drag and drop file or </Text>
							<Text as="label" htmlFor="DragAndDrop">
								Browse
							</Text>
						</>
					)}

					<input
						type="file"
						id="DragAndDrop"
						name="DragAndDrop"
						accept={accept}
						multiple={multiple}
						style={{ opacity: 0, width: 0, height: 0 }}
						onChange={handleFileUpload}
					/>
				</Box>
			</Flex>
		</Flex>
	);
}
