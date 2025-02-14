const script = document.createElement("script");
script.async = false;
script.onload = () => {
	Plain.init({
		appId: "liveChatApp_01JM26TWFWA42SD3HJPXN8PEPE",
		requireAuthentication: true,
	});
};
script.src = "https://chat.cdn-plain.com/index.js";
document.getElementsByTagName("head")[0].appendChild(script);
