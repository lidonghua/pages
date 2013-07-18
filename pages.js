console.log('Welcome to Pages!');

var PRELOAD_LENGTH = 300;

$('.Pages').hide();
$('.picture-list ul').after('<div id="loading-status" style="text-align: center; font-size: 20pt;"></div>');

function get_page_count() {
  var pages = $('a[data-pg]');
  var max = 0;
  pages.each(function () {
    var cur = parseInt($(this).attr('data-pg'));
    if (cur > max)
      max = cur;
  });
  return max;
};

var loading = false;
var loading_status = $('#loading-status');

var page_count = get_page_count();
var cur_page = 1;

function get_page(page_num) {
  loading = true;
  loading_status.html("载入中……");
  $.ajax({
    url: document.location.href + '?pg=' + page_num,
  }).done(function (data) {
    pictures = $(data).find('.J_list');
    picture_list = $('.picture-list ul');
    pictures.each(function () {
      picture_list.append(this);
    });
    loading_status.html("");
  }).fail(function () {
    loading_status.html("载入失败。");
    cur_page--; // 下次重新载入
  }).always(function () {
    loading = false;
  });
}

document.addEventListener('scroll', function (e) {
  if (!loading) {
    var scroll_height = document.documentElement.scrollHeight;
    var scroll_bottom = document.body.scrollTop + window.innerHeight;
    if (scroll_height - scroll_bottom < PRELOAD_LENGTH && cur_page < page_count && !loading) {
      cur_page++;
      get_page(cur_page);
    }
  }
});
