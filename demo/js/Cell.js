class Cell {
  constructor(i, j, label) {
    this.label = label;
    this.i = i;
    this.j = j;
    this.dikunjungi = false;
    this.sekat = [true, true, true, true];
  }
  
  draw() {
    fill(255, 255, 255);
    text(this.label, this.i * w, this.j * w);

    if (this.dikunjungi) fill(50);
    else noFill();
    noStroke();
    rect(this.i * w, this.j * w, w, w);
    stroke(255);
    if (this.sekat[0]) {
      line(w * this.i, w * this.j, w * (this.i + 1), w * this.j);
    }
    if (this.sekat[1]) {
      line(w * (this.i + 1), w * this.j, w * (this.i + 1), w * (this.j + 1));
    }
    if (this.sekat[2]) {
      line(w * this.i, w * (this.j + 1), w * (this.i + 1), w * (this.j + 1));
    }
    if (this.sekat[3]) {
      line(w * this.i, w * this.j, w * this.i, w * (this.j + 1));
    }
  }

  getTetangga() {
    var neighbours = [];
    var atas = cells[index(this.i, this.j - 1)];
    var kanan = cells[index(this.i + 1, this.j)];
    var bawah = cells[index(this.i, this.j + 1)];
    var kiri = cells[index(this.i - 1, this.j)];
    if (atas && !atas.dikunjungi) neighbours.push(atas);
    if (kanan && !kanan.dikunjungi) neighbours.push(kanan);
    if (bawah && !bawah.dikunjungi) neighbours.push(bawah);
    if (kiri && !kiri.dikunjungi) neighbours.push(kiri);
    return neighbours;
  }

  clicked(mx, my) {
    if (mx > (width - 3 * w) / 2 + (this.i * w) && mx < (width - 3 * w) / 2 + (w * (this.i + 1)) && my > (height - 3 * w) / 2 + (w * this.j) && my < (height - 3 * w) / 2 + (w * (this.j + 1))) {
      return true;
    }
    return false;
  }
}
