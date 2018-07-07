var host = window.location.hostname;
var path = window.location.pathname;

$(function() {
    $(window).hashchange(function() {
        var hash = $.param.fragment();
        if (hash == 'tambah') {
            if (path.search('/peminjaman') > 0) {
                $('#myModal .modal-header #myModalLabel').text('Tambah Peminjaman');
                $('#myModal .modal-footer #submit-peminjaman').text('Tambah');
                $('#myModal #form-peminjaman').attr('action', 'tambah');
            }
            $('#myModal').modal('show');
        } else if (hash.search('edit') == 0) {
            if (path.search('/peminjaman') > 0) {
                $('#myModal .modal-header #myModalLabel').text('Edit Peminjaman');
                $('#myModal .modal-footer #submit-peminjaman').text('Update');
                $('#myModal #form-peminjaman').attr('action','update');
            }
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

    /* BACKEND BAGIAN PEMINJAMAN */
    $(document).on('click', '#submit-peminjaman', function(eve) {
        eve.preventDefault();

        var action = $('#form-peminjaman').attr('action');
        var datatosend = $('#form-peminjaman').serialize();

        $.ajax('http://'+host+path+'/action/'+action, {
            dataType: 'json',
            type: 'POST',
            data: datatosend,
            success: function(data) {
                if (data.status == 'success') {
                    $('#myModal').modal('hide');
                    $('div.widget-content').prepend(
                        '<div class="control-group">'+
                            '<div class="alert alert-success">'+
                                '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                                '<strong>Berhasil !</strong> Peminjaman telah diperbaharui '+
                            '</div>'+
                        '</div>'
                    );
                } else {
                    $.each(data.errors, function(key, value) {
                        $('#'+key).attr('placeholder', value);
                    });
                }
            }
        });
    });
});