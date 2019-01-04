import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Star from '@material-ui/icons/Star';
import { AlertDialog, Button } from 'react-onsenui';
import { withRouter } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
	appBar: {
		position: 'relative',
		backgroundColor: '#16a085'
	},
	flex: {
		flex: 1
	},
	cssLabel: {
		color: '#999',
		'&$cssFocused': {
			color: '#000000'
		}
	},
	cssFocused: {},
	cssUnderline: {
		width: '100%',
		borderColor: '#fff',
		color: '#000',
		borderBottomColor: '#000000',
		'&:before': {
			borderBottomColor: '#000000'
		},
		'&:after': {
			borderBottomColor: '#000000'
		},
		'&:hover': {
			borderBottomColor: '#000000'
		}
	},
	margin: {
		margin: theme.spacing.unit,
		maxWidth: '350px',
		width: '100%',
		fontWeight: 400,
		color: 'white',
		backgroundColor: '#00c43e',
		textDecoration: 'none',
		borderRadius: 0,
		'&:hover': {
			backgroundColor: '#f7f7f7',
			color: '#00c43e'
		}
	},
	form: {
		textAlign: 'center'
	}
});

class Rate extends React.Component {
	state = {
		open: false,
		currentPassword: '',
		newPassword: '',
		isOpen: false
	};

	onChangeTab = selectedTab => {
		this.setState({
			selectedTab: selectedTab
		});
	};

	handleOpen = () => {
		this.setState({
			isOpen: true
		});
	};

	handleClose = () => {
		this.setState({
			isOpen: false
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div style={{ backgroundColor: 'white' }}>
				<List className={classes.list} style={{ paddingBottom: '10px' }}>
					<ListItem button onClick={this.handleOpen}>
						<ListItemIcon>
							<Star style={{ fontSize: '24px' }} />
						</ListItemIcon>
						<ListItemSecondaryAction>
							<ListItemText
								style={{ fontSize: '24px' }}
								inset
								primary="Rate GMB"
							/>
						</ListItemSecondaryAction>
					</ListItem>
				</List>

				<AlertDialog
					isOpen={this.state.isOpen}
					onCancel={this.handleClose}
					cancelable
				>
					<div className="alert-dialog-title">Logout</div>
					<div className="alert-dialog-content">You Sure?</div>

					<Divider />
					<Button
						varian="contained"
						onClick={this.Rate}
						className="alert-dialog-button"
					>
						Yes
					</Button>
					<Button
						varian="contained"
						onClick={this.handleClose}
						className="alert-dialog-button"
					>
						No
					</Button>
				</AlertDialog>
			</div>
		);
	}
}

Rate.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Rate));
