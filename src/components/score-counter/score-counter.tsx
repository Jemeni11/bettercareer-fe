interface ScoreCounterProps {
	className?: string;
	score: number;
}

export function ScoreCounter({ className, score }: ScoreCounterProps) {
	return (
		<svg
			width="228"
			height="115"
			viewBox="0 0 228 115"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			className={className}
		>
			<mask
				id="mask0_2709_3254"
				style={{ maskType: 'alpha' }}
				maskUnits="userSpaceOnUse"
				x="0"
				y="0"
				width="228"
				height="115"
			>
				<path
					d="M216.934 114.111C222.91 114.111 227.807 109.256 227.241 103.307C226.168 92.0267 223.419 80.9484 219.068 70.4425C213.333 56.598 204.928 44.0185 194.331 33.4223C183.735 22.8261 171.156 14.4208 157.311 8.68617C143.467 2.95156 128.628 -6.55026e-07 113.643 0C98.6576 6.55026e-07 83.8191 2.95157 69.9745 8.68617C56.13 14.4208 43.5505 22.8261 32.9543 33.4223C22.3581 44.0185 13.9528 56.598 8.21816 70.4425C3.86647 80.9485 1.11739 92.0267 0.0445704 103.307C-0.521185 109.256 4.37618 114.111 10.3518 114.111C16.3274 114.111 21.1063 109.25 21.8039 103.316C22.7955 94.8796 24.9468 86.603 28.2105 78.7236C32.8577 67.5045 39.669 57.3106 48.2558 48.7238C56.8425 40.1371 67.0365 33.3257 78.2556 28.6786C89.4748 24.0314 101.499 21.6396 113.643 21.6396C125.786 21.6396 137.811 24.0314 149.03 28.6786C160.249 33.3257 170.443 40.137 179.03 48.7238C187.617 57.3105 194.428 67.5045 199.075 78.7236C202.339 86.603 204.49 94.8796 205.482 103.316C206.179 109.25 210.958 114.111 216.934 114.111Z"
					fill="#E7F3FE"
				/>
			</mask>
			<g mask="url(#mask0_2709_3254)">
				<rect x="-21" width="269" height="120" fill="#E7F3FE" />
				<rect
					x="-16"
					width={`${(score / 100) * 244}`}
					height="117"
					fill="url(#paint0_linear_2709_3254)"
				/>
			</g>
			<defs>
				<linearGradient
					id="paint0_linear_2709_3254"
					x1="82.2897"
					y1="-6.68837e-06"
					x2="53.3646"
					y2="114.107"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#339DFF" />
					<stop offset="1" stopColor="#2783D8" />
				</linearGradient>
			</defs>
		</svg>
	);
}