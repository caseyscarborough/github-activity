$(document).ready ->
  $('a').attr('target','_blank')
  $('.loading').spin({ lines: 13, length: 25, width: 6, radius: 18, color: '#495961', speed: 0.8, top: '30%' })

$(window).load ->
  $('.loading').hide()
  $('.wrapper').show()