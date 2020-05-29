import React from 'react';
import PropTypes from 'prop-types';
import VirtualDraggableGrid from 'react-virtual-draggable-grid';
import SimpleDialog from '../Modal/Modal.component';

const ItemComponent = (props) => {
	const { rowTMP, imgNr, styles, handleClick } = props;

	return (
		<div
			style={{
				userSelect: 'none',
				border: '1px solid transparent',
				fontFamily: 'sans-serif',
				background: 'transparent',
				...styles
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					margin: 0,
					width: '100%'
				}}
			>
				<img src={`https://i.picsum.photos/id/${imgNr}/198/300.jpg`} alt={''} />
			</div>
			<div
				style={{
					color: 'white',
					fontFamily: '',
					cursor: 'pointer',
					boxSizing: 'border-box',
					width: '198px',
					height: '38px',
					boxShadow: 'none',
					borderWidth: '1px 0 0 0',
					borderStyle: 'solid',
					borderColor: 'rgb(0, 176, 188)',
					background: 'rgb(0, 176, 188)',
					fontSize: 18,
					paddingTop: '6px',
					textAlign: 'center'
				}}
				onClick={() => handleClick(rowTMP)}
			>
				{`${rowTMP.name}`}
			</div>
		</div>
	);
};

ItemComponent.propTypes = {
	name: PropTypes.string.isRequired,
	styles: PropTypes.object
};

ItemComponent.defaultProps = {
	styles: {}
};

export default class Grid extends React.Component {
	constructor(props) {
		super(props);

		const rows = prepareData();

		function createData(id, name, lastname, username, retweet, likes) {
			return { id, name, lastname, username, retweet, likes };
		}

		this.state = {
			open: false,
			item: {}
		};

		const handleClickOpen = () => {
			this.setState({ open: true });
		};

		const handleClose = () => {
			this.setState({ open: false });
		};

		this.handleClose = handleClose.bind(this);

		const handleClick = (item) => {
			this.setState({ item: item, open: true });
		};

		function prepareData() {
			let preparedData = [];
			var data = require('../../fakeData/fake10000.json');
			let i = 0;
			for (const element of data.data) {
				i += 1;
				preparedData.push(
					createData(
						i,
						element.user.firstname + i,
						element.user.lastname,
						element.user.username,
						element.retweet,
						element.likes
					)
				);
			}
			return preparedData;
		}

		const item = {
			fixedWidth: 200,
			fixedHeight: 340,
			ItemComponent,
			itemProps: {
				styles: {
					width: '200px',
					height: '340px'
				}
			}
		};

		const x = 8;
		const y = 1250;
		const items = [];

		let i = 0;
		for (let iY = 0; iY < y; iY += 1) {
			const row = [];
			items.push(row);
			for (let iX = 0; iX < x; iX += 1) {
				if (rows.length === i) {
					break;
				}
				const rowTMP = rows[i];
				i++;
				const newItem = { ...item };
				const increment = iX + iY * x;
				const key = `item-${increment}`;
				let imgNumber = increment % 1000;
				const imgArray = [
					138,
					540,
					673,
					801,
					934,
					205,
					207,
					332,
					333,
					470,
					463,
					597,
					601,
					734,
					138,
					262,
					394,
					801,
					934,
					333,
					332,
					463,
					462,
					601,
					592,
					597,
					595,
					725,
					734,
					262,
					394,
					792,
					463,
					462,
					597,
					589,
					595,
					587,
					592,
					720,
					725,
					854,
					262,
					394,
					792,
					917,
					920,
					587,
					720,
					589,
					592,
					714,
					725,
					850,
					854,
					246,
					647,
					920,
					917,
					709,
					578,
					587,
					712,
					711,
					710,
					714,
					720,
					713,
					850,
					843,
					246,
					245,
					647,
					644,
					917,
					438,
					578,
					706,
					707,
					711,
					710,
					708,
					712,
					709,
					714,
					713,
					843,
					245,
					105,
					246,
					578,
					245,
					246,
					636,
					644,
					771,
					303,
					438,
					707,
					706,
					709,
					710,
					708,
					843,
					968,
					105,
					636,
					632,
					771,
					763,
					899,
					897,
					438,
					303,
					298,
					561,
					697,
					968,
					963,
					97,
					226,
					359,
					636,
					632,
					895,
					763,
					761,
					759,
					762,
					899,
					897,
					298
				];
				if (imgArray.includes(imgNumber)) {
					imgNumber = 1;
				}
				rowTMP.imgNr = imgNumber;
				newItem.key = key;
				newItem.itemProps = {
					...item.itemProps,
					name: '-' + increment,
					imgNr: imgNumber,
					handleClick: handleClick,
					rowTMP: rowTMP
				};
				newItem.fixedWidth = item.fixedWidth;
				newItem.fixedHeight = item.fixedHeight;

				row.push(newItem);
			}
		}

		this.state = { items };
	}

	// optional; RVDG works as a controlled
	// or an uncontrolled component
	getItems = (items) => {
		this.setState({ items });
	};

	render() {
		return (
			<div style={{ width: '100%', height: '83vh' }}>
				<VirtualDraggableGrid
					items={this.state.items}
					noDragElements={[ 'button' ]}
					fixedRows={true}
					gutterX={10}
					gutterY={10}
					scrollBufferX={400}
					scrollBufferY={400}
					getItems={this.getItems}
				/>
				<SimpleDialog open={this.state.open} onClose={this.handleClose} data={this.state.item} />
			</div>
		);
	}
}
