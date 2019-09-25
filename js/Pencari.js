class Pencari {
  constructor(tujuan) {
    let start = 0;
    let finish = tujuan.i + tujuan.j * kolom;
    this.pCells = [];
    this.stack = [];
    this.way = [];
    this.ketemu = false;
    this.distance = 0;
    // let labelHorizontal = ["A", "B", "C"];
    
    for (let i = 0; i < kolom; i++) {
      for (let j = 0; j < baris; j++) {
        // this.pCells[i + j * kolom] = new PencariCells(i, j, labelHorizontal[i] + (j + 1));
        console.log("i: ",i)
        console.log("j: ",j)
        console.log("cell: ",cells[i + j * kolom])
        this.pCells[i + j * kolom] = new PencariCells(i, j);
        this.pCells[i + j * kolom].sekat = cells[i + j * kolom].sekat;
      }
    }

    this.current = this.pCells[start];
    this.current.dikunjungi = true;
    this.tujuan = this.pCells[finish];
    // $("#detailPencarian").html("")
    // this.printDetailPencarian("kunjungi " + this.current.label)
    // alert("TUJUAN : " + tujuan.label);
  }
  
  draw() {
    framerate = parseInt($("#framerate").val())
    let neighbours;

    if (this.current == this.tujuan) {
      this.ketemu = true;
    }
    
    if (this.current) {
      neighbours = this.current.getTetangga(this.pCells);
    }
    if (neighbours && neighbours.length > 0 && !this.ketemu) {
      let next = random(neighbours);
      next.dikunjungi = true;
      this.stack.push(next);
      this.current = next;
      // this.printDetailPencarian("kunjungi " + this.current.label)
    } else {
      this.current = this.stack.pop();
      // this.printDetailPencarian("Back");
      if (this.current && this.current.dikunjungi && this.ketemu)
        this.way.push(this.current);
      if (this.current == this.tujuan) this.ketemu = true;
    }

    fill(255);
    if (this.current) this.current.tampil();
    for (var i = 0; i < this.way.length; i++) {
      stroke(100, 255, 100);
      if (this.way[i + 1])
        line(
          w * this.way[i].i + w / 2,
          w * this.way[i].j + w / 2,
          w * this.way[i + 1].i + w / 2,
          w * this.way[i + 1].j + w / 2
        );
    }
  }

  // printDetailPencarian(text){
  //   if(!this.ketemu){
  //     $("#detailPencarian").append("<li>"+ text +"</li>") 
  //   }
  // }
}

class PencariCells {
  constructor(i, j, label) {
    // this.label = label;
    this.i = i;
    this.j = j;
    this.dikunjungi = false;
    this.sekat = [];
  }

  tampil() {
    this.tampilSekat();
    ellipse(w * this.i + w / 2, w * this.j + w / 2, 10, 10);
  }

  getTetangga(pCells) {
    let neighbours = [];
    let atas = pCells[index(this.i, this.j - 1)];
    let kanan = pCells[index(this.i + 1, this.j)];
    let bawah = pCells[index(this.i, this.j + 1)];
    let kiri = pCells[index(this.i - 1, this.j)];
    if (atas && !this.sekat[0] && !atas.dikunjungi) neighbours.push(atas);
    if (kanan && !this.sekat[1] && !kanan.dikunjungi) neighbours.push(kanan);
    if (bawah && !this.sekat[2] && !bawah.dikunjungi) neighbours.push(bawah);
    if (kiri && !this.sekat[3] && !kiri.dikunjungi) neighbours.push(kiri);
    return neighbours;
  }

  tampilSekat() {
    stroke(255);
    if (!this.sekat[0])
      line(
        w * this.i + w / 2,
        w * this.j + w / 2,
        w * this.i + w / 2,
        w * this.j
      );
    if (!this.sekat[1])
      line(
        w * this.i + w / 2,
        w * this.j + w / 2,
        w * this.i + w,
        w * this.j + w / 2
      );
    if (!this.sekat[2])
      line(
        w * this.i + w / 2,
        w * this.j + w / 2,
        w * this.i + w / 2,
        w * this.j + w
      );
    if (!this.sekat[3])
      line(
        w * this.i + w / 2,
        w * this.j + w / 2,
        w * this.i,
        w * this.j + w / 2
      );
  }
}
