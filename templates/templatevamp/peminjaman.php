<?php get_template('header') ?>

    <div class="main">
        <div class="main-inner">
            <div class="container">
                <div class="row">
                    <div class="span12">
                        <div class="widget">
                            <div class="widget-header">
                                <i class="icon-file"></i><h3>Daftar Peminjaman</h3>
                                <a class="btn btn-large btn-primary" href="<?=set_url('peminjaman#tambah');?>">Tambah Peminjaman</a>
                            </div>
                            <div class="widget-content">
                                <table id="tbl-peminjaman" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Peminjam</th>
                                            <th class="text-center">Tujuan</th>
                                            <th class="text-center">Keperluan</th>
                                            <th class="text-center">Penumpang</th>
                                            <th class="text-center">Tgl Pemakaian</th>
                                            <th class="text-center">Status</th>
                                            <th class="td-actions"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Danang</td>
                                            <td>Pekalongan</td>
                                            <td>Dismantle</td>
                                            <td>5</td>
                                            <td>25 Juli 2018</td>
                                            <td>Diizinkan</td>
                                            <td width="16%" class="td-actions">
                                                <a href="<?=set_url('peminjaman#edit?id=1');?>" class="link-edit btn btn-small btn-info"><i class="btn-icon-only icon-pencil"></i> Edit</a>
                                                <a href="<?=set_url('peminjaman#hapus?id=1');?>" class="btn btn-invert btn-small btn-info"><i class="btn-icon-only icon-remove" id="hapus_1"></i> Hapus</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="controls pull-right">
                                    <ul id="pagination-peminjaman" class="pagination"></ul>
                                </div>
                            </div><!-- /widget-content -->
                        </div><!-- /widget -->
                    </div><!-- /span12 -->
                </div><!-- /row -->
            </div><!-- /container -->
        </div><!-- /main-inner -->
    </div><!-- /main -->

    <div id="myModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            <h3 id="myModalLabel"><i class="icon-plus"></i> Tambah ...</h3>
        </div>

        <div class="modal-body">
            <form role="form" id="form-peminjaman" action="tambah">
                <div class="form-group">
                    <input class="input-block-level" type="text" id="peminjam" name="peminjam" placeholder="Peminjam">
                    <input class="input-block-level" type="text" id="tujuan" name="tujuan" placeholder="Tujuan">
                    <input class="input-block-level" type="text" id="keperluan" name="keperluan" placeholder="Keperluan">
                    <input class="input-block-level" type="text" id="jum_penumpang" name="jum_penumpang" placeholder="Jumlah Penumpang">
                    <input class="input-block-level" type="text" id="tgl_pemakaian" name="tgl_pemakaian" placeholder="Tanggal Pemakaian">
                    <input class="input-block-level" type="text" id="mobil" name="mobil" placeholder="Mobil">
                    <input class="input-block-level" type="text" id="status" name="status" placeholder="Status">
                </div>
                <input type="hidden" name="peminjaman_id" id="peminjaman_id"/>
            </form>
        </div>

        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Tutup</button>
            <button class="btn btn-info" id="submit-peminjaman">Tambah</button>
        </div>
    </div>

<?php get_template('footer') ?>