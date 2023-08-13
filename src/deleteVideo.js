const fs = require("fs");

function deleteVideo(randomUUID) {
	console.log(`I am trying to delete ${randomUUID}.mp4`);
	fs.unlink(`${randomUUID}.mp4`, (err) => {
		if (err) {
			console.error(err);
			console.log("COULDNT DELETE IT?");
			return;
		}
	});
}

module.exports = deleteVideo;