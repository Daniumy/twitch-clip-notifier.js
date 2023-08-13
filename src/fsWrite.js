const fs = require("fs");

async function fsWrite(data, randomUUID) {
	return new Promise((resolve, reject) => {
		const writeStream = fs.createWriteStream(`${randomUUID}.mp4`);

		data.pipe(writeStream);

		writeStream.on("finish", () => {
			fs.readFile(`${randomUUID}.mp4`, (err) => {
				if (err) {
					console.error(err);
					reject(false);
				}
				resolve(true);
			});
		});

		writeStream.on("error", (err) => {
			console.error("Error writing video:", err);
			reject(false);
		});
	});
}

module.exports = fsWrite;
