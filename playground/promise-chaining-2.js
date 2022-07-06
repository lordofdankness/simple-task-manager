require('../src/db/mongoose');
const Task = require('../src/schemas/Task');

const id = '62bc8ca37d261ed0fbbdcbc3';

// Task.findByIdAndDelete(id).then((task) => {
// 		console.log(task);
// 		return Task.countDocuments({ completed: false });
// 	}).then((res) => {
// 		console.log(res);
// 	}).catch((e) => {
// 		console.log(e);
// 	});

const findAndDelete = async (id) => {
	await Task.findByIdAndDelete(id);
	const count = await Task.countDocuments({ completed: false });
	return count;
};

findAndDelete(id).then((result) => {
	console.log(result);
}).catch((e) => {
	console.log(e);
});
