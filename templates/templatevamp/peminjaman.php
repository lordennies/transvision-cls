<?php get_template('header') ?>

    <div class="main">
        <div class="main-inner">
            <div class="container">
                <div class="row">
                    <div class="span12">
                        <div class="widget">
                            <div class="widget-header">
                                <i class="icon-file"></i><h3>Daftar Peminjaman</h3>
                            </div>
                            <div class="widget-content">
                                <table id="tbl-artikel" class="table table-striped table-bordered">
                                    <tbody>
                                        <tr>
                                            <td><a class="link-edit" href="<?=set_url('peminjaman#edit?id=1');?>">Danang</a> <strong></strong></td>
                                            <td><span class="value">Pekalongan</span></td>
                                            <td><span class="value">Dismantle</span></td>
                                            <td><span class="value">25 Juli 2018</span></td>
                                            <td width="16%" class="td-actions">
                                                <a href="<?=set_url('peminjaman#edit?id=1');?>" class="link-edit btn btn-small btn-info"><i class="btn-icon-only icon-pencil"></i> Edit</a>
                                                <a href="<?=set_url('peminjaman#hapus?id=1');?>" class="btn btn-invert btn-small btn-info"><i class="btn-icon-only icon-remove" id="hapus_1"></i> Hapus</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>  
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
            <form role="form" id="form-user" action="tambah">
                <div class="form-group">
                    <input class="input-block-level" type="text" id="post_title" name="post_title" placeholder="Tuliskan Judul Artikel Disini">
                    <textarea class="form-control input-block-level" placeholer="Message" name="post_content" rows="20" id="post_content"></textarea>
                </div>
                <input type="hidden" name="mass_action_type" id="mass_action_type"/>
                <input type="hidden" name="post_id" id="post_id"/>
            </form>
        </div>

        <div class="modal-footer">
            <button class="btn" data-dismiss="modal" aria-hidden="true">Tutup</button>
            <button class="btn btn-primary" id="submit-user">Tambah</button>
        </div>
    </div>

<?php get_template('footer') ?>