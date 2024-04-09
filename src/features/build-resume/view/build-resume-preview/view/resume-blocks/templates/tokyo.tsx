import React, { Fragment, useMemo } from 'react';
import { Document, Link, Page, StyleSheet } from '@react-pdf/renderer';

import DocText from '../components/doc-text';
import {
	extractNameFromLink,
	generateDataByKey,
	getData,
	getHref,
} from '../utils';
import { DocFlex } from '../components/doc-flex';

import { isEmpty } from '@labs/utils';

import { Classic } from './classic';

const renderElements = {
	summary: Classic.Summary,
	experience: Classic.Experience,
	education: Classic.Education,
	certifications: Classic.Certification,
	skills: Classic.Skills,
	projects: Classic.Projects,
	custom: Classic.CustomSection,
};

const config = {
	title: 'Tokyo',
	details: 'From the land of the rising sun',
	thumbnail: '/images/dashboard/resumes/tokyo.png',
	colors: {
		primary: '#3a58cf',
		primary_text: '#000',
		border: '#6F7982',
	},
};

const TokyoTemplate = ({
	template,
	modules,
}: {
	modules: any;
	template: any;
}) => {
	const primaryColor = template.colors.primary;
	const styles = useMemo(
		() =>
			StyleSheet.create({
				container: {
					flexDirection: 'column',
					color: '#0F1F2E',
					fontFamily: 'Inter',
				},
				link: {
					color: 'inherit',
					textDecoration: 'underline',
				},
			}),
		[]
	);

	const heading = getData('heading', modules);

	return (
		<Document>
			<Page size="A4" style={styles.container}>
				{heading?.name ? (
					<DocFlex
						direction="column"
						gap={4}
						backgroundColor={primaryColor}
						padding={24}
						color="#fff"
					>
						<DocText as="heading">
							{heading?.name}
							{heading?.title ? (
								<DocText as="subheading">, {heading?.title}</DocText>
							) : null}
						</DocText>
						<DocText size="xs">
							{heading?.subheading?.length
								? heading?.subheading?.map((subheading: any, index: number) => (
										<Fragment key={subheading.value}>
											{index > 0 && index < heading?.subheading?.length
												? ' | '
												: ''}
											<Link
												href={getHref(subheading.value)}
												style={{
													...styles.link,
													color: '#fff',
												}}
											>
												{extractNameFromLink(subheading.value)}
											</Link>
										</Fragment>
									))
								: null}
						</DocText>
					</DocFlex>
				) : null}

				<DocFlex direction="column" padding={24} gap={12}>
					{generateDataByKey(
						[
							'summary',
							'experience',
							'education',
							'certifications',
							'skills',
							'projects',
						],
						modules
					).map((module: any) => {
						const Component =
							renderElements[module.key as keyof typeof renderElements] ||
							renderElements.custom;

						if (isEmpty(module.data)) return null;
						return (
							<Component
								key={module.key}
								data={module.data}
								styles={{
									...styles,
									title: {
										color: primaryColor,
										textTransform: 'uppercase',
										border: 0,
									},
								}}
							/>
						);
					})}
				</DocFlex>
			</Page>
		</Document>
	);
};

export const Tokyo = Object.assign(TokyoTemplate, {
	config,
});