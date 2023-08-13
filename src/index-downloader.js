const TelegramBot = require("node-telegram-bot-api");
const getVideo = require("./downloadVideo");
const fsWrite = require("./fsWrite");
const fs = require("fs");
const categories = require("./constants");
const deleteVideo = require("./deleteVideo");

const apiUrl = "https://api.twitch.tv/helix/clips";
const game_id = "509658";
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

function execute(after) {
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
	getVideo(apiUrl, callConfig, alreadySentIdClips)
		.then(async (videosData) => {
			if (Boolean(videosData)) {
				const newAfter = videosData[videosData.length - 1];
				console.log("newafter is:");
				console.log(newAfter);
				for (let i = 0; i < videosData.length - 1; i++) {
					const video = videosData[i][0];
					const videoInfo = videosData[i][1];
					console.log(videoInfo);

					const randomUUID = getRandomUUID();

					const isVideoWritten = await fsWrite(video, randomUUID);
					console.log("llego hasta aquí con i: ,", i);
					if (isVideoWritten) {
						//If video weights more than 50MB dont try sending it
						if (fs.statSync(`${randomUUID}.mp4`).size > 50000000) {
							bot.sendMessage(
								chatId,
								`Video is too big! \n url: ${videoInfo.url}\n title: ${videoInfo.title}`
							);
						} else {
							bot
								.sendVideo(chatId, `${randomUUID}.mp4`, {
									caption: `url: ${videoInfo.url}\n title: ${videoInfo.title}\nstreamer: ${videoInfo.broadcaster_name}\n views: ${videoInfo.view_count}\n id: ${videoInfo.id}\nexecution: ${executionsCounter}`,
								})
								.then(() => {
									alreadySentIdClips.push(videoInfo.id);
									//delete the file once it is sent
									deleteVideo(randomUUID);
								})
								.catch((error) => {
									console.error("Error sending video:", error);
								});
						}
						console.log(i);
						console.log(videosData.length - 1);
						if (i === videosData.length - 1) {
							console.log("last video sent");
							execute(newAfter);
						}
					} else if (i === videosData.length - 1) {
						console.log("entro aqui tambien");
						execute(newAfter);
					}
				}
			} else if (videosData === []) {
				console.log("No videos found");
				bot.sendMessage(chatId, "No more videos found sir");
			}
		})
		.catch((error) => {
			console.error("Error getting video:", error);
		});
}

function getRandomUUID() {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
}
