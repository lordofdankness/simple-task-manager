require('../src/db/mongoose');
const User = require('../src/schemas/User');

const id = '62b9b33d1db035ccfeb74b84';

// User.findByIdAndUpdate(id, { age: 24 }).then((user) => {
// 		console.log(user);
// 		return User.countDocuments({ age: 24 });
// 	}).then((res) => {
// 		console.log(res);
// 	}).catch((e) => {
// 		console.log(e);
// 	});

const updateAgeAndCount = async (id, age) => {
	const user = await User.findByIdAndUpdate(id, { age });
	const count = await User.countDocuments({ age });
	return { count, user };
};

updateAgeAndCount(id, 6).then((result) => {
	console.log(result);
}).catch((e) => {
	console.log(e);
});
