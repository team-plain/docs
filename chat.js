const script = document.createElement("script");
script.async = false;
script.onload = () => {
	Plain.init({
		appId: "liveChatApp_01JM26XC2MVM6E85G318TN1PDG",
		requireAuthentication: true,
	});
};
script.src = "https://chat.cdn-plain.com/index.js";
document.getElementsByTagName("head")[0].appendChild(script);
