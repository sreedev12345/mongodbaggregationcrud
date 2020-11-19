const config = {
	usersuccess : {
		status : 200,
		useraddmessage : 'data_saved_successfully',
		usergetmessage : 'data retrieved successfully'
	},errmsg : {
		notfound : 'no data found',
		alreadypresent : 'data already present',
		dberror : 'mongoose schema rule violation',
		passworderror : 'password doesnot match',
		usererror : 'user is not valid',
		autherror : 'cant generate token',
		updateerror : 'cant update the documents',
		hasherr : 'cant hash password',
		removemsg : 'record remove successfully',
		cantremove : 'cant remove',
		norecordfound : 'no record found ',
		saveerr : 'cant save'
	},updatesuccess : {
		updatemsg : 'user updated successfully',
		errmsg : 'cant update'
	},authentication : {
		response : 'authentication successfully'
	},status : {
		success : 200,
		notfound : 404,
		internalserver : 500,
		dberrorstatus : 1100
	}
}

module.exports = { config };