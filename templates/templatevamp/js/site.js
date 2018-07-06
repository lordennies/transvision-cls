var host = window.location.hostname;
var path = window.location.pathname;

$(function() {
    $(window).hashchange(function() {
        var hash = $.param.fragment();
        if (hash == 'tambah') {
            if (path.search('/user') > 0) {
                $('#myModal .modal-header #myModalLabel').text('Tambah User');
                $('#myModal .modal-footer #submit-user').text('Tambah');
                $('#myModal #form-user').attr('action','tambah');
            }
            $('#myModal').addClass('big-modal');
            $('#myModal').modal('show');
        } else if (hash.search('edit') == 0) {
            if (path.search('/peminjaman') > 0) {
                $('#myModal .modal-header #myModalLabel').text('Edit Peminjaman');
                $('#myModal .modal-footer #submit-peminjaman').text('Update');
                $('#myModal #form-peminjaman').attr('action','update');
            }
            $('#myModal').addClass('big-modal');
            $('#myModal').modal('show');
        } else if (hash.search('hapus') == 0) {
            if (path.search('/peminjaman') > 0) {
                $('#myModal form').hide();
                $('#myModal .modal-header #myModalLabel').text('Hapus Peminjaman');
                $('#myModal .modal-footer #submit-peminjaman').text('Hapus');
                $('#myModal #form-peminjaman').attr('action','hapus');
                $('#myModal .modal-body').prepend('<p id="hapus-notif">Apakah Anda yakin akan menghapus?</p>');
            }
            $('#myModal').modal('show');
        } else if (hash == 'ambil') {

        }
    });
    $(window).trigger('hashchange');
    $('#myModal').on('hidden', function() {
        window.history.pushState(null, null, path);
        $('#myModal').removeClass('big-modal');
        $('#myModal #hapus-notif').remove();
        $('#myModal form').find("input[type=text], textarea").val("");
        $('#myModal form').show();
    });
});