@extends('admin.layout.master')
@section('title','Admin-UserAdd')
@section('page-level-css')

  <!-- DataTables -->
  
  <link rel="stylesheet" href="{{ asset('plugins/datatables-bs4/css/dataTables.bootstrap4.min.css')}}">
  <link rel="stylesheet" href="{{ asset('plugins/datatables-responsive/css/responsive.bootstrap4.min.css')}}">
  <link rel="stylesheet" href="{{ asset('plugins/datatables-buttons/css/buttons.bootstrap4.min.css')}}">
<style type="text/css">
</style>  
@endsection
@section('content')
<!-- Content Header (Page header) -->
<div class="content-header">
  <div class="container-fluid">
    <div class="row mb-2">
      <div class="col-sm-6">
        <h1 class="m-0">Reportes</h1>
      </div><!-- /.col -->
      <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
          <li class="breadcrumb-item"><a href="#">Home</a></li>
          <li class="breadcrumb-item active">Dashboard v1</li>
        </ol>
      </div><!-- /.col -->
    </div><!-- /.row -->
  </div><!-- /.container-fluid -->
</div>
<!-- /.content-header -->

<!-- Main content -->
<section class="content">
  <div class="container-fluid">
            <div class="row">
              <div class="col-12">
    
                <div class="card">
                 
                  <!-- /.card-header -->
                  <div class="card-body">
                    
             <h2>Reportes Funeraria</h2>
             <div class="form-group">
                 <label>Selecione Reporte</label>
                 <select class="form-control" name="reporte" id="reporte" required>
                     <option selected value="0">Items</option>
                     <option  value="0">Usuarios</option>
                     <option  value="0">Pagos</option>
                     <option  value="0">Roles</option>
                     <option  value="0">Sucursales</option>
                   
                     <option  value="0">Servicios</option>
                     <option  value="0">Paquetes</option>
                     <option  value="0">Comisiones</option>
                     <option  value="0">Contratos</option>
                    
                 </select>
               </div>
                    <table id="reportes" class="table table-bordered table-striped">
                      <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Codigo</th>
                        <th>Descripcion(s)</th>
                        <th>Precio</th>
                      
                      </tr>
                      </thead>
                      <tbody>
                      <tr>
                        <td>Trident</td>
                        <td>Internet
                          Explorer 4.0
                        </td>
                        <td>Win 95+</td>
                        <td> 4</td>
                       
                      </tr>             
                    
                      </tbody>
                      <tfoot>
                      <tr>
                        <th>Rendering engine</th>
                        <th>Browser</th>
                        <th>Platform(s)</th>
                        <th>Engine version</th>
                       
                      </tr>
                      </tfoot>
                    </table>
                  </div>
                  <!-- /.card-body -->
                </div>
                <!-- /.card -->
              </div>
              <!-- /.col -->
            </div>
            <!-- /.row -->
        <!-- /.content -->
      </div>
      <!-- /.content-wrapper -->    



    
    
  </div><!-- /.container-fluid -->
</section>
<!-- /.content -->
@endsection
@section('page-level-script')

<!-- DataTables  & Plugins -->
<script src="{{ asset('plugins/datatables/jquery.dataTables.min.js')}}"></script>
<script src="{{ asset('plugins/datatables-bs4/js/dataTables.bootstrap4.min.js')}}"></script>
<script src="{{ asset('plugins/datatables-responsive/js/dataTables.responsive.min.js')}}"></script>
<script src="{{ asset('plugins/datatables-responsive/js/responsive.bootstrap4.min.js')}}"></script>
<script src="{{ asset('plugins/datatables-buttons/js/dataTables.buttons.min.js')}}"></script>
<script src="{{ asset('plugins/datatables-buttons/js/buttons.bootstrap4.min.js')}}"></script>
<script src="{{ asset('plugins/jszip/jszip.min.js')}}"></script>
<script src="{{ asset('plugins/pdfmake/pdfmake.min.js')}}"></script>
<script src="{{ asset('plugins/pdfmake/vfs_fonts.js')}}"></script>
<script src="{{ asset('plugins/datatables-buttons/js/buttons.html5.min.js')}}"></script>
<script src="{{ asset('plugins/datatables-buttons/js/buttons.print.min.js')}}"></script>
<script src="{{ asset('plugins/datatables-buttons/js/buttons.colVis.min.js')}}"></script>

<script src="{{ asset('dist/js/funeraria/reportes.js')}}"></script>

    <script type="text/javascript">
$(function () {
  $('#reportes').append('<caption style="caption-side: bottom">A fictional company\'s staff table.</caption>');

    $("#reportes").DataTable({
      "responsive": true, "lengthChange": false, "autoWidth": false,
      "buttons": [
        {
            extend: 'copy',
            text: "Copiar", //Título del botón
        },
       "csv",
       {
            extend: 'excel',
            messageTop: 'The information in this table is copyright to Sirius Cybernetics Corp.',
            title: 'Reporte Funeraria'
        }, 
        {
            extend: 'pdf',
            text: "Export PDF", //Título del botón
            messageTop: 'Direccion: Av. San Pedro Hospital Frances        Celular : 700-111-11 //n s',
            messageBottom: null,
            title: 'Reporte Funeraria'
        }, 
        {
            extend: 'print',
            text: "Imprimir",
            title: 'Reporte Funeraria',
            messageTop: function () {
                printCounter++;
                return 'Reporte realizado por el Sistema de la Funeraria SAN PEDRO COTOCA.';
                /*if ( printCounter === 1 ) {
                    return 'Reporte realizado por el Sistema de la Funeraria SAN PEDRO COTOCA.';
                }
                else {
                    return 'Ya Imprimiste el documento '+printCounter+' veces';
                }*/
            },
            messageBottom: null
        }, 
         {
            extend: 'colvis',
            text: "Columnas"
        }
      ]
    }).buttons().container().appendTo('#reportes_wrapper .col-md-6:eq(0)');
    
  });
    </script>
@endsection