<div class="footer">
  <div class="footer-inner">
    <div class="container">
      <div class="row">
        <div class="span12"> &copy; 2018 <a href="#">Ardian Daniswara Dharminto</a>. </div>
        <!-- /span12 --> 
      </div>
      <!-- /row --> 
    </div>
    <!-- /container --> 
  </div>
  <!-- /footer-inner --> 
</div>
<!-- /footer --> 
<!-- Le javascript
================================================== --> 
<!-- Placed at the end of the document so the pages load faster --> 
<script src="<?php echo get_template_directory(dirname(__FILE__), 'js/'); ?>jquery-1.7.2.min.js"></script>
<script src="<?php echo get_template_directory(dirname(__FILE__), 'js/'); ?>bootstrap.js"></script>
<script src="<?php echo get_template_directory(dirname(__FILE__), 'js/'); ?>jquery.hashchange.min.js"></script>
<script src="<?php echo get_template_directory(dirname(__FILE__), 'js/'); ?>excanvas.min.js"></script>
<script src="<?php echo get_template_directory(dirname(__FILE__), 'js/'); ?>chart.min.js" type="text/javascript"></script>
<script language="javascript" type="text/javascript" src="<?php echo get_template_directory(dirname(__FILE__), 'js/'); ?>full-calendar/fullcalendar.min.js"></script>
 
<script src="<?php echo get_template_directory(dirname(__FILE__), 'js/'); ?>base.js"></script> 
<script>
  $(function() {
    var path = window.location.pathname;
    $(window).hashchange([{
      hash: "#tambah",
      onSet: function() {
        $('#myModal').modal('show');
      }
    }]);

    $('#myModal').on('hidden', function() {
      window.history.pushState(null, null, path);
    });
  });
</script>
</body>
</html>