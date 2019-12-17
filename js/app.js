host = 'http://0.0.0.0:8000/';

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
        showProfile();
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
$('#profile-btn').click(() => showProfile());

const fetch = url => {
    try {
        return axios.get(url).then(response => {
            return response.data;
        });
    } catch (error) {
        console.error(error);
    }
};
const loadAndRender = (url, parentId, data, callback) => {
    console.log(data)
    fetch(url).then(response => {
        console.log('fetched ' + url);
        $.each(data, (i, data) => {
            $('#' + parentId).append(Mustache.render(response, data));
        })
        if (callback !== undefined) callback();
    });
};
const loadAndRenderSingleItem = (url, parentId, data, callback) => {
    console.log(data)
    fetch(url).then(response => {
        console.log('fetched ' + url);
        $('#' + parentId).append(Mustache.render(response, data));
        if (callback !== undefined) callback();
    });
};
const showMemberList = (callback) => {
    clearTabbarContent();
    fetch(host + 'member').then(response => {
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
const showProfile = () => {
    clearTabbarContent();
    $('#tabbar-content').load('component/profile.html');
};
const clearTabbarContent = () => $('#tabbar-content').empty();
const clearContent = () => $('#content').empty();
const searchUser = (method, url) => {};
const showMember = userId => {
    clearContent();
    fetch(host + 'member/' + userId).then(response => {
        loadAndRenderSingleItem('component/member-detail.html', 'content', response);
    });
};
const backTo = route => {
    $('#content').load('component/home.html', () => {
        switch (route) {
            case 'member':
                showMemberList();
                break;
        }
    });
}