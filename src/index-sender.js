const TelegramBot = require("node-telegram-bot-api");
const getVideo = require("./downloadVideo");
const fsWrite = require("./fsWrite");
const fs = require("fs");
const categories = require("./constants");
const deleteVideo = require("./deleteVideo");
const axios = require("axios");

const apiUrl = "https://api.twitch.tv/helix/clips";
const game_id = "509658";
//I want started_at_dynamic to be exactly 1 day ago
// const started_at = "2023-08-08T22:34:18Z";
const started_at = new Date(Date.now() - 86400000).toISOString();
const authToken = "5cj0ypv75nzm9pj3uxidoye6mea6bu";
const clientId = "t6ayp5wv66trncg48p3fgybn7om4hs";
const chatId = "1558362938";

// replace the value below with the Telegram token you receive from @BotFather
const token = "5995415408:AAF_QfyM5LYWb9LU5hp5kaBenNfQDsX773w";

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });

let alreadySentIdClips = [
	"RelentlessTardyBibimbapArsonNoSexy-BQCi6-vbuMJAc98c",
	"WimpySparklingFiddleheadsMcaT-mHVTUiCaROkm1HVz",
	"AdorableGenerousArugulaDAESuppy-LznaT5tzAYLJvUos",
	"SparklySmoothManateeGOWSkull-0UH1snHG8geZpr8d",
	"AmazingVibrantCiderResidentSleeper-96ntnraBnydd-c8v",
	"CuteDeterminedYogurtDansGame-cm3lhmFKAVJN6zNi",
	"SpookyFaithfulThymeMau5-loLiOAwtwK73Istp",
	"DeliciousBoringHumanMVGame-k7xZBWKjqqiKR9IF",
	"TacitFunnySpiderBatChest-oZAxaSfvzNV1uV8i",
	"WimpySparklingFiddleheadsMcaT-mHVTUiCaROkm1HVz",
	"RelentlessTardyBibimbapArsonNoSexy-BQCi6-vbuMJAc98c",
	"AdorableGenerousArugulaDAESuppy-LznaT5tzAYLJvUos",
	"SparklySmoothManateeGOWSkull-0UH1snHG8geZpr8d",
	"AmazingVibrantCiderResidentSleeper-96ntnraBnydd-c8v",
	"CuteDeterminedYogurtDansGame-cm3lhmFKAVJN6zNi",
	"SpookyFaithfulThymeMau5-loLiOAwtwK73Istp",
	"RelentlessTardyBibimbapArsonNoSexy-BQCi6-vbuMJAc98c",
	"WimpySparklingFiddleheadsMcaT-mHVTUiCaROkm1HVz",
	"AdorableGenerousArugulaDAESuppy-LznaT5tzAYLJvUos",
	"SparklySmoothManateeGOWSkull-0UH1snHG8geZpr8d",
	"AmazingVibrantCiderResidentSleeper-96ntnraBnydd-c8v",
	"CuteDeterminedYogurtDansGame-cm3lhmFKAVJN6zNi",
	"SpookyFaithfulThymeMau5-loLiOAwtwK73Istp",
	"DeliciousBoringHumanMVGame-k7xZBWKjqqiKR9IF",
	"TacitFunnySpiderBatChest-oZAxaSfvzNV1uV8i",
	"RelentlessTardyBibimbapArsonNoSexy-BQCi6-vbuMJAc98c",
	"WimpySparklingFiddleheadsMcaT-mHVTUiCaROkm1HVz",
	"AdorableGenerousArugulaDAESuppy-LznaT5tzAYLJvUos",
	"SparklySmoothManateeGOWSkull-0UH1snHG8geZpr8d",
	"AmazingVibrantCiderResidentSleeper-96ntnraBnydd-c8v",
	"CuteDeterminedYogurtDansGame-cm3lhmFKAVJN6zNi",
	"DeliciousBoringHumanMVGame-k7xZBWKjqqiKR9IF",
	"SpookyFaithfulThymeMau5-loLiOAwtwK73Istp",
	"TacitFunnySpiderBatChest-oZAxaSfvzNV1uV8i",
	"WimpySparklingFiddleheadsMcaT-mHVTUiCaROkm1HVz",
	"RelentlessTardyBibimbapArsonNoSexy-BQCi6-vbuMJAc98c",
	"AdorableGenerousArugulaDAESuppy-LznaT5tzAYLJvUos",
	"SparklySmoothManateeGOWSkull-0UH1snHG8geZpr8d",
	"AmazingVibrantCiderResidentSleeper-96ntnraBnydd-c8v",
	"CuteDeterminedYogurtDansGame-cm3lhmFKAVJN6zNi",
	"RelentlessTardyBibimbapArsonNoSexy-BQCi6-vbuMJAc98c",
	"WimpySparklingFiddleheadsMcaT-mHVTUiCaROkm1HVz",
	"SparklySmoothManateeGOWSkull-0UH1snHG8geZpr8d",
	"AmazingVibrantCiderResidentSleeper-96ntnraBnydd-c8v",
	"CuteDeterminedYogurtDansGame-cm3lhmFKAVJN6zNi",
	"AdorableGenerousArugulaDAESuppy-LznaT5tzAYLJvUos",
	"WimpySparklingFiddleheadsMcaT-mHVTUiCaROkm1HVz",
	"RelentlessTardyBibimbapArsonNoSexy-BQCi6-vbuMJAc98c",
	"AdorableGenerousArugulaDAESuppy-LznaT5tzAYLJvUos",
	"SparklySmoothManateeGOWSkull-0UH1snHG8geZpr8d",
	"AmazingVibrantCiderResidentSleeper-96ntnraBnydd-c8v",
	"CuteDeterminedYogurtDansGame-cm3lhmFKAVJN6zNi",
	"SpookyFaithfulThymeMau5-loLiOAwtwK73Istp",
	"DeliciousBoringHumanMVGame-k7xZBWKjqqiKR9IF",
	"TacitFunnySpiderBatChest-oZAxaSfvzNV1uV8i",
	"WimpySparklingFiddleheadsMcaT-mHVTUiCaROkm1HVz",
	"RelentlessTardyBibimbapArsonNoSexy-BQCi6-vbuMJAc98c",
	"AdorableGenerousArugulaDAESuppy-LznaT5tzAYLJvUos",
	"SparklySmoothManateeGOWSkull-0UH1snHG8geZpr8d",
	"AmazingVibrantCiderResidentSleeper-96ntnraBnydd-c8v",
	"CuteDeterminedYogurtDansGame-cm3lhmFKAVJN6zNi",
	"SpookyFaithfulThymeMau5-loLiOAwtwK73Istp",
	"DeliciousBoringHumanMVGame-k7xZBWKjqqiKR9IF",
	"TacitFunnySpiderBatChest-oZAxaSfvzNV1uV8i",
];
let executionsCounter = 0;

bot.on("message", () => {
	execute("");
	//Repeat every 10 mins
	// setInterval(() => {
	//      execute();
	// }, 900000);
});

async function execute(after) {
	executionsCounter++;

	console.log(`Executing ${executionsCounter} times`);
	bot.sendMessage(chatId, `Executing ${executionsCounter} times`);
	console.log("alreadySentIdClips: ", alreadySentIdClips);
	const callConfig = {
		headers: {
			Authorization: `Bearer ${authToken}`,
			"Client-Id": clientId,
		},
		params: {
			game_id,
			started_at,
			after,
		},
	};

	const { data } = await axios.get(apiUrl, callConfig);

	if (!data || !data?.data) {
		return console.error("Error getting video:", error);
	}

	const cursor = data.pagination.cursor;

	//Filter out those videos at data.data array whose .id is already in alreadySentIdClips and those whose view_count is less than 2200
	const filteredVideos = data.data.filter(
		(clipData) =>
			!alreadySentIdClips.includes(clipData.id) && clipData.view_count >= 2200
	);

	if (filteredVideos.length === 0) {
		bot.sendMessage(chatId, "No new clips found, ahora deberíamos cambiar de categoría");
     }
     
	filteredVideos.sort((a, b) => b.view_count - a.view_count);

	for (let i = 0; i < filteredVideos.length; i++) {
		const videoInfo = filteredVideos[i];
		await itemRunner(i);
		const downloadVidUrl =
			videoInfo.thumbnail_url.split("-preview-")[0] + ".mp4";
		bot
			.sendVideo(chatId, downloadVidUrl, {
				caption: `url: ${videoInfo.url}\n title: ${videoInfo.title}\nstreamer: ${videoInfo.broadcaster_name}\n views: ${videoInfo.view_count}\n id: ${videoInfo.id}\nexecution: ${executionsCounter}`,
			})
			.then(() => {
				alreadySentIdClips.push(videoInfo.id);
			})
			.catch(() => {
				console.error("Error sending video with id:", videoInfo.id);
				bot.sendMessage(
					chatId,
					`Error sending video with id: ${videoInfo.id} \n title: ${videoInfo.title} \n url to download:${downloadVidUrl} \n url: ${videoInfo.url} \n streamer: ${videoInfo.broadcaster_name} \n views: ${videoInfo.view_count} \n execution: ${executionsCounter}`
				);
			});

          if (i === filteredVideos.length) {
               console.log(videoInfo);
			execution(cursor);
		}
	}
}

async function itemRunner(i) {
	await delay(i);
}

function delay(i) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve();
		}, 5000 * i);
	});
}
