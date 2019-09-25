var genFinished
let cells;
var kolom, baris, button;
var w = 50;
var current;
var stack
let finder
let tujuan
let isGenerate
let framerate = 1;
function setup() {
  resetSketch();
}
function draw() {
  if (isGenerate) {
    translate((width - kolom * w) / 2, (height - baris * w) / 2);
    background(100, 0, 100, 50);
    frameRate(framerate);
    for (var i = 0; i < cells.length; i++) {
      cells[i].draw();
    }

    let neighbours = current.getTetangga();

    if (neighbours.length > 0) {
      let next = random(neighbours);
      printDetailPembuatan("kunjungi " + next.label);
      next.dikunjungi = true;
      hapusSekat(current, next);
      stack.push(next);
      current = next;
      // jarak++;
    } else {
      if (stack.length > 0) {
        current = stack.pop();
        printDetailPembuatan("Back");
        //   alert("Pop");
      } else {
        current = cells[0];
        genFinished = true;
      }
      // jarak--;
    }
    fill(100, 255, 100);
    noStroke();
    ellipse(0.5 * w + w * current.i, 0.5 * w + w * current.j, w / 2, w / 2);
    fill(255, 0, 255);

    if (genFinished) {
      if (tujuan) {
        ellipse(0.5 * w + w * tujuan.i, 0.5 * w + w * tujuan.j, w / 2, w / 2);
        if (finder) finder.draw();
        tampilkanTombol();
      }
    }
  }
}

function doPencarian() {
  finder = new Pencari(tujuan);
  sembunyikanTombol();
}

function index(i, j) {
  return i < 0 || j < 0 || i > kolom - 1 || j > baris - 1 ? -1 : i + j * kolom;
}

function hapusSekat(a, b) {
  if (a.j - b.j == 1) {
    //atas
    a.sekat[0] = false;
    b.sekat[2] = false;
  }
  if (a.i - b.i == -1) {
    //kanan
    a.sekat[1] = false;
    b.sekat[3] = false;
  }
  if (a.j - b.j == -1) {
    //bawah
    a.sekat[2] = false;
    b.sekat[0] = false;
  }
  if (a.i - b.i == 1) {
    //kiri
    a.sekat[3] = false;
    b.sekat[1] = false;
  }
}

function mousePressed() {
  for (let i = 0; i < cells.length; i++) {
    if (genFinished && cells[i].clicked(mouseX, mouseY)) {
      tujuan = cells[i];
    }
  }
}

function printDetailPembuatan(text) {
  if (!genFinished) {
    $("#detailPembuatan").append("<li>" + text + "</li>");
  }
}

function tampilkanTombol() {
  $("#btnCari").show();
}

function sembunyikanTombol() {
  $("#btnCari").hide();
}

$("#btnCari").on("click", () => {
  doPencarian();
});

function resetSketch() {
  cells = []
  stack = []
  finder = undefined;
  tujuan = undefined;
  genFinished = false
  // let canvas = createCanvas(windowWidth, windowHeight);
  let canvas = createCanvas(200, 200);
  canvas.parent("canvasDemo");
  // kolom = floor(width / w);
  // baris = floor(height / w);
  kolom = 3;
  baris = 3;
  let labelHorizontal = ["A", "B", "C"];
  // let index = 0;
  for (var i = 0; i < baris; i++) {
    for (var j = 0; j < kolom; j++) {
      cells.push(new Cell(j, i, labelHorizontal[j] + (i + 1)));
    }
  }
  current = cells[0];
  longest = current;
  current.dikunjungi = true;
  printDetailPembuatan("kunjungi " + current.label);
  sembunyikanTombol();
}

$("#detailPembuatan").hide()
$("#detailPencarian").hide()

$("#btnGenerate").on("click", ()=>{
  isGenerate = false
  $("#detailPembuatan").html("")
  $("#detailPembuatan").show()
  
  $("#detailPencarian").html("")
  $("#detailPencarian").show()
  framerate = parseInt($("#framerate").val())
  isGenerate = true
  resetSketch()
})
