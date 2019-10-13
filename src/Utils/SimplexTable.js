class SimplexTable{


  calcPP(column, tableSimplex){
    let pp = [];
    tableSimplex.forEach(x => {
      let temp = x[length(x)-1]/x[column];
      if (temp >= 0)
        pp.push(temp); 
    });

    return Math.min.apply(null, pp);
  }

  selectColumn(f_objetiva){
    let min = Math.min.apply(null, f_objetiva);
    if(min < 0){
        f_objetiva.forEach((x, i) => {
            if(min == x){
                return i;
            }
        });
    }
  }

  resolveSimplex(table){
    let columnFocus;
    let lineFocus = 0;
    let z = table[length(table) - 1];
    z.pop();

    if(Math.min.apply(null, z) >= 0){
         return table;
    }

    columnFocus = this.selectColumn(z);

    if(columnFocus >= 0){
        lineFocus = this.calcPP(columnFocus);
    }

    celFocus = table[lineFocus][columnFocus];

    //divide a linha para transformar o foco em 1
    table[lineFocus].forEach((x, i) => {
        table[lineFocus][i] = x/celFocus;
    });

    console.log(table);

    //Zerar a coluna
    table.forEach((x, i) => {
        if(i != lineFocus){
            x.forEach((y, j) => {
                table[i][j] = y - (y * table[lineFocus][j]);
            })
        }
    });

    console.log(table);

    return this.resolveSimplex(table);
  }
}
export default SimplexTable;