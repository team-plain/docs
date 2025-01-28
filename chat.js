script = document.createElement("script");
script.async = false;
script.onload = () => {
	Plain.init({
		appId: "liveChatApp_01J9BNACEDQHJ5KNCBB3JSDHWR",
		requireAuthentication: true,
	});
};
script.src = "https://chat.cdn-plain.com/index.js";
document.getElementsByTagName("head")[0].appendChild(script);
