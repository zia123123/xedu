const jwt = require('jsonwebtoken');
const { users, roles } = require('../models/index');

module.exports = {

	verifyToken(req, res, next) {
		let tokenHeader = req.headers['x-access-token'];
		if (tokenHeader.split(' ')[0] !== 'Bearer') {
			return res.status(500).send({
				auth: false,
				message: "Error",
				errors: "Incorrect token format"
			});
		}
		let token = tokenHeader.split(' ')[1];
		if (!token) {
			return res.status(403).send({
				auth: false,
				message: "Error",
				errors: "No token provided"
			});
		}

		jwt.verify(token, authConfig.secret, (err, decoded) => {
			if (err) {
				return res.status(500).send({
					auth: false,
					message: "Error",
					errors: err
				});
			}
			req.userId = decoded.user;
			next();
		});
	},



	// isReg(req, res, next) {
	// 	User.findByPk(req.userId)
	// 		.then(user => {
	// 			user.getRoles().then(roles => {
	// 				for (let i = 0; i < roles.length; i++) {
	// 					if (roles[i].name.toUpperCase() === "PM") {
	// 						next();
	// 						return;
	// 					}
	// 					if (roles[i].name.toUpperCase() === "ADMIN") {
	// 						next();
	// 						return;
	// 					}
	// 				}
	// 				res.status(403).send({
	// 					auth: false,
	// 					message: "Error",
	// 					message: 'Require PM/Admin Role',
	// 				});
	// 				return;
	// 			})
	// 		})
	// }
}