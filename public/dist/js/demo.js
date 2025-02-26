/**
 * AdminLTE Demo Menu
 * ------------------
 * You should not use this file in production.
 * This file is for demo purposes only.
 */

/* eslint-disable camelcase */

(function ($) {
  'use strict'

  setTimeout(function () {
    if (window.___browserSync___ === undefined && Number(localStorage.getItem('AdminLTE:Demo:MessageShowed')) < Date.now()) {
      localStorage.setItem('AdminLTE:Demo:MessageShowed', (Date.now()) + (15 * 60 * 1000))
      // eslint-disable-next-line no-alert
    //  alert('You load AdminLTE\'s "demo.js", \nthis file is only created for testing purposes!')
    }
  }, 1000)

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  function createSkinBlock(colors, callback, noneSelected) {
    var $block = $('<select />', {
      class: noneSelected ? 'custom-select mb-3 border-0' : 'custom-select mb-3 text-light border-0 ' + colors[0].replace(/accent-|navbar-/, 'bg-')
    })

    if (noneSelected) {
      var $default = $('<option />', {
        text: 'None Selected'
      })

      $block.append($default)
    }

    colors.forEach(function (color) {
      var $color = $('<option />', {
        class: (typeof color === 'object' ? color.join(' ') : color).replace('navbar-', 'bg-').replace('accent-', 'bg-'),
        text: capitalizeFirstLetter((typeof color === 'object' ? color.join(' ') : color).replace(/navbar-|accent-|bg-/, '').replace('-', ' '))
      })

      $block.append($color)
    })
    if (callback) {
      $block.on('change', callback)
    }

    return $block
  }

  var $sidebar = $('.control-sidebar')
  var $container = $('<div />', {
    class: 'p-3 control-sidebar-content'
  })

  $sidebar.append($container)

  // Checkboxes

  $container.append(
    '<h5>Funeraria</h5><hr class="mb-2"/>'
  )

  var $dark_mode_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('dark-mode'),
    class: 'mr-1'
  }).on('click', function () {
    let idOpciones = $('#sideUser').data('opcionid')
    if ($(this).is(':checked')) {
      $('body').addClass('dark-mode')
     let tipo = $("input[name=estilos]:checked").val()
      if(tipo == 1){
        estilosElegidos('niño','dark')
      }else if(tipo == 2){
        estilosElegidos('joven','dark')
      }else if(tipo == 3){
        estilosElegidos('adulto','dark')
      }else{
        let estilo = $('#sideUser').data('estilo')
        if(estilo == 'default'){
          EstiloUser('dark')
        }else{
          estilosElegidos(estilo,'dark')
        }    
        console.log("no hay cheked");
      }
    //  $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-dark-primary elevation-4')
   // EstiloUser('dark')
    
    console.log("opciones : "+ idOpciones)
   // path = path + 'api/visita/'  
   let path = obtenerPath();
   $.get(path+'api/tema/dark/'+idOpciones, function(data) {
    console.log(data);
 }); 
    } else {
      $('body').removeClass('dark-mode')
      //console.log($("input[name=estilos]:checked").val())
      let tipo = $("input[name=estilos]:checked").val()
      if(tipo == 1){
        estilosElegidos('niño','blanco')
      }else if(tipo == 2){
        estilosElegidos('joven','blanco')
      }else if(tipo == 3){
        estilosElegidos('adulto','blanco')
      }else{
        let estilo = $('#sideUser').data('estilo')
        if(estilo == 'default'){
          EstiloUser('light')
        }else{
          estilosElegidos(estilo,'light')
        }    
       // EstiloUser('light')
      }
    //$('#nav_Izq').removeClass().addClass('main-sidebar sidebar-light-primary elevation-4')
   //   EstiloUser('light')
   let path = obtenerPath();
   $.get(path+'api/tema/light/'+idOpciones, function(data) {
    console.log(data);
 }); 
    }
  })
  var $dark_mode_container = $('<div />', { class: 'mb-4' }).append($dark_mode_checkbox).append('<span>Modo Noche</span>')
  $container.append($dark_mode_container)


///////////////yop//////////////////////////////////////////////

VerificarOpcionesEstilos();


function VerificarOpcionesEstilos(){
  let idOpciones = $('#sideUser').data('opcionid')
  let tema = $('#sideUser').data('tema')
  let estilo = $('#sideUser').data('estilo')

  $('body').addClass('layout-navbar-fixed')
 

  if(tema == 'default' && estilo == 'default'){
    VerficarHora()
  }else if(tema == 'default' && estilo != 'default') {

 //sabemos que es niño joven o adulto
  let buscarTema = VerficarHoraOpcion();
  estilosElegidos(estilo,buscarTema);

  }else if(tema != 'default' && estilo == 'default'){
    //sabemos que tema es 
    if(tema == 'dark'){
      $('body').addClass('dark-mode')
    }else{
      $('body').removeClass('dark-mode')
    }
    EstiloUser(tema)
  }else{
    if(tema == 'dark'){
      $('body').addClass('dark-mode')
    }else{
      $('body').removeClass('dark-mode')
    }
    estilosElegidos(estilo,tema);
  }
}


/////////////***************Hora User****************************////////////////////////////
function VerficarHora(){
  var ahora=new Date();
 var  hora=ahora.getHours();
 let horario ="";
  if(hora<6){
    horario = "madrugada";
    $('body').addClass('dark-mode')
    EstiloUser('dark')
  }else if(hora>17 && hora<24)
  {
    horario = "noche";
    $('body').addClass('dark-mode')
    EstiloUser('dark')
  }else{
    horario = "dia";
    $('body').removeClass('dark-mode')
    EstiloUser('light')
   
  }
  console.log(horario + hora)
}

function VerficarHoraOpcion(){
  var ahora=new Date();
 var  hora=ahora.getHours();
 let horario ="";
  if(hora<6){
    horario = "madrugada";
    $('body').addClass('dark-mode')
   return 'dark';
  }else if(hora>17 && hora<24)
  {
    horario = "noche";
    $('body').addClass('dark-mode')
   return 'dark';
  }else{
    horario = "dia";
    $('body').removeClass('dark-mode')
    return 'light';
   
  }
  //console.log(horario + hora)
}


/////////////***************Estilo User ****************************////////////////////////////
function EstiloUser(tema){
  var fechauser = $('#sideUser').data("fecha")
  //var fechauserpart = fechauser.split('-')
  //console.log(fechauser);
  var fechauser = fechauser.replaceAll('-','/')
  
  //fechauser =fechauserpart[2] + "/" + fechauserpart[1] + "/" +fechauserpart[0];
  var fechaDeNacimiento = new Date(fechauser);
  console.log(fechaDeNacimiento)
  var hoy = new Date();
  var edad = parseInt((hoy - fechaDeNacimiento) / (1000*60*60*24*365));
  if(edad < 18){
    $('body').removeClass('text-mayor').addClass('text-normal')
    console.log("es una wawa");
    //$(".nav-link active").text();
    if(tema == 'dark'){
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-dark-teal elevation-4 bg-teal' )
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-dark bg-teal')
      $('.nav-link ').addClass('blanco' )
      $('#sideUser').removeClass().addClass('d-block blanco')
    }else{
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-light-teal elevation-4 bg-teal')
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-light bg-teal')
      $('.nav-link ').removeClass('blanco')
      $('#sideUser').removeClass().addClass('d-block')
    }
    $('#logo_funeraria').removeClass().addClass('brand-link bg-teal')
  }else if( edad >59){
    console.log("ya ta pasao")
    $('body').removeClass('text-normal').addClass('text-mayor')
    if(tema == 'dark'){
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-dark-maroon elevation-4 bg-maroon')
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-dark bg-maroon')
      $('.nav-link ').removeClass('negro')
      $('#sideUser').removeClass().addClass('d-block text-normal')
    }else{
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-light-maroon elevation-4 bg-maroon')
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-light bg-maroon')
      $('.nav-link').addClass('negro' )
      $('.nav-link.active').removeClass('negro').addClass('blanco' )
      $('#sideUser').removeClass().addClass('d-block negro text-normal')
    }
    $('#logo_funeraria').removeClass().addClass('brand-link bg-maroon')
  }else{
    console.log("años dorados")
    $('body').removeClass('text-mayor').addClass('text-normal')
    if(tema == 'dark'){
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-dark-primary elevation-4 bg-primary')
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-dark bg-primary')
    }else{
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-light-primary elevation-4 bg-primary')
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-light bg-primary')
    }
    $('#logo_funeraria').removeClass().addClass('brand-link bg-primary')
  }

}

function estilosElegidos(tipo,tema){

  if(tipo == 'niño'){
    $('body').removeClass('text-mayor').addClass('text-normal')
    console.log("es una wawa");
    //$(".nav-link active").text();
    if(tema == 'dark'){
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-dark-teal elevation-4 bg-teal' )
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-dark bg-teal')
      $('.nav-link ').addClass('blanco' )
      $('.nav-link.active').removeClass('blanco').addClass('negro' )
      $('#sideUser').removeClass().addClass('d-block blanco')
    }else{
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-light-teal elevation-4 bg-teal')
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-light bg-teal')
      $('.nav-link ').removeClass('blanco')
      $('.nav-link.active').removeClass('blanco').addClass('negro' )
      $('#sideUser').removeClass().addClass('d-block')
    }
    $('#logo_funeraria').removeClass().addClass('brand-link bg-teal')
  }else if( tipo == 'adulto'){
    console.log("ya ta pasao")
    //$('body').addClass('text-mayor')
    $('body').removeClass('text-normal').addClass('text-mayor')
    if(tema == 'dark'){
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-dark-maroon elevation-4 bg-maroon')
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-dark bg-maroon')
      $('.nav-link ').removeClass('negro')
      $('.nav-link.active').removeClass('blanco').addClass('negro' )
      $('#sideUser').removeClass().addClass('d-block text-normal')
    }else{
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-light-maroon elevation-4 bg-maroon')
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-light bg-maroon')
      $('.nav-link').addClass('negro' )
      $('.nav-link.active').removeClass('negro').addClass('blanco' )
      $('#sideUser').removeClass().addClass('d-block negro text-normal')
    }
    $('#logo_funeraria').removeClass().addClass('brand-link bg-maroon')
  }else{
    $('body').removeClass('text-mayor').addClass('text-normal')
    console.log("años dorados")
    if(tema == 'dark'){
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-dark-primary elevation-4 bg-primary')
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-dark bg-primary')

    }else{
      $('#nav_Izq').removeClass().addClass('main-sidebar sidebar-light-primary elevation-4 bg-primary')
      $('#navbar_header_user').removeClass().addClass('main-header navbar navbar-expand navbar-white navbar-light bg-primary')
    }
    $('#logo_funeraria').removeClass().addClass('brand-link bg-primary')
  }
}
/////////////***************Visita User ****************************////////////////////////////
contador(); 

function obtenerPath(){
  var pathname = window.location.pathname;
var paths =  pathname.split('/')
var cant = paths.length -1

cant = cant - 5;
var path = '';
for (let index = 0; index < cant; index++) {
  path = path + '../'  
}
return path;
}

function  contador(){
var id = $('#sideUser').data("visita")
var pathname = window.location.pathname;
var paths =  pathname.split('/')
var cant = paths.length -1

cant = cant - 5;
var path = '';
for (let index = 0; index < cant; index++) {
  path = path + '../'  
}
path = path + 'api/visita/'  
console.log("cantida: "+cant)

/*var index = pathname.indexOf('edit');

console.log(pathname);
if(index >= 0) {
  path = '../../api/visita/'
  console.log('tiene edit')
} else {
  path = 'api/visita/'
  console.log('Not tiene edit')
}*/
  $.get(path+id, function(data) {
  console.log(data);
  $('#contador').text(data);
  
});  
 }



  /////////////////////////////>>Header Options////////////////////////////////////////////////

  $container.append('<h6>Estilos</h6>')
  var $header_fixed_checkbox = $('<input />', {
    type: 'radio',
    value: 1,
    name: 'estilos',
    checked: false, //$('body').hasClass('layout-navbar-fixed'),
    class: 'mr-1'
  }).on('click', function () {
    let idOpciones = $('#sideUser').data('opcionid')
    if ($(this).is(':checked')) {
      let all = document.querySelectorAll('.dark-mode');
      if(all.length == 0){
       // console.log('niño blanco');
        estilosElegidos('niño','blanco')
      }else{
        estilosElegidos('niño','dark')
      //  console.log('niño negro');
      }
       let path = obtenerPath();
      $.get(path+'api/estilo/niño/'+idOpciones, function(data) {
        console.log(data);
    //    return process(data);
     });  
    }
  })
  var $header_fixed_container = $('<div />', { class: 'mb-1' }).append($header_fixed_checkbox).append('<span>Niño</span>')
  $container.append($header_fixed_container)

  var $dropdown_legacy_offset_checkbox = $('<input />', {
    type: 'radio',
    value: 2,
    name: 'estilos',
    checked: false, //$('.main-header').hasClass('dropdown-legacy'),
    class: 'mr-1'
  }).on('click', function () {
    let idOpciones = $('#sideUser').data('opcionid')
    if ($(this).is(':checked')) {
      let all = document.querySelectorAll('.dark-mode');
      if(all.length == 0){
       // console.log('joven blanco');
        estilosElegidos('joven','blanco')
      }else{
        estilosElegidos('joven','dark')
       // console.log('joven negro');
      }
       let path = obtenerPath();
      $.get(path+'api/estilo/joven/'+idOpciones, function(data) {
        console.log(data);
    //    return process(data);
     }); 
    } 
  })
  var $dropdown_legacy_offset_container = $('<div />', { class: 'mb-1' }).append($dropdown_legacy_offset_checkbox).append('<span>Joven</span>')
  $container.append($dropdown_legacy_offset_container)

  var $no_border_checkbox = $('<input />', {
    type: 'radio',
    value: 3,
    name: 'estilos',
    checked: false, //$('.main-header').hasClass('border-bottom-0'),
    class: 'mr-1'
  }).on('click', function () {
    let idOpciones = $('#sideUser').data('opcionid')
    if ($(this).is(':checked')) {
      let all = document.querySelectorAll('.dark-mode');
      if(all.length == 0){
      //  console.log('adulto blanco');
        estilosElegidos('adulto','blanco')
      }else{
      //  console.log('adulto negro');
        estilosElegidos('adulto','dark')
      }
       let path = obtenerPath();
      $.get(path+'api/estilo/adulto/'+idOpciones, function(data) {
        console.log(data);
    //    return process(data);
     }); 
    }
  })
  var $no_border_container = $('<div />', { class: 'mb-4' }).append($no_border_checkbox).append('<span>Adulto</span>')
  $container.append($no_border_container)

  /////////////////////////////>>Sidebar Options////////////////////////////////////////////////
  /*
  $container.append('<h6>Sidebar Options</h6>')

  var $sidebar_collapsed_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('sidebar-collapse'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('sidebar-collapse')
      $(window).trigger('resize')
    } else {
      $('body').removeClass('sidebar-collapse')
      $(window).trigger('resize')
    }
  })
  var $sidebar_collapsed_container = $('<div />', { class: 'mb-1' }).append($sidebar_collapsed_checkbox).append('<span>Collapsed</span>')
  $container.append($sidebar_collapsed_container)

  $(document).on('collapsed.lte.pushmenu', '[data-widget="pushmenu"]', function () {
    $sidebar_collapsed_checkbox.prop('checked', true)
  })
  $(document).on('shown.lte.pushmenu', '[data-widget="pushmenu"]', function () {
    $sidebar_collapsed_checkbox.prop('checked', false)
  })

  var $sidebar_fixed_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('layout-fixed'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('layout-fixed')
      $(window).trigger('resize')
    } else {
      $('body').removeClass('layout-fixed')
      $(window).trigger('resize')
    }
  })
  var $sidebar_fixed_container = $('<div />', { class: 'mb-1' }).append($sidebar_fixed_checkbox).append('<span>Fixed</span>')
  $container.append($sidebar_fixed_container)

  var $sidebar_mini_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('sidebar-mini'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('sidebar-mini')
    } else {
      $('body').removeClass('sidebar-mini')
    }
  })
  var $sidebar_mini_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_checkbox).append('<span>Sidebar Mini</span>')
  $container.append($sidebar_mini_container)

  var $sidebar_mini_md_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('sidebar-mini-md'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('sidebar-mini-md')
    } else {
      $('body').removeClass('sidebar-mini-md')
    }
  })
  var $sidebar_mini_md_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_md_checkbox).append('<span>Sidebar Mini MD</span>')
  $container.append($sidebar_mini_md_container)

  var $sidebar_mini_xs_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('sidebar-mini-xs'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('sidebar-mini-xs')
    } else {
      $('body').removeClass('sidebar-mini-xs')
    }
  })
  var $sidebar_mini_xs_container = $('<div />', { class: 'mb-1' }).append($sidebar_mini_xs_checkbox).append('<span>Sidebar Mini XS</span>')
  $container.append($sidebar_mini_xs_container)

  var $flat_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-flat'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-flat')
    } else {
      $('.nav-sidebar').removeClass('nav-flat')
    }
  })
  var $flat_sidebar_container = $('<div />', { class: 'mb-1' }).append($flat_sidebar_checkbox).append('<span>Nav Flat Style</span>')
  $container.append($flat_sidebar_container)

  var $legacy_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-legacy'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-legacy')
    } else {
      $('.nav-sidebar').removeClass('nav-legacy')
    }
  })
  var $legacy_sidebar_container = $('<div />', { class: 'mb-1' }).append($legacy_sidebar_checkbox).append('<span>Nav Legacy Style</span>')
  $container.append($legacy_sidebar_container)

  var $compact_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-compact'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-compact')
    } else {
      $('.nav-sidebar').removeClass('nav-compact')
    }
  })
  var $compact_sidebar_container = $('<div />', { class: 'mb-1' }).append($compact_sidebar_checkbox).append('<span>Nav Compact</span>')
  $container.append($compact_sidebar_container)

  var $child_indent_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-child-indent'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-child-indent')
    } else {
      $('.nav-sidebar').removeClass('nav-child-indent')
    }
  })
  var $child_indent_sidebar_container = $('<div />', { class: 'mb-1' }).append($child_indent_sidebar_checkbox).append('<span>Nav Child Indent</span>')
  $container.append($child_indent_sidebar_container)

  var $child_hide_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('nav-collapse-hide-child'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('nav-collapse-hide-child')
    } else {
      $('.nav-sidebar').removeClass('nav-collapse-hide-child')
    }
  })
  var $child_hide_sidebar_container = $('<div />', { class: 'mb-1' }).append($child_hide_sidebar_checkbox).append('<span>Nav Child Hide on Collapse</span>')
  $container.append($child_hide_sidebar_container)

  var $no_expand_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-sidebar').hasClass('sidebar-no-expand'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-sidebar').addClass('sidebar-no-expand')
    } else {
      $('.main-sidebar').removeClass('sidebar-no-expand')
    }
  })
  var $no_expand_sidebar_container = $('<div />', { class: 'mb-4' }).append($no_expand_sidebar_checkbox).append('<span>Disable Hover/Focus Auto-Expand</span>')
  $container.append($no_expand_sidebar_container)

  /////////////////////////////>>Footer Options////////////////////////////////////////////////

  $container.append('<h6>Footer Options</h6>')
  var $footer_fixed_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('layout-footer-fixed'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('layout-footer-fixed')
    } else {
      $('body').removeClass('layout-footer-fixed')
    }
  })
  var $footer_fixed_container = $('<div />', { class: 'mb-4' }).append($footer_fixed_checkbox).append('<span>Fixed</span>')
  $container.append($footer_fixed_container)


/////////////////////////////>Small Text Options////////////////////////////////////////////////
  
  $container.append('<h6>Small Text Options</h6>')

  var $text_sm_body_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('body').hasClass('text-sm'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('body').addClass('text-sm')
    } else {
      $('body').removeClass('text-sm')
    }
  })
  var $text_sm_body_container = $('<div />', { class: 'mb-1' }).append($text_sm_body_checkbox).append('<span>Body</span>')
  $container.append($text_sm_body_container)

  var $text_sm_header_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-header').hasClass('text-sm'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-header').addClass('text-sm')
    } else {
      $('.main-header').removeClass('text-sm')
    }
  })
  var $text_sm_header_container = $('<div />', { class: 'mb-1' }).append($text_sm_header_checkbox).append('<span>Navbar</span>')
  $container.append($text_sm_header_container)

  var $text_sm_brand_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.brand-link').hasClass('text-sm'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.brand-link').addClass('text-sm')
    } else {
      $('.brand-link').removeClass('text-sm')
    }
  })
  var $text_sm_brand_container = $('<div />', { class: 'mb-1' }).append($text_sm_brand_checkbox).append('<span>Brand</span>')
  $container.append($text_sm_brand_container)

  var $text_sm_sidebar_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.nav-sidebar').hasClass('text-sm'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.nav-sidebar').addClass('text-sm')
    } else {
      $('.nav-sidebar').removeClass('text-sm')
    }
  })
  var $text_sm_sidebar_container = $('<div />', { class: 'mb-1' }).append($text_sm_sidebar_checkbox).append('<span>Sidebar Nav</span>')
  $container.append($text_sm_sidebar_container)

  var $text_sm_footer_checkbox = $('<input />', {
    type: 'checkbox',
    value: 1,
    checked: $('.main-footer').hasClass('text-sm'),
    class: 'mr-1'
  }).on('click', function () {
    if ($(this).is(':checked')) {
      $('.main-footer').addClass('text-sm')
    } else {
      $('.main-footer').removeClass('text-sm')
    }
  })
  var $text_sm_footer_container = $('<div />', { class: 'mb-4' }).append($text_sm_footer_checkbox).append('<span>Footer</span>')
  $container.append($text_sm_footer_container)

  // Color Arrays

  var navbar_dark_skins = [
    'navbar-primary',
    'navbar-secondary',
    'navbar-info',
    'navbar-success',
    'navbar-danger',
    'navbar-indigo',
    'navbar-purple',
    'navbar-pink',
    'navbar-navy',
    'navbar-lightblue',
    'navbar-teal',
    'navbar-cyan',
    'navbar-dark',
    'navbar-gray-dark',
    'navbar-gray'
  ]

  var navbar_light_skins = [
    'navbar-light',
    'navbar-warning',
    'navbar-white',
    'navbar-orange'
  ]

  var sidebar_colors = [
    'bg-primary',
    'bg-warning',
    'bg-info',
    'bg-danger',
    'bg-success',
    'bg-indigo',
    'bg-lightblue',
    'bg-navy',
    'bg-purple',
    'bg-fuchsia',
    'bg-pink',
    'bg-maroon',
    'bg-orange',
    'bg-lime',
    'bg-teal',
    'bg-olive'
  ]

  var accent_colors = [
    'accent-primary',
    'accent-warning',
    'accent-info',
    'accent-danger',
    'accent-success',
    'accent-indigo',
    'accent-lightblue',
    'accent-navy',
    'accent-purple',
    'accent-fuchsia',
    'accent-pink',
    'accent-maroon',
    'accent-orange',
    'accent-lime',
    'accent-teal',
    'accent-olive'
  ]

  var sidebar_skins = [
    'sidebar-dark-primary',
    'sidebar-dark-warning',
    'sidebar-dark-info',
    'sidebar-dark-danger',
    'sidebar-dark-success',
    'sidebar-dark-indigo',
    'sidebar-dark-lightblue',
    'sidebar-dark-navy',
    'sidebar-dark-purple',
    'sidebar-dark-fuchsia',
    'sidebar-dark-pink',
    'sidebar-dark-maroon',
    'sidebar-dark-orange',
    'sidebar-dark-lime',
    'sidebar-dark-teal',
    'sidebar-dark-olive',
    'sidebar-light-primary',
    'sidebar-light-warning',
    'sidebar-light-info',
    'sidebar-light-danger',
    'sidebar-light-success',
    'sidebar-light-indigo',
    'sidebar-light-lightblue',
    'sidebar-light-navy',
    'sidebar-light-purple',
    'sidebar-light-fuchsia',
    'sidebar-light-pink',
    'sidebar-light-maroon',
    'sidebar-light-orange',
    'sidebar-light-lime',
    'sidebar-light-teal',
    'sidebar-light-olive'
  ]

  // Navbar Variants
/////////////////////////////Navbar Variants////////////////////////////////////////////////
  $container.append('<h6>Navbar Variants</h6>')

  var $navbar_variants = $('<div />', {
    class: 'd-flex'
  })
  var navbar_all_colors = navbar_dark_skins.concat(navbar_light_skins)
  var $navbar_variants_colors = createSkinBlock(navbar_all_colors, function () {
    var color = $(this).find('option:selected').attr('class')
    var $main_header = $('.main-header')
    $main_header.removeClass('navbar-dark').removeClass('navbar-light')
    navbar_all_colors.forEach(function (color) {
      $main_header.removeClass(color)
    })

    $(this).removeClass().addClass('custom-select mb-3 text-light border-0 ')

    if (navbar_dark_skins.indexOf(color) > -1) {
      $main_header.addClass('navbar-dark')
      $(this).addClass(color).addClass('text-light')
    } else {
      $main_header.addClass('navbar-light')
      $(this).addClass(color)
    }

    $main_header.addClass(color)
  })

  var active_navbar_color = null
  $('.main-header')[0].classList.forEach(function (className) {
    if (navbar_all_colors.indexOf(className) > -1 && active_navbar_color === null) {
      active_navbar_color = className.replace('navbar-', 'bg-')
    }
  })

  $navbar_variants_colors.find('option.' + active_navbar_color).prop('selected', true)
  $navbar_variants_colors.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_navbar_color)

  $navbar_variants.append($navbar_variants_colors)

  $container.append($navbar_variants)

  // Sidebar Colors
/////////////////////////////Accent Color  Variants////////////////////////////////////////////////

  $container.append('<h6>Accent Color Variants</h6>')
  var $accent_variants = $('<div />', {
    class: 'd-flex'
  })
  $container.append($accent_variants)
  $container.append(createSkinBlock(accent_colors, function () {
    var color = $(this).find('option:selected').attr('class')
    var $body = $('body')
    accent_colors.forEach(function (skin) {
      $body.removeClass(skin)
    })

    var accent_color_class = color.replace('bg-', 'accent-')

    $body.addClass(accent_color_class)
  }, true))

  var active_accent_color = null
  $('body')[0].classList.forEach(function (className) {
    if (accent_colors.indexOf(className) > -1 && active_accent_color === null) {
      active_accent_color = className.replace('navbar-', 'bg-')
    }
  })

  // $accent_variants.find('option.' + active_accent_color).prop('selected', true)
  // $accent_variants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_accent_color)


/////////////////////////////Dark Sidebar Variants////////////////////////////////////////////////

  $container.append('<h6>Dark Sidebar Variants</h6>')
  var $sidebar_variants_dark = $('<div />', {
    class: 'd-flex'
  })
  $container.append($sidebar_variants_dark)
  var $sidebar_dark_variants = createSkinBlock(sidebar_colors, function () {
    var color = $(this).find('option:selected').attr('class')
    var sidebar_class = 'sidebar-dark-' + color.replace('bg-', '')
    var $sidebar = $('.main-sidebar')
    sidebar_skins.forEach(function (skin) {
     
      $sidebar.removeClass(skin)
      $sidebar_light_variants.removeClass(skin.replace('sidebar-dark-', 'bg-')).removeClass('text-light')
    })
    console.log($(this))
    $(this).removeClass().addClass('custom-select mb-3 text-light border-0').addClass(color)

    $sidebar_light_variants.find('option').prop('selected', false)
    $sidebar.addClass(sidebar_class)
    $('.sidebar').removeClass('os-theme-dark').addClass('os-theme-light')
  }, true)
  $container.append($sidebar_dark_variants)

  var active_sidebar_dark_color = null
  $('.main-sidebar')[0].classList.forEach(function (className) {
    var color = className.replace('sidebar-dark-', 'bg-')
    if (sidebar_colors.indexOf(color) > -1 && active_sidebar_dark_color === null) {
      active_sidebar_dark_color = color
    }
  })

  $sidebar_dark_variants.find('option.' + active_sidebar_dark_color).prop('selected', true)
  $sidebar_dark_variants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_sidebar_dark_color)


/////////////////////////////Light Sidebar Variants////////////////////////////////////////////////

  $container.append('<h6>Light Sidebar Variants</h6>')
  var $sidebar_variants_light = $('<div />', {
    class: 'd-flex'
  })
  $container.append($sidebar_variants_light)
  var $sidebar_light_variants = createSkinBlock(sidebar_colors, function () {
    var color = $(this).find('option:selected').attr('class')
    var sidebar_class = 'sidebar-light-' + color.replace('bg-', '')
    var $sidebar = $('.main-sidebar')
    sidebar_skins.forEach(function (skin) {
      $sidebar.removeClass(skin)
      $sidebar_dark_variants.removeClass(skin.replace('sidebar-light-', 'bg-')).removeClass('text-light')
    })

    $(this).removeClass().addClass('custom-select mb-3 text-light border-0').addClass(color)

    $sidebar_dark_variants.find('option').prop('selected', false)
    $sidebar.addClass(sidebar_class)
    $('.sidebar').removeClass('os-theme-light').addClass('os-theme-dark')
  }, true)
  $container.append($sidebar_light_variants)

  var active_sidebar_light_color = null
  $('.main-sidebar')[0].classList.forEach(function (className) {
    var color = className.replace('sidebar-light-', 'bg-')
    if (sidebar_colors.indexOf(color) > -1 && active_sidebar_light_color === null) {
      active_sidebar_light_color = color
    }
  })

  if (active_sidebar_light_color !== null) {
    $sidebar_light_variants.find('option.' + active_sidebar_light_color).prop('selected', true)
    $sidebar_light_variants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_sidebar_light_color)
  }


  ////////////////////////Brand Logo Variants//////////////////
  var logo_skins = navbar_all_colors
  $container.append('<h6>Brand Logo Variants</h6>')
  var $logo_variants = $('<div />', {
    class: 'd-flex'
  })
  $container.append($logo_variants)
  var $clear_btn = $('<a />', {
    href: '#'
  }).text('clear').on('click', function (e) {
    e.preventDefault()
    var $logo = $('.brand-link')
    logo_skins.forEach(function (skin) {
      $logo.removeClass(skin)
    })
  })

  var $brand_variants = createSkinBlock(logo_skins, function () {
    var color = $(this).find('option:selected').attr('class')
    var $logo = $('.brand-link')

    if (color === 'navbar-light' || color === 'navbar-white') {
      $logo.addClass('text-black')
    } else {
      $logo.removeClass('text-black')
    }

    logo_skins.forEach(function (skin) {
      $logo.removeClass(skin)
    })

    if (color) {
      $(this).removeClass().addClass('custom-select mb-3 border-0').addClass(color).addClass(color !== 'navbar-light' && color !== 'navbar-white' ? 'text-light' : '')
    } else {
      $(this).removeClass().addClass('custom-select mb-3 border-0')
    }

    $logo.addClass(color)
  }, true).append($clear_btn)
  $container.append($brand_variants)

  var active_brand_color = null
  $('.brand-link')[0].classList.forEach(function (className) {
    if (logo_skins.indexOf(className) > -1 && active_brand_color === null) {
      active_brand_color = className.replace('navbar-', 'bg-')
    }
  })

  if (active_brand_color) {
    $brand_variants.find('option.' + active_brand_color).prop('selected', true)
    $brand_variants.removeClass().addClass('custom-select mb-3 text-light border-0 ').addClass(active_brand_color)
  }

*/


})(jQuery)
