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

    ambil_peminjaman(null, false);


    /* KUMPULAN FUNCTION */

    function ambil_peminjaman(hal_aktif, scrolltop) {
        if ($('table#tbl-peminjaman').length > 0) {
            $.ajax('http://'+host+path+'/action/ambil', {
                dataType: 'json',
                type: 'POST',
                success: function(data) {
                    $('table#tbl-peminjaman tbody tr').remove();
                    $.each(data.record, function(index, element) {
                        $('table#tbl-peminjaman').find('tbody').append(
                            '<tr>'+
                                '<td>Michael</td>'+
                                '<td>'+element.tujuan+'</td>'+
                                '<td>'+element.keperluan+'</td>'+
                                '<td>'+element.jum_penumpang+'</td>'+
                                '<td>'+element.tgl_pemakaian+'</td>'+
                                '<td>'+element.status_req+'</td>'+
                                '<td width="16%" class="td-actions">'+
                                    '<a href="peminjaman#edit?id='+element.peminjaman_id+'" class="link-edit btn btn-small btn-info"><i class="btn-icon-only icon-pencil"></i> Edit</a>'+
                                    '<a href="peminjaman#hapus?id='+element.peminjaman_id+'" class="btn btn-invert btn-small btn-info"><i class="btn-icon-only icon-remove" id="hapus_1"></i> Hapus</a>'+
                                '</td>'+
                            '</tr>'
                        )
                    });
                }
            });
        }
    }
});