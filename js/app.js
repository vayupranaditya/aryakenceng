const host = 'http://10.30.40.218:1803/';

$('document').ready(() => {
	if ($('#member-btn').prop('checked', true)) showMemberList();
});
$('#member-btn').click(() => showMemberList());
$('#news-btn').click(() => clearTabbarContent());
$('#promo-btn').click(() => clearTabbarContent());
$('#profile-btn').click(() => clearTabbarContent());

const fetch = (url) => {
	try {
		return axios.get(url)
			.then(response => {
				return response.data;
			});
	} catch (error) {
		console.error(error);
	}
}

const loadAndRender = (url, data) => {
	fetch('component/member-card.html').then(response => {
		$.each(data, (i, data) => {
			$('#member-list').append(Mustache.render(response, data));
		})
	});
};

const showMemberList = () => {
	fetch('https://gist.githubusercontent.com/vayupranaditya/c93d331458794fc67dbb777151cfbc51/raw/c6d086c74e57acc57bfd26ab616f4bd8e880410b/aryakenceng-user-mockup.json').then(response => {
		clearTabbarContent();
		$('#tabbar-content').load('component/member-list.html');
		loadAndRender('component/member-card.html', response.data);
	});
}

const clearTabbarContent = () => $('#tabbar-content').empty();

const searchUser = (method, url) => {};
