const axios = require("axios");

async function getVideo(apiUrl, callConfig, alreadySentIdClips) {
	try {
		const { data } = await axios.get(apiUrl, callConfig);
		const cursor = data.pagination.cursor;
		//bidimensional array to store the videos
		const videosData = [];

		//Filter out those videos at data.data array whose .id is already in alreadySentIdClips and those whose view_count is less than 2200
		const filteredVideos = data.data.filter(
			(clipData) =>
				!alreadySentIdClips.includes(clipData.id) && clipData.view_count >= 2200
		);

		if (filteredVideos.length === 0) {
			return videosData;
		}

		filteredVideos.sort((a, b) => b.view_count - a.view_count);

		for (let i = 0; i < filteredVideos.length; i++) {
			const clipData = filteredVideos[i];

			// Si es un clip que ya hemos descargado, pasamos de el.
			if (clipData.id in alreadySentIdClips) continue;

			const downloadVidUrl =
				clipData.thumbnail_url.split("-preview-")[0] + ".mp4";

			const videoResponse = await axios({
				method: "get",
				url: downloadVidUrl,
				responseType: "stream",
			});

			videosData.push([videoResponse.data, clipData]);
		}

		videosData.push(cursor);
		return videosData;
	} catch (error) {
		throw error; // Propagate the error further if needed
	}
}

module.exports = getVideo;
