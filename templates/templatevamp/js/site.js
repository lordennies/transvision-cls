var host = window.location.hostname;
var path = window.location.pathname;

$(function() {
  $(window).hashchange(function() {
    var hash = $.param.fragment();

    if (hash == 'tambah') {

    } else if (hash == 'edit') {

    } else if (hash == 'hapus') {

    } else if (hash == 'ambil') {
      
    }
  });

  $(window).trigger('hashchange');

  $('#myModal').on('hidden', function() {
    window.history.pushState(null, null, path);
  });
});