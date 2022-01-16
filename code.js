var selectedpiece = {
  'id': undefined,
  'type': undefined,
  'color': undefined,
  'takeables': []
};
var whiteKing = 5
var blackKing = 61
var turn = 'w'
const path = './pieces/'
const wrook = path + 'chess_11.png'
const wknight = path + 'chess_10.png'
const wbishop = path + 'chess_07.png'
const wqueen = path + 'chess_08.png'
const wking = path + 'chess_09.png'
const wpawn = path + 'chess_06.png'
const brook = path + 'chess_05.png'
const bknight = path + 'chess_04.png'
const bbishop = path + 'chess_01.png'
const bqueen = path + 'chess_02.png'
const bking = path + 'chess_03.png'
const bpawn = path + 'chess_00.png'
$('#1').addClass("wrook")
$('#2').addClass("wknight")
$('#3').addClass("wbishop")
$('#4').addClass("wqueen")
$('#5').addClass("wking")
$('#6').addClass("wbishop")
$('#7').addClass("wknight")
$('#8').addClass("wrook")
for (let a = 1; a <= 8; a++) {
  $('#' + (a + 8)).addClass("wpawn")
  $('#' + (a + 48)).addClass("bpawn")
}
$('#57').addClass("brook")
$('#58').addClass("bknight")
$('#59').addClass("bbishop")
$('#60').addClass("bqueen")
$('#61').addClass("bking")
$('#62').addClass("bbishop")
$('#63').addClass("bknight")
$('#64').addClass("brook")

function drawBoard(callMain) {
  if(turn == 'w') $('#result').html("It's White's turn!")
  if(turn == 'b') $('#result').html("It's Black's turn!")
  let lane = 1;
  for (let i = 1; i <= 64; i++) {
    if (lane % 2 == 0 && i % 2 == 1) $('#' + i).css('background-color', '#555')
    else if (lane % 2 == 1 && i % 2 == 0) $('#' + i).css('background-color', '#555')
    else $('#' + i).css('background-color', '#333')
    if (i % 8 == 0) {
      if (lane == 1) lane = 2;
      else if (lane == 2) lane = 1;
    }
    removePieceImage(i + "i")
    appendPieceImage(($('#' + i).attr('class')).slice(11), i, i + "i") 
  }
}
drawBoard()

$('.chessboard').click(function() {
  drawBoard()
  let pieceType = ($(this).attr('class')).slice(12);
  let pieceColor = ($(this).attr('class')).slice(11, 12);
  let id = parseInt(this.id);
  let row = Math.floor((id + 7) / 8);
  let column = id % 8;
  logic(pieceType, pieceColor, id, row, column)
})

function logic(pieceType, pieceColor, id, row, column) {
	if(whiteKing == 'dead' || blackKing == 'dead') return;
  let takeables = []
  let check = ''
  for (let i = 1; i <= 64; i++) {
    let apieceType = ($(`#${i}`).attr('class')).slice(12);
    let apieceColor = ($(`#${i}`).attr('class')).slice(11, 12);
    var res = checkForCheck(apieceType, i, apieceColor)
    for (let i = 0; i <= res.length; i++) {
    	if(res[i-1] != undefined) takeables.push(res[i-1])
    }
  }
  if (takeables.includes(whiteKing)) check = 'White';
  if (takeables.includes(blackKing)) check = 'Black'; 
  if(check != '') {
  	$('#result').append('<br>' + check + '\'s king is in check!')
  }
  if ((selectedpiece.takeables).includes(id) == true) {
    if (turn == 'w') turn = 'b';
    else if (turn == 'b') turn = 'w';
    if(pieceType == 'king')
    if(pieceColor == 'b') {
    	$('#result').html('White won!')
      whiteKing = 'dead'
    }
    if(pieceColor == 'w') {
    	$('#result').html('Black won!')
      blackKing = 'dead'
    }
    $('#' + id).addClass(selectedpiece.color + selectedpiece.type)
    $('#' + id).removeClass(pieceColor + pieceType)
    $('#' + selectedpiece.id).removeClass(selectedpiece.color + selectedpiece.type)
    drawBoard()
    if (selectedpiece.type == 'king') {
      if (selectedpiece.color == 'w') whiteKing = id;
      else if (selectedpiece.color == 'b') blackKing = id;
    }
    selectedpiece = {
      'id': undefined,
      'type': undefined,
      'color': undefined,
      'takeables': []
    };
		takeables = []
    check = ''
    for (let i = 1; i <= 64; i++) {
      let apieceType = ($(`#${i}`).attr('class')).slice(12);
      let apieceColor = ($(`#${i}`).attr('class')).slice(11, 12);
      let res = checkForCheck(apieceType, i, apieceColor)
      for (let i = 0; i <= res.length; i++) {
        if(res[i-1] != undefined) takeables.push(res[i-1])
      }
    }
    if (takeables.includes(whiteKing)) check = 'White';
    if (takeables.includes(blackKing)) check = 'Black'; 
    if(check != '') {
      $('#result').append('<br>' + check + '\'s king is in check!')
    }
    return;
  }
  if (pieceColor != turn) return;
  selectedpiece = {
    'id': id,
    'type': pieceType,
    'color': pieceColor,
    'takeables': []
  };
  if (pieceType != '') placeHighlights(id, '#777')

  //pawn highlighting
  if (pieceType == 'pawn') {
    if (pieceColor == 'b') {
      if (id - 8 <= 0) return;
      if (($('#' + (id - 8)).attr('class')).slice(12) == '') {
        placeHighlights((id - 8), '#885')
        if (id - 16 <= 0) return;
        if (($('#' + (id - 16)).attr('class')).slice(12) == '') {
          placeHighlights((id - 16), '#885')
        }
      }
      if (id - 9 > 0) {
        if (($('#' + (id - 9)).attr('class')).slice(11, 12) == 'w') {
          placeHighlights(id - 9, '#855')
        }
      }

      if (id - 7 > 0) {
        if (($('#' + (id - 7)).attr('class')).slice(11, 12) == 'w') {
          placeHighlights(id - 7, '#855')
        }
      }

    }
    if (pieceColor == 'w') {
      if (id + 8 > 64) return;
      if (($('#' + (id + 8)).attr('class')).slice(12) == '') {
        placeHighlights((id + 8), '#885')
        if (id + 16 > 64) return;
        if (($('#' + (id + 16)).attr('class')).slice(12) == '') {
          placeHighlights((id + 16), '#885')
        }
      }
      if (id + 9 <= 64) {
        if (($('#' + (id + 9)).attr('class')).slice(11, 12) == 'b') {
          placeHighlights(id + 9, '#855')
        }
      }

      if (id + 7 <= 64) {
        if (($('#' + (id + 7)).attr('class')).slice(11, 12) == 'b') {
          placeHighlights(id + 7, '#855')
        }
      }
    }
  }
  //knight highlighting
  if (pieceType == 'knight') {
    let knight = [6, 10, 15, 17]
    let krows = [1, 1, 2, 2]
    knight.forEach(function(i) {
      if (Math.floor((id + 7 + i) / 8) == row + krows[knight.indexOf(i)] && id + i <= 64) {
        if (($('#' + (id + i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          placeHighlights((id + i), '#855')
        }
        if (($('#' + (id + i)).attr('class')).slice(12) == '') {
          placeHighlights((id + i), '#885')
        }
      }
      if (Math.floor((id + 7 - i) / 8) == row - krows[knight.indexOf(i)] && id - i > 0) {
        if (($('#' + (id - i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id - i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          placeHighlights((id - i), '#855')
        }
        if (($('#' + (id - i)).attr('class')).slice(12) == '') {
          placeHighlights((id - i), '#885')
        }
      }
    })
  }

  //bishop highlighting
  if (pieceType == 'bishop' || pieceType == 'queen') {
    for (let a = 1; a < 8; a++) {
      let i = a * 9
      if (id + i <= 64 && Math.floor((id + 7 + i) / 8) == row + a) {
        if (($('#' + (id + i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          placeHighlights((id + i), '#855')
          break;
        }
        if (($('#' + (id + i)).attr('class')).slice(12) == '') {
          placeHighlights((id + i), '#885')
        } else break;
      }
    }
    for (let a = 1; a < 8; a++) {
      let i = a * 9
      if (id - i > 0 && Math.floor((id + 7 - i) / 8) == row - a) {
        if (($('#' + (id - i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id - i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          placeHighlights((id - i), '#855')
          break;
        }
        if (($('#' + (id - i)).attr('class')).slice(12) == '') {
          placeHighlights((id - i), '#885')
        } else break;
      }
    }

    for (let a = 1; a < 8; a++) {
      let i = a * 7
      if (id + i <= 64 && Math.floor((id + 7 + i) / 8) == row + a) {
        if (($('#' + (id + i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          placeHighlights((id + i), '#855')
          break;
        }
        if (($('#' + (id + i)).attr('class')).slice(12) == '') {
          placeHighlights((id + i), '#885')
        } else break;
      }
    }
    for (let a = 1; a < 8; a++) {
      let i = a * 7
      if (id - i > 0 && Math.floor((id + 7 - i) / 8) == row - a) {
        if (($('#' + (id - i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id - i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          placeHighlights((id - i), '#855')
          break;
        }
        if (($('#' + (id - i)).attr('class')).slice(12) == '') {
          placeHighlights((id - i), '#885')
        } else break;
      }
    }
  }

  //rook highlighting
  if (pieceType == 'rook' || pieceType == 'queen') {
    //right
    for (let i = 1; i <= 7; i++) {
      if (Math.floor((id + 7 + i) / 8) != row) break;
      if (id + i > 64) break;
      if (($('#' + (id + i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
        placeHighlights((id + i), '#855')
        break;
      }
      if (($('#' + (id + i)).attr('class')).slice(12) == '') {
        placeHighlights((id + i), '#885')
      } else break;
    }
    //left
    for (let i = 1; i <= 7; i++) {
      if (Math.floor((id + 7 - i) / 8) != row) break;
      if (id - i <= 0) break;
      if (($('#' + (id - i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id - i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
        placeHighlights((id - i), '#855')
        break;
      }
      if (($('#' + (id - i)).attr('class')).slice(12) == '' && Math.floor((id + 7 - i) / 8) == row) {
        placeHighlights((id - i), '#885')
      } else break;
    }
    //down
    for (let a = 1; a <= 7; a++) {
      let b = a * 8
      if (id + b > 64) break;
      if (($('#' + (id + b)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + b)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
        placeHighlights((id + b), '#855')
        break;
      }
      if (($('#' + (id + b)).attr('class')).slice(12) == '') {
        placeHighlights((id + b), '#885')
      } else break;
    }
    //up
    for (let a = 1; a <= 7; a++) {
      let b = a * 8
      if (id - b <= 0) break;
      if (($('#' + (id - b)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id - b)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
        placeHighlights((id - b), '#855')
        break;
      }
      if (($('#' + (id - b)).attr('class')).slice(12) == '') {
        placeHighlights((id - b), '#885')
      } else break;
    }
  }

  //king highlighting
  if (pieceType == 'king' || pieceType == 'queen') {
    let king = [-9, -8, -7, -1, 1, 7, 8, 9]
    king.forEach(function(i) {
      if (id + i <= 0 || id + i > 64) return;
      if (i < -5 && Math.floor((id + 7 + i) / 8) != row - 1) return;
      if (i == -1 || i == 1)
        if (Math.floor((id + 7 + i) / 8) != row) return;
      if (i > 5 && Math.floor((id + 7 + i) / 8) != row + 1) return
      if (($('#' + (id + i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
        placeHighlights((id + i), '#855')
      } else if (($('#' + (id + i)).attr('class')).slice(12) == '') {
        placeHighlights((id + i), '#885')
      } else return;
    })
  }
}


function checkForCheck(pieceType, id, pieceColor) {
  let row = Math.floor((id + 7) / 8);
  let column = id % 8
  let res = []


  //pawn highlighting
  if (pieceType == 'pawn') {
    if (pieceColor == 'b') {
      if (id - 9 > 0) {
        if (($('#' + (id - 9)).attr('class')).slice(12) != '' && Math.floor((id - 2) / 8) == row - 1) {
          res.push(id - 9)
        }
      }
      if (id - 7 > 0) {
        if (($('#' + (id - 7)).attr('class')).slice(12) != '' && Math.floor((id) / 8) == row - 1) {
          res.push(id - 7)
        }
      }
    }
    if (pieceColor == 'w') {
      if (id + 9 <= 64) {
        if (($('#' + (id + 9)).attr('class')).slice(12) != '' && Math.floor((id + 16) / 8) == row + 1) {
          res.push(id + 9)
        }
      }
      if (id + 7 <= 64) {
        if (($('#' + (id + 7)).attr('class')).slice(12) != '' && Math.floor((id + 14) / 8) == row + 1) {
          res.push(id + 7)
        }
      }
    }
  }
  //knight highlighting
  if (pieceType == 'knight') {
    let knight = [6, 10, 15, 17]
    let krows = [1, 1, 2, 2]
    knight.forEach(function(i) {
      if (Math.floor((id + 7 + i) / 8) == row + krows[knight.indexOf(i)] && id + i <= 64) {
        if (($('#' + (id + i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          res.push(id + i)
        }
      } else if (Math.floor((id + 7 - i) / 8) == row - krows[knight.indexOf(i)] && id - i > 0) {
        if (($('#' + (id - i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id - i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          res.push(id - i)
        }
      }
    })
  }
  //bishop highlighting
  if (pieceType == 'bishop' || pieceType == 'queen') {
    for (let a = 1; a < 8; a++) {
      let i = a * 9
      if (id + i <= 64 && Math.floor((id + 7 + i) / 8) == row + a) {
        if (($('#' + (id + i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          res.push(id + i)
          break;
        } //else break;
      }
    }
    for (let a = 1; a < 8; a++) {
      let i = a * 9
      if (id - i > 0 && Math.floor((id + 7 - i) / 8) == row - a) {
        if (($('#' + (id - i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id - i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          res.push(id - i)
          break;
        } //else break;
      }
    }

    for (let a = 1; a < 8; a++) {
      let i = a * 7
      if (id + i <= 64 && Math.floor((id + 7 + i) / 8) == row + a) {
        if (($('#' + (id + i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          res.push(id + i)
          break;
        } //else break;
      }
    }
    for (let a = 1; a < 8; a++) {
      let i = a * 7
      if (id - i > 0 && Math.floor((id + 7 - i) / 8) == row - a) {
        if (($('#' + (id - i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id - i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
          res.push(id - i)
          break;
        } //else break;
      }
    }
  }
  //rook highlighting
  if (pieceType == 'rook' || pieceType == 'queen') {
    //right
    for (let i = 1; i <= 7; i++) {
      if (Math.floor((id + 7 + i) / 8) != row) break;
      if (id + i > 64) break;
      if (($('#' + (id + i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
        res.push(id + i)
      }
      break;
    }
    //left
    for (let i = 1; i <= 7; i++) {
      if (Math.floor((id + 7 - i) / 8) != row) break;
      if (id - i <= 0) break;
      if (($('#' + (id - i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id - i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
        res.push(id - i)
      }
      break;
    }
    //down
    for (let a = 1; a <= 7; a++) {
      let b = a * 8
      if (id + b > 64) break;
      if (($('#' + (id + b)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + b)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
        res.push(id + b)
      }
      break;
    }
    //up
    for (let a = 1; a <= 7; a++) {
      let b = a * 8
      if (id - b <= 0) break;
      if (($('#' + (id - b)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id - b)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
        res.push(id - b)
      }
      break;
    }
  }

  //king highlighting
  if (pieceType == 'king' || pieceType == 'queen') {
    let king = [-9, -8, -7, -1, 1, 7, 8, 9]
    king.forEach(function(i) {
      if (id + i <= 0 || id + i > 64) return;
      if (i < -5 && Math.floor((id + 7 + i) / 8) != row - 1) return;
      if (i == -1 || i == 1)
        if (Math.floor((id + 7 + i) / 8) != row) return;
      if (i > 5 && Math.floor((id + 7 + i) / 8) != row + 1) return
      if (($('#' + (id + i)).attr('class')).slice(11, 12) == 'w' && pieceColor == 'b' || ($('#' + (id + i)).attr('class')).slice(11, 12) == 'b' && pieceColor == 'w') {
        res.push(id + i)
      } else return;
    })
  }

  return res;
}

function placeHighlights(id, color) {
  if (color != '#777') {
    selectedpiece.takeables.push(id);
  }
  if (color == '#885' && $('#' + id).css('background-color') == 'rgb(85, 85, 85)') {
    $('#' + id).css('background-color', '#996')
  }
  if (color == '#885' && $('#' + id).css('background-color') == 'rgb(51, 51, 51)') {
    $('#' + id).css('background-color', '#774')
  } else $('#' + id).css('background-color', color)
  selectedpiece.takeables.sort(function(a, b) {
    return a - b
  })
}

$('#reset').click(function() {
  for (let i = 1; i <= 64; i++) {
  	removePieceImage(i + "i")
    appendPieceImage(($('#' + i).attr('class')).slice(11), i, i + "i")
    $('#'+i).removeClass(($('#'+i).attr('class')).slice(11,12)+($('#'+i).attr('class')).slice(12))
  }
  $('#1').addClass("wrook")
  $('#2').addClass("wknight")
  $('#3').addClass("wbishop")
  $('#4').addClass("wqueen")
  $('#5').addClass("wking")
  $('#6').addClass("wbishop")
  $('#7').addClass("wknight")
  $('#8').addClass("wrook")
  for(let a = 1; a <= 8; a++) {
    $('#' + (a+8)).addClass("wpawn")
     $('#' + (a+48)).addClass("bpawn")
  }
  $('#57').addClass("brook")
  $('#58').addClass("bknight")
  $('#59').addClass("bbishop")
  $('#60').addClass("bqueen")
  $('#61').addClass("bking")
  $('#62').addClass("bbishop")
  $('#63').addClass("bknight")
  $('#64').addClass("brook")
  drawBoard()
})


//https://stackoverflow.com/a/37819523/17670831
function appendPieceImage(imageSource, containerId, imageId) {

  if (imageSource == 'wrook') imageSource = wrook
  if (imageSource == 'wknight') imageSource = wknight
  if (imageSource == 'wbishop') imageSource = wbishop
  if (imageSource == 'wqueen') imageSource = wqueen
  if (imageSource == 'wking') imageSource = wking
  if (imageSource == 'wpawn') imageSource = wpawn
  if (imageSource == 'brook') imageSource = brook
  if (imageSource == 'bknight') imageSource = bknight
  if (imageSource == 'bbishop') imageSource = bbishop
  if (imageSource == 'bqueen') imageSource = bqueen
  if (imageSource == 'bking') imageSource = bking
  if (imageSource == 'bpawn') imageSource = bpawn

  var img = document.createElement("IMG");
  img.src = imageSource;
  img.setAttribute('id', imageId);
  document.getElementById(containerId).appendChild(img);
  return imageId;
}

function removePieceImage(imageId) {
  var elementToBeRemoved = document.getElementById(imageId);
  if (elementToBeRemoved == undefined) return;
  elementToBeRemoved.parentElement.removeChild(elementToBeRemoved);
}
