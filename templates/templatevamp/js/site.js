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
            } else if (path.search('/kendaraan') > 0) {
                $('#myModal .modal-header #myModalLabel').text('Tambah Kendaraan');
                $('#myModal .modal-footer #submit-kendaraan').text('Tambah');
                $('#myModal #form-kendaraan').attr('action', 'tambah');
            } else if (path.search('/user') > 0) {
                $('#myModal .modal-header #myModalLabel').text('Tambah User');
                $('#myModal .modal-footer #submit-user').text('Tambah');
                $('#myModal #form-user').attr('action', 'tambah');
            }
            $('#myModal').modal('show');
        } else if (hash.search('edit') == 0) {
            if (path.search('/peminjaman') > 0) {
                /* pilihan kendaraan */
                // var pilihan_kendaraan = getJSON('http://'+host+path+'/ambil', {});
                // $('#kendaraan option').remove();
                // $('#kendaraan').append('<option value="">Pilih Kendaraan</option>');
                // if (pilihan_kendaraan.record) {
                //     $.each(pilihan_kendaraan.record, function(key, value) {
                //         $('#kendaraan').append('<option value="'+value['kendaraan_id']+'">'+value['nama_kendaraan']+'</option>');
                //     });
                // }

                var peminjaman_id = getUrlVars()['id'];
                var peminjaman_detail = getJSON('http://'+host+path+'/action/ambil', { id: peminjaman_id });

                $('#myModal .modal-body #peminjam').val(peminjaman_detail.data['username']);
                $('#myModal .modal-body #tujuan').val(peminjaman_detail.data['tujuan']);
                $('#myModal .modal-body #keperluan').val(peminjaman_detail.data['keperluan']);
                $('#myModal .modal-body #jum_penumpang').val(peminjaman_detail.data['jum_penumpang']);
                $('#myModal .modal-body #tgl_pemakaian').val(peminjaman_detail.data['tgl_pemakaian']);
                $('#myModal .modal-header #myModalLabel').text('Edit Peminjaman');
                $('#myModal .modal-footer #submit-peminjaman').text('Update');
                $('#myModal #form-peminjaman').attr('action','update');
                $('#myModal #form-peminjaman #peminjaman_id').val(peminjaman_id);
            } else if (path.search('/kendaraan') > 0) {
                var kendaraan_id = getUrlVars()['id'];
                var kendaraan_detail = getJSON('http://'+host+path+'/action/ambil', { id: kendaraan_id });

                $('#myModal .modal-body #nama_kendaraan').val(kendaraan_detail.data['nama_kendaraan']);
                $('#myModal .modal-body #no_polisi').val(kendaraan_detail.data['no_polisi']);
                $('#myModal .modal-body #tipe_kendaraan').val(kendaraan_detail.data['tipe_kendaraan']);
                $('#myModal .modal-header #myModalLabel').text('Edit Peminjaman');
                $('#myModal .modal-footer #submit-kendaraan').text('Update');
                $('#myModal #form-kendaraan').attr('action', 'update');
                $('#myModal #form-kendaraan #kendaraan_id').val(kendaraan_id);
            } else if (path.search('/user') > 0) {
                var user_id = getUrlVars()['id'];
                var user_detail = getJSON('http://'+host+path+'/action/ambil', { id: user_id });

                $('#myModal .modal-body #username').val(user_detail.data['username']);
                $('#myModal .modal-body #email').val(user_detail.data['email']);
                $('#myModal .modal-body #group').val(user_detail.data['group']);
                $('#myModal .modal-header #myModalLabel').text('Edit User');
                $('#myModal .modal-footer #submit-user').text('Update');
                $('#myModal #form-user').attr('action', 'update');
                $('#myModal #form-user #user_id').val(user_id);
            }
            $('#myModal').modal('show');
        } else if (hash.search('hapus') == 0) {
            if (path.search('/peminjaman') > 0) {
                var peminjaman_id = getUrlVars()['id'];
                $('#myModal form').hide();
                $('#myModal .modal-header #myModalLabel').text('Hapus Peminjaman');
                $('#myModal .modal-footer #submit-peminjaman').text('Hapus');
                $('#myModal #form-peminjaman').attr('action', 'hapus');
                $('#myModal .modal-body').prepend('<p id="hapus-notif">Apakah Anda yakin akan menghapus?</p>');
                $('#myModal #form-peminjaman #peminjaman_id').val(peminjaman_id);
            } else if (path.search('/kendaraan') > 0) {
                var kendaraan_id = getUrlVars()['id'];
                $('#myModal form').hide();
                $('#myModal .modal-header #myModalLabel').text('Hapus Kendaraan');
                $('#myModal .modal-footer #submit-kendaraan').text('Hapus');
                $('#myModal #form-kendaraan').attr('action', 'hapus');
                $('#myModal .modal-body').prepend('<p id="hapus-notif">Apakah Anda yakin akan menghapus kendaraan ini?</p>');
                $('#myModal #form-kendaraan #kendaraan_id').val(kendaraan_id);
            } else if (path.search('/user') > 0) {
                var user_id = getUrlVars()['id'];
                $('#myModal form').hide();
                $('#myModal .modal-header #myModalLabel').text('Hapus User');
                $('#myModal .modal-footer #submit-user').text('Hapus');
                $('#myModal #form-user').attr('action', 'hapus');
                $('#myModal .modal-body').prepend('<p id="hapus-notif">Apakah Anda yakin akan menghapus user ini?</p>');
                $('#myModal #form-user #user_id').val(user_id);
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
            } else if (path.search('/kendaraan') > 0) {
                var hal_aktif = null;
                var hash = getUrlVars();
                if (hash['hal']) {
                    hal_aktif = hash['hal'];
                }
                ambil_kendaraan(hal_aktif, true);
                $("ul#pagination-kendaraan li a:contains('"+hal_aktif+"')").parents().addClass('active').siblings().removeClass('active');
            } else if (path.search('/user') > 0) {
                var hal_aktif = null;
                var hash = getUrlVars();
                if (hash['hal']) {
                    hal_aktif = hash['hal'];
                }
                ambil_user(hal_aktif, true);
                $("ul#pagination-user li a:contains('"+hal_aktif+"')").parents().addClass('active').siblings().removeClass('active');
            }
        } else if (hash.search('loc') == 0) {
            if (path.search('/peminjaman') > 0) {

                $('#myModal form').hide();
                $('#myModal .modal-header #myModalLabel').text('Lokasi Peminjam');
                $('#myModal .modal-footer #submit-peminjaman').hide();
                $('#myModal .modal-body').prepend(
                    '<div id="myMap" style="height: 450px">'+
                        '<div id="map" style="width: 100%; height: 100%"></div>'+
                    '</div>'
                );
                $('#myModal').prepend('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCrKbZ9zq1_L-xHXQg_6lHtYBGbFtqV6vI&callback=initMap" async defer></script>');
            }
            $('#myModal').addClass('big-modal');
            $('#myModal').modal('show');
        }
    });

    $(window).trigger('hashchange');

    $('#myModal').on('hidden', function() {
        window.history.pushState(null, null, path);
        $('#myModal #hapus-notif').remove();
        $('#myModal #myMap').remove();
        $('#myModal form').find("input[type=text], input[type=hidden], input[type=password], input[type=email]").val("").attr('placeholder', '');
        $('#myModal form').find("select").prop("selected", false); 
        $('#myModal form').show();
    });

    moment.locale('id');

    /* 
     * BACKEND BAGIAN PEMINJAMAN
     */
    $(document).on('click', '#submit-peminjaman', function(eve) {
        eve.preventDefault();
        var action = $('#form-peminjaman').attr('action');
        var datatosend = $('#form-peminjaman').serialize();

        $('#myModal').modal('hide');
        $('#loadingModal').modal('show');

        $.ajax('http://'+host+path+'/action/'+action, {
            dataType: 'json',
            type: 'POST',
            data: datatosend,
            success: function(data) {
                if (data.status == 'success') {
                    ambil_peminjaman(null, false);
                    $('#loadingModal').modal('hide');

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

    /* 
     * BACKEND BAGIAN KENDARAAN
     */
    $(document).on('click', '#submit-kendaraan', function(eve) {
        eve.preventDefault();
        var action = $('#form-kendaraan').attr('action');
        var datatosend = $('#form-kendaraan').serialize();

        $('#myModal').modal('hide');
        $('#loadingModal').modal('show');

        $.ajax('http://'+host+path+'/action/'+action, {
            dataType: 'json',
            type: 'POST',
            data: datatosend,
            success: function(data) {
                if (data.status == 'success') {
                    ambil_kendaraan(null, false);
                    $('#loadingModal').modal('hide');

                    $('div.widget-content').prepend(
                        '<div class="control-group">'+
                            '<div class="alert alert-success">'+
                                '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                                '<strong>Berhasil !</strong> Kendaraan telah diperbarui.'+
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

    ambil_kendaraan(null, false);

    /* 
     * BACKEND BAGIAN USER
     */
    $(document).on('click', '#submit-user', function(eve) {
        eve.preventDefault();
        var action = $('#form-user').attr('action');
        var datatosend = $('#form-user').serialize();

        $('#myModal').modal('hide');
        $('#loadingModal').modal('show');

        $.ajax('http://'+host+path+'/action/'+action, {
            dataType: 'json',
            type: 'POST',
            data: datatosend,
            success: function(data) {
                if (data.status == 'success') {
                    ambil_user(null, false);
                    $('#loadingModal').modal('hide');

                    $('div.widget-content').prepend(
                        '<div class="control-group">'+
                            '<div class="alert alert-success">'+
                                '<button type="button" class="close" data-dismiss="alert">&times;</button>'+
                                '<strong>Berhasil !</strong> User telah diperbarui.'+
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

    ambil_user(null, false);
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
                    if (element.status_req == 0) { status = "pending"; }
                    $('table#tbl-peminjaman').find('tbody').append(
                        '<tr>'+
                            '<td>'+element.username+'</td>'+
                            '<td>'+element.tujuan+'</td>'+
                            '<td>'+element.keperluan+'</td>'+
                            '<td class="text-center">'+element.jum_penumpang+'</td>'+
                            '<td class="text-center">'+moment(element.tgl_pemakaian).format('L')+'</td>'+
                            '<td>'+status+'</td>'+
                            '<td width="21%" class="td-actions text-center">'+
                                '<a href="peminjaman#edit?id='+element.peminjaman_id+'" class="link-edit btn btn-small btn-warning"><i class="btn-icon-only icon-pencil"></i> Edit</a> '+
                                '<a href="peminjaman#hapus?id='+element.peminjaman_id+'" class="btn btn-invert btn-small btn-danger"><i class="btn-icon-only icon-remove" id="hapus_1"></i> Hapus</a> '+
                                '<a href="peminjaman/showMap?id='+element.peminjaman_id+'" target="_blank" class="btn btn-invert btn-small btn-success"><i class="btn-icon-only icon-map-marker"></i> Check</a>'+
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

function ambil_kendaraan(hal_aktif, scrolltop) {
    if ($('table#tbl-kendaraan').length > 0) {
        $.ajax('http://'+host+path+'/action/ambil', {
            dataType: 'json',
            type: 'POST',
            data: { hal_aktif:hal_aktif },
            success: function(data) {
                $('table#tbl-kendaraan tbody tr').remove();
                $.each(data.record, function(index, element) {
                    $('table#tbl-kendaraan').find('tbody').append(
                        '<tr>'+
                            '<td>'+element.nama_kendaraan+'</td>'+
                            '<td>'+element.no_polisi+'</td>'+
                            '<td>'+element.tipe_kendaraan+'</td>'+
                            '<td width="16%" class="td-actions text-center">'+
                                '<a href="kendaraan#edit?id='+element.kendaraan_id+'" class="link-edit btn btn-small btn-warning"><i class="btn-icon-only icon-pencil"></i> Edit</a> '+
                                '<a href="kendaraan#hapus?id='+element.kendaraan_id+'" class="btn btn-invert btn-small btn-danger"><i class="btn-icon-only icon-remove" id="hapus_1"></i> Hapus</a>'+
                            '</td>'+
                        '</tr>'
                    )
                });

                /* BAGIAN UNTUK PAGINATION */
                var pagination = '';
                var paging = Math.ceil(data.total_rows/data.perpage);

                if ((!hal_aktif) && ($('ul#pagination-kendaraan li').length == 0)) {
                    $('ul#pagination-kendaraan li').remove();
                    for (i = 1; i <= paging; i++) {
                        pagination = pagination + '<li><a href="kendaraan#ambil?hal='+i+'">'+i+'</a></li>';
                    }
                }

                $('ul#pagination-kendaraan').append(pagination);
                $("ul#pagination-kendaraan li:contains('"+hal_aktif+"')").addClass('active');

                if (scrolltop == true) {
                    $('body').scrollTop(0);
                }
            }
        });
    }
}

function ambil_user(hal_aktif, scrolltop) {
    if ($('table#tbl-user').length > 0) {
        $.ajax('http://'+host+path+'/action/ambil', {
            dataType: 'json',
            type: 'POST',
            data: { hal_aktif:hal_aktif },
            success: function(data) {
                $('table#tbl-user tbody tr').remove();
                $.each(data.record, function(index, element) {
                    $('table#tbl-user').find('tbody').append(
                        '<tr>'+
                            '<td><img src="http://'+host+path.replace('user', 'assets/images/')+'user.png"/> <a class="link-edit" href="user#edit?id='+element.user_id+'">'+element.username+'</a></td>'+
                            '<td><i class="icon-envelope"></i> <span class="value">'+element.email+'</span></td>'+
                            '<td><i class="icon-group"></i> <span class="value">'+element.group+'</span></td>'+
                            '<td width="16%" class="td-actions text-center">'+
                                '<a href="user#edit?id='+element.user_id+'" class="link-edit btn btn-small btn-warning"><i class="btn-icon-only icon-pencil"></i> Edit</a> '+
                                '<a href="user#hapus?id='+element.user_id+'" class="btn btn-invert btn-small btn-danger"><i class="btn-icon-only icon-remove" id="hapus_1"></i> Hapus</a>'+
                            '</td>'+
                        '</tr>'
                    )
                });

                /* BAGIAN UNTUK PAGINATION */
                var pagination = '';
                var paging = Math.ceil(data.total_rows/data.perpage);

                if ((!hal_aktif) && ($('ul#pagination-user li').length == 0)) {
                    $('ul#pagination-user li').remove();
                    for (i = 1; i <= paging; i++) {
                        pagination = pagination + '<li><a href="user#ambil?hal='+i+'">'+i+'</a></li>';
                    }
                }

                $('ul#pagination-user').append(pagination);
                $("ul#pagination-user li:contains('"+hal_aktif+"')").addClass('active');

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
        success: function(msg) {

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
