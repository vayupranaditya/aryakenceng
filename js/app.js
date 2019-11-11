'use strict'

const host = 'http://10.30.40.50:1803/';

$('document').ready(() => {
  if ($('#member-btn').prop('checked', true)) {
    showMemberList();
  }
});

$('#tabbar-content').on('swipeleft', () => {
  if ($('#member-btn')[0].checked) {
    $('#member-btn')[0].checked = false;
    $('#news-btn')[0].checked = true;
    showNewsList();
  } else if ($('#news-btn')[0].checked) {
    $('#news-btn')[0].checked = false;
    $('#promo-btn')[0].checked = true;
    showPromoList();
  } else if ($('#promo-btn')[0].checked) {
    $('#promo-btn')[0].checked = false;
    $('#profile-btn')[0].checked = true;
    clearTabbarContent();
  }
});
$('#tabbar-content').on('swiperight', () => {
  if ($('#news-btn')[0].checked) {
    $('#news-btn')[0].checked = false;
    $('#member-btn')[0].checked = true;
    showMemberList();
  } else if ($('#promo-btn')[0].checked) {
    $('#promo-btn')[0].checked = false;
    $('#news-btn')[0].checked = true;
    showNewsList();
  } else if ($('#profile-btn')[0].checked) {
    $('#profile-btn')[0].checked = false;
    $('#promo-btn')[0].checked = true;
    showPromoList();
  }
});

$('#member-btn').click(() => showMemberList());
$('#news-btn').click(() => showNewsList());
$('#promo-btn').click(() => showPromoList());
$('#profile-btn').click(() => clearTabbarContent());

const fetch = url => {
  try {
    return axios.get(url)
      .then(response => {
        return response.data;
      });
  } catch (error) {
    console.error(error);
  }
};

const loadAndRender = (url, parentId, data, callback) => {
  fetch(url).then(response => {
    console.log('fetched ' + url);
    $.each(data, (i, data) => {
      $('#' + parentId).append(Mustache.render(response, data));
    })
    if (callback !== undefined) callback();
  });
};

const showMemberList = (callback) => {
  clearTabbarContent();
  fetch('https://gist.githubusercontent.com/vayupranaditya/c93d331458794fc67dbb777151cfbc51/raw/c6d086c74e57acc57bfd26ab616f4bd8e880410b/aryakenceng-user-mockup.json').then(response => {
    $('#tabbar-content').load('component/member-list.html');
    loadAndRender('component/member-card.html', 'member-list', response.data, callback);
  });
};

const showNewsList = () => {
  clearTabbarContent();
  $('#tabbar-content').load('component/news-list.html', () => {
    fetch(host + 'category').then(response => {
      loadAndRender('component/category-card.html', 'category-list', response, () => {
      	$('#category-list').on('swipeleft swiperight', (e) => e.stopPropagation());
      });
    })
    fetch(host + 'news' + '?category=3').then(response => {
      loadAndRender('component/news-card.html', 'news-list', response.data);
    });
  });
};

const showPromoList = () => {
	clearTabbarContent();
	$('#tabbar-content').load('component/promo-list.html', () => {
		fetch(host + 'promo').then(response => {
			loadAndRender('component/promo-card.html', 'promo-list', response.data);
		})
	});
};

const clearTabbarContent = () => $('#tabbar-content').empty();

const searchUser = (method, url) => {};