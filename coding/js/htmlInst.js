  $(document).on('ready', function(){


    $('.checkbox').click (function (){


      var thisCheck = $(this);
      var instr = $(this).parent().attr('id');
      var numIntsr = "<td class='mom'><input type='number' name='quantity' class='numb' value='0' min='0' max='14' id='" + instr + "num' style='float: right;'></td>";
      if (thisCheck.is (':checked')){
        $('#' + instr + ' ').parent().append($(numIntsr));
      }
      else if (thisCheck.attr('checked', false)){
        $('#' + instr + 'num').parent().remove();
      }
    });


    $(document).on('click', '#generateInstr', function(){

      var numsOfInstr = [],
          returnHtml = "<",
          counter = 0;

      $('.checkbox').each(function(){

        if ($(this).attr('id') != 'sx'){
          if($(this).is(':checked')){
            numsOfInstr.push($(this).parent().siblings('.mom').children().val());
            returnHtml += "<a href='' title=" + $(this).siblings('.title').text() + ">" + numsOfInstr[counter] + "</a> . ";
          }
          else{
            numsOfInstr.push('0');
            returnHtml += "<a href='' title=" + $(this).siblings('.title').text() + ">" + numsOfInstr[counter] + "</a> . ";
          }

          console.log($(this).attr('id'));
          if ($(this).attr('id') == 'sx'){
            returnHtml += " / ";
          }
          else if ($(this).attr('id') == 'tb'){
            returnHtml += " / ";
          }
          else if ($(this).attr('id') == 'clst'){
            returnHtml += " / ";
          }
          
          ++counter;
        }
        
      });
      returnHtml += ">";


      document.getElementById('visResult').innerHTML = "<p>" + numsOfInstr + "</p>" + returnHtml;

    });

  });