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
                var peminjaman_id = getUrlVars()['id'];
                var peminjaman_detail = getJSON('http://'+host+path+'/action/ambil', { id: peminjaman_id });

                $('#myModal .modal-body #tujuan').val(peminjaman_detail.data['tujuan']);
                $('#myModal .modal-body #keperluan').val(peminjaman_detail.data['keperluan']);
                $('#myModal .modal-body #jum_penumpang').val(peminjaman_detail.data['jum_penumpang']);
                $('#myModal .modal-body #tgl_pemakaian').val(peminjaman_detail.data['tgl_pemakaian']);
                $('#myModal .modal-header #myModalLabel').text('Edit Peminjaman');
                $('#myModal .modal-footer #submit-peminjaman').text('Update');
                $('#myModal #form-peminjaman').attr('action','update');
                $('#myModal #form-peminjaman #peminjaman_id').val(peminjaman_id);
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
        } else if (hash.search('ambil') == 0) {
            if (path.search('/peminjaman') > 0) {
                var hal_aktif = null;
                var hash = getUrlVars();
                if (hash['hal']) {
                    hal_aktif = hash['hal'];
                }
                ambil_peminjaman(hal_aktif, true);
                $("ul#pagination-peminjaman li a:contains('"+hal_aktif+"')").parents().addClass('active').siblings().removeClass('active');
            }
        }
    });
    $(window).trigger('hashchange');

    $('#myModal').on('hidden', function() {
        window.history.pushState(null, null, path);
        $('#myModal').removeClass('big-modal');
        $('#myModal #hapus-notif').remove();
        $('#myModal form').find("input[type=text]").val("");
        $('#myModal form').show();
    });

    moment.locale('id');

    /* 
     * BACKEND BAGIAN PEMINJAMAN 
     *
     */
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
                    ambil_peminjaman(null, false);

                    $('#myModal').modal('hide');
                    $('div.widget-content').prepend(
                        '<div class="control-group">'+
                            '<div class="alert alert-success">'+
                                '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                                '<strong>Berhasil !</strong> Peminjaman telah diperbarui.'+
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
});

/* =================================================== */
/*                  KUMPULAN FUNCTION                  */
/* =================================================== */

function ambil_peminjaman(hal_aktif, scrolltop) {
    if ($('table#tbl-peminjaman').length > 0) {
        $.ajax('http://'+host+path+'/action/ambil', {
            dataType: 'json',
            type: 'POST',
            data: { hal_aktif:hal_aktif },
            success: function(data) {
                $('table#tbl-peminjaman tbody tr').remove();
                $.each(data.record, function(index, element) {
                    $('table#tbl-peminjaman').find('tbody').append(
                        '<tr>'+
                            '<td>Michael</td>'+
                            '<td>'+element.tujuan+'</td>'+
                            '<td>'+element.keperluan+'</td>'+
                            '<td class="text-center">'+element.jum_penumpang+'</td>'+
                            '<td class="text-center">'+moment(element.tgl_pemakaian).format('L')+'</td>'+
                            '<td>'+element.status_req+'</td>'+
                            '<td width="16%" class="td-actions text-center">'+
                                '<a href="peminjaman#edit?id='+element.peminjaman_id+'" class="link-edit btn btn-small btn-warning"><i class="btn-icon-only icon-pencil"></i> Edit</a> '+
                                '<a href="peminjaman#hapus?id='+element.peminjaman_id+'" class="btn btn-invert btn-small btn-danger"><i class="btn-icon-only icon-remove" id="hapus_1"></i> Hapus</a>'+
                            '</td>'+
                        '</tr>'
                    )
                });

                /* BAGIAN UNTUK PAGINATION */
                var pagination = '';
                var paging = Math.ceil(data.total_rows/data.perpage);

                if ((!hal_aktif) && ($('ul#pagination-peminjaman li').length == 0)) {
                    $('ul#pagination-peminjaman li').remove();
                    for (i = 1; i <= paging; i++) {
                        pagination = pagination + '<li><a href="peminjaman#ambil?hal='+i+'">'+i+'</a></li>';
                    }
                }

                $('ul#pagination-peminjaman').append(pagination);
                $("ul#pagination-peminjaman li:contains('"+hal_aktif+"')").addClass('active');

                if (scrolltop == true) {
                    $('body').scrollTop(0);
                }
            }
        });
    }
}

function getJSON(url, data) {
    return JSON.parse($.ajax({
        type: 'POST',
        url : url,
        data: data,
        dataType: 'json',
        global: false,
        async: false,
        success:function(msg) {

        }

    }).responseText);
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}