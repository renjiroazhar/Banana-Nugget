import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Viewer from 'react-viewer';
import 'react-viewer/dist/index.css';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { format } from 'date-fns/esm';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment';
import 'moment/locale/id';

const styles = theme => ({
	listItem: {
		padding: `${theme.spacing.unit}px 0`
	},
	total: {
		fontWeight: '700'
	},
	title: {
		marginTop: theme.spacing.unit * 2
	},
	list: {
		padding: 0
	},
	list2: {
		padding: 6
	}
});

class Review extends React.Component {
	state = {
		visible: false,
		open: false
	};

	handleClickOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	isLoading = () => {
		this.props.isLoading();
	};

	async continue(e) {
		e.preventDefault();

		await this.props.nextStep();
	}

	viewImage = () => {
		this.setState({
			visible: true
		});
	};
	cancelViewImage = () => {
		this.setState({
			visible: false
		});
	};
	back = () => {
		this.props.previousStep();
	};

	uploadingImage = () => {
		this.props.isLoading();
		this.handleClose();
		this.props.handleUpload();
	};

	render() {
		const { classes } = this.props;
		const {
			values: {
				name,
				phone,
				email,
				address,

				selectedDate,
				previewGeneralPhotos,

				catatan,

				downloadURLs,
				loading
			}
		} = this.props;

		// const uploadImage = () => {
		// 	if (previewGeneralPhotos.length === 0 && downloadURLs.length === 0) {
		// 		return null;
		// 	}
		// 	if (!allowSend) {
		// 		return (
		// 			<div style={{ textAlign: 'center' }}>
		// 				<Button
		// 					style={{
		// 						backgroundColor: '#1ABC9C',
		// 						color: 'white',
		// 						height: '40px',
		// 						marginBottom: '25px'
		// 					}}
		// 					onClick={this.handleClickOpen}
		// 				>
		// 					Kirim Gambar
		// 				</Button>
		// 			</div>
		// 		);
		// 	} else {
		// 		return (
		// 			<div style={{ textAlign: 'center' }}>
		// 				<p>Berhasil Mengupload Gambar</p>
		// 			</div>
		// 		);
		// 	}
		// };

		const buttonSubmit = () => {
			if (previewGeneralPhotos.length === 0 && downloadURLs.length === 0) {
				return (
					<div
						style={{
							textAlign: 'center',

							width: '100%'
						}}
					>
						<Button
							variant="contained"
							color="primary"
							onClick={this.props.handleCreateOrder}
							style={{
								width: '100%',
								backgroundColor: '#1ABC9C',
								color: 'white',
								height: '46px'
							}}
						>
							Pesan
						</Button>
					</div>
				);
			} else {
				return (
					<div
						style={{
							textAlign: 'center',

							width: '100%'
						}}
					>
						<Button
							variant="contained"
							color="primary"
							style={{
								width: '100%',
								backgroundColor: '#1ABC9C',
								color: 'white',
								height: '46px'
							}}
							onClick={this.props.handleUpload}
						>
							Pesan
						</Button>
					</div>
				);
			}
		};

		if (loading) {
			return (
				<div
					style={{
						textAlign: 'center',
						justifyContent: 'center',
						height: '100%',
						position: 'relative',
						top: 'calc(50% - 10px)'
					}}
				>
					<br />
					Mengupload Gambar...
				</div>
			);
		}

		return (
			console.log(selectedDate),
			(
				<React.Fragment>
					<Dialog
						open={this.state.open}
						onClose={this.handleClose}
						aria-labelledby="alert-dialog-title"
						aria-describedby="alert-dialog-description"
					>
						<DialogTitle id="alert-dialog-title">{'Anda Yakin?'}</DialogTitle>
						<DialogContent>
							<DialogContentText id="alert-dialog-description">
								Anda tidak akan bisa kembali ke tahap sebelumnya apabila gambar
								telah terkirim. Mohon periksa kembali data yang Anda masukkan.
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={this.handleClose} color="primary">
								Batal
							</Button>
							<Button onClick={this.uploadingImage} color="primary" autoFocus>
								Ok
							</Button>
						</DialogActions>
					</Dialog>
					<Typography variant="h6" gutterBottom>
						Ringkasan Pemesanan
					</Typography>
					<List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Nama Lengkap"
								/>
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={name} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText style={{ float: 'left' }} secondary="Alamat" />
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={address} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText style={{ float: 'left' }} secondary="Email" />
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={email} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Nomor Telepon"
								/>
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={phone} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Tanggal Penjemputan"
								/>
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText
									style={{ float: 'left' }}
									primary={`${moment(selectedDate)
										.lang('id')
										.format('LL')}`}
								/>
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Jam Penjemputan"
								/>
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText
									style={{ float: 'left' }}
									primary={`${format(selectedDate, 'HH:mm')}`}
								/>
							</ListItem>
						</List>

						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText style={{ float: 'left' }} secondary="Catatan" />
							</ListItem>
							<ListItem style={{ paddingTop: 0 }}>
								<ListItemText style={{ float: 'left' }} primary={catatan} />
							</ListItem>
						</List>
						<List className={classes.list} onClick={this.handleClickOpen}>
							<ListItem button onClick={this.handleClickOpen}>
								<ListItemText
									style={{ float: 'left' }}
									secondary="Gambar Sampah"
								/>
							</ListItem>

							{previewGeneralPhotos.length > 0 ? (
								<div>
									<div>
										{previewGeneralPhotos &&
											previewGeneralPhotos.map((file, i) => (
												<div style={{ textAlign: 'center' }}>
													<Grid container spacing={24}>
														<Grid item xs={12} align="center">
															{' '}
															<img
																onClick={this.viewImage}
																src={URL.createObjectURL(file)}
																alt="preview failed"
																key={file.base64}
																height="175"
																style={{
																	width: '100%',
																	marginTop: '20px'
																}}
															/>
														</Grid>
													</Grid>

													<Viewer
														visible={this.state.visible}
														onClose={this.cancelViewImage}
														images={[
															{
																src: URL.createObjectURL(file),
																alt: ''
															}
														]}
													/>
												</div>
											))}
									</div>
								</div>
							) : null}
						</List>
					</List>

					<br />
					{/* <div style={{ textAlign: 'center' }}>{uploadImage()}</div> */}

					<br />
					<br />
					<br />

					<div style={{ marginBottom: '25px' }}>
						<Grid item xs={12}>
							{buttonSubmit()}
						</Grid>
					</div>
					<br />
					<br />
					<br />
				</React.Fragment>
			)
		);
	}
}

Review.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Review);