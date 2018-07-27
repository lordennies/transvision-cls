<?php get_template('header') ?>

    <div class="main">
        <div class="main-inner">
            <div class="container">
                <div class="row">
                    <div class="span12">
                        <div class="widget">
                            <div class="widget-header">
                                <i class="icon-file"></i><h3>Daftar Kendaraan</h3>
                                <a class="btn btn-large btn-primary" href="<?=set_url('kendaraan#tambah');?>">Tambah Kendaraan</a>
                            </div>
                            <div class="widget-content">
                                <table id="tbl-kendaraan" class="table table-striped table-bordered">
                                    <thead>
                                        <tr>
                                            <th class="text-center">Kendaraan</th>
                                            <th class="text-center">No Polisi</th>
                                            <th class="text-center">Tipe Kendaraan</th>
                                            <th class="td-actions"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Xenia</td>
                                            <td>H 9048 HR</td>
                                            <td>MPV</td>
                                            <td width="16%" class="td-actions">
                                                <a href="<?=set_url('kendaraan#edit?id=1');?>" class="link-edit btn btn-small btn-info"><i class="btn-icon-only icon-pencil"></i> Edit</a>
                                                <a href="<?=set_url('kendaraan#hapus?id=1');?>" class="btn btn-invert btn-small btn-info"><i class="btn-icon-only icon-remove" id="hapus_1"></i> Hapus</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div class="controls pull-right">
                                    <ul id="pagination-kendaraan" class="pagination"></ul>
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
            <form role="form" id="form-kendaraan" action="tambah">
                <fieldset class="form-horizontal">
                    <div class="control-group">
                        <label class="control-label" for="nama_kendaraan">Nama Kendaraan</label>
                        <div class="controls">
                            <input type="text" name="nama_kendaraan" id="nama_kendaraan" class="form-control input-block-level" value="" />
                        </div>
                        <label class="control-label" for="no_polisi">No Polisi</label>
                        <div class="controls">
                            <input type="text" name="no_polisi" id="no_polisi" class="form-control input-block-level" value="" />
                        </div>
                        <label class="control-label" for="tipe_kendaraan">Tipe Kendaraan</label>
                        <div class="controls">
                            <input type="text" name="tipe_kendaraan" id="tipe_kendaraan" class="form-control input-block-level" value="" />
                        </div>
                    </div>
                </fieldset>
                <input type="hidden" name="kendaraan_id" id="kendaraan_id"/>
            </form>
        </div>

        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Tutup</button>
            <button class="btn btn-info" id="submit-kendaraan">Tambah</button>
        </div>
    </div>

<?php get_template('footer') ?>