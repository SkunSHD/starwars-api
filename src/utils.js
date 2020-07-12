const getData = (link, setDataFunc) => {
	fetch(link)
		.then(response => response.json())
		.then(info => setDataFunc(info))
};

export {
	getData,
};