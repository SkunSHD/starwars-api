function getData(link, setDataFunc) {
	fetch(link)
		.then(response => response.json())
		.then(info => setDataFunc(info))
};

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export {
	getData,
	capitalizeFirstLetter,
};